"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { computeAllMetrics } from "@/lib/metrics";
import { parseInputs, type RawInputs } from "@/lib/metrics/parse";
import {
  DASHBOARD_EMPTY_INPUTS,
  DASHBOARD_SAMPLE_INPUTS,
} from "@/lib/dashboard/sample-inputs";
import { buildResultsSummary } from "@/lib/summary";
import { downloadBlob, downloadPdfBytes } from "@/lib/export/download";
import { buildResultsOnlyPdf } from "@/lib/export/results-pdf";
import { mergeRawInputs, type ParseFinancialTextResult } from "@/lib/documents/parse-financial-text";

type DashboardContextValue = {
  raw: RawInputs;
  setRaw: React.Dispatch<React.SetStateAction<RawInputs>>;
  onChange: (id: string, value: string) => void;
  invalidFields: string[];
  inputs: ReturnType<typeof parseInputs>["inputs"];
  outputs: ReturnType<typeof computeAllMetrics>;
  corporateOpen: boolean;
  setCorporateOpen: (open: boolean) => void;
  showCorporate: boolean;
  reset: () => void;
  loadSample: () => void;
  copySummary: () => Promise<void>;
  exportSummary: () => void;
  exportSummaryPdf: () => Promise<void>;
  applyExtractedInputs: (fields: ParseFinancialTextResult["fields"]) => void;
  copyLabel: string;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<RawInputs>(DASHBOARD_SAMPLE_INPUTS);
  const [corporateOpen, setCorporateOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy summary");

  const { inputs, invalidFields } = useMemo(() => parseInputs(raw), [raw]);
  const outputs = useMemo(() => computeAllMetrics(inputs), [inputs]);

  const showCorporate =
    corporateOpen ||
    Boolean(raw.sharePrice?.trim()) ||
    Boolean(raw.shareholdersEquity?.trim()) ||
    Boolean(raw.sharesOutstanding?.trim());

  const onChange = useCallback((id: string, value: string) => {
    setRaw((prev) => ({ ...prev, [id]: value }));
    if (
      id === "sharePrice" ||
      id === "shareholdersEquity" ||
      id === "sharesOutstanding"
    ) {
      setCorporateOpen(true);
    }
  }, []);

  const reset = useCallback(() => {
    setRaw(DASHBOARD_EMPTY_INPUTS);
    setCorporateOpen(false);
  }, []);

  const loadSample = useCallback(() => {
    setRaw(DASHBOARD_SAMPLE_INPUTS);
  }, []);

  const copySummary = useCallback(async () => {
    const text = buildResultsSummary(outputs);
    try {
      await navigator.clipboard.writeText(text);
      setCopyLabel("Copied");
      window.setTimeout(() => setCopyLabel("Copy summary"), 2000);
    } catch {
      setCopyLabel("Copy failed");
      window.setTimeout(() => setCopyLabel("Copy summary"), 2000);
    }
  }, [outputs]);

  const exportSummary = useCallback(() => {
    const text = buildResultsSummary(outputs);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, "burncalc-summary.txt");
  }, [outputs]);

  const exportSummaryPdf = useCallback(async () => {
    const bytes = await buildResultsOnlyPdf(outputs);
    downloadPdfBytes(bytes, "burncalc-summary.pdf");
  }, [outputs]);

  const applyExtractedInputs = useCallback((fields: ParseFinancialTextResult["fields"]) => {
    setRaw((prev) => mergeRawInputs(prev, fields, true));
  }, []);

  const value = useMemo(
    () => ({
      raw,
      setRaw,
      onChange,
      invalidFields,
      inputs,
      outputs,
      corporateOpen,
      setCorporateOpen,
      showCorporate,
      reset,
      loadSample,
      copySummary,
      exportSummary,
      exportSummaryPdf,
      applyExtractedInputs,
      copyLabel,
    }),
    [
      raw,
      onChange,
      invalidFields,
      inputs,
      outputs,
      corporateOpen,
      showCorporate,
      reset,
      loadSample,
      copySummary,
      exportSummary,
      exportSummaryPdf,
      applyExtractedInputs,
      copyLabel,
    ],
  );

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return ctx;
}
