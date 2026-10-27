"use client";

import { useCallback, useMemo, useState } from "react";
import { CalculatorHeader } from "@/components/calculator/header";
import { InputPanel } from "@/components/calculator/input-panel";
import { ResultsPanel } from "@/components/calculator/results-panel";
import { TooltipProvider } from "@/components/ui/tooltip";
import { computeAllMetrics } from "@/lib/metrics";
import { parseInputs, type RawInputs } from "@/lib/metrics/parse";
import { buildResultsSummary } from "@/lib/summary";

const SAMPLE: RawInputs = {
  cashBalance: "2400000",
  monthlyRevenue: "185000",
  monthlyExpenses: "310000",
  priorMonthRevenue: "172000",
  priorYearRevenue: "",
  revenue: "",
  cogs: "",
  netIncome: "",
  smSpend: "48000",
  newCustomers: "126",
  arpu: "890",
  grossMarginPercent: "72",
  monthlyChurnPercent: "3.2",
  preMoneyValuation: "18000000",
  investmentAmount: "4500000",
  sharesOutstanding: "",
  sharePrice: "",
  shareholdersEquity: "",
};

const EMPTY: RawInputs = Object.fromEntries(
  Object.keys(SAMPLE).map((k) => [k, ""]),
) as RawInputs;

export function HomePageClient() {
  const [raw, setRaw] = useState<RawInputs>(SAMPLE);
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

  const onReset = useCallback(() => {
    setRaw(EMPTY);
    setCorporateOpen(false);
  }, []);

  const onCopy = useCallback(async () => {
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

  const onExport = useCallback(() => {
    const text = buildResultsSummary(outputs);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "burncalc-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [outputs]);

  return (
    <TooltipProvider delayDuration={200}>
      <CalculatorHeader
        onReset={onReset}
        onCopy={onCopy}
        onExport={onExport}
        copyLabel={copyLabel}
      />

      <main id="main" className="mx-auto w-[90%] max-w-[1200px] px-0 pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pt-12">
        <div className="mb-8 max-w-2xl lg:mb-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Inputs → metrics
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl">
            Startup burn, runway, and deal metrics
          </h1>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted sm:text-base">
            Enter a few numbers from the deck. Results update instantly with short
            explanations and formula hints.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <InputPanel
              raw={raw}
              invalidFields={invalidFields}
              onChange={onChange}
              onCorporateOpen={setCorporateOpen}
            />
          </div>
          <div className="lg:col-span-3">
            <ResultsPanel
              outputs={outputs}
              inputs={inputs}
              showCorporate={showCorporate}
            />
          </div>
        </div>

      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-[90%] max-w-[1200px] flex-col gap-3 px-0 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>For illustrative purposes only. Not financial advice.</p>
          <button
            type="button"
            onClick={onCopy}
            className="w-fit text-left text-muted underline-offset-2 transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Copy summary
          </button>
        </div>
      </footer>
    </TooltipProvider>
  );
}
