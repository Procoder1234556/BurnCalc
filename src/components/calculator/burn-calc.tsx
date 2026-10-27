"use client";

import { useCallback, useMemo, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CalculatorHeader } from "@/components/calculator/header";
import { InputPanel } from "@/components/calculator/input-panel";
import { ResultsPanel } from "@/components/calculator/results-panel";
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

export function BurnCalc() {
  const [raw, setRaw] = useState<RawInputs>(SAMPLE);
  const [corporateOpen, setCorporateOpen] = useState(false);

  const { inputs, invalidFields } = useMemo(() => parseInputs(raw), [raw]);
  const outputs = useMemo(() => computeAllMetrics(inputs), [inputs]);

  const showCorporate =
    corporateOpen ||
    Boolean(raw.sharePrice?.trim()) ||
    Boolean(raw.shareholdersEquity?.trim()) ||
    Boolean(raw.sharesOutstanding?.trim());

  const onChange = useCallback((id: string, value: string) => {
    setRaw((prev) => ({ ...prev, [id]: value }));
    if (id === "sharePrice" || id === "shareholdersEquity" || id === "sharesOutstanding") {
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
    } catch {
      /* clipboard unavailable */
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
      <CalculatorHeader onReset={onReset} onCopy={onCopy} onExport={onExport} />
      <div className="mx-auto w-[90%] max-w-[1200px] px-0 py-8 sm:py-12 lg:py-14">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-[clamp(1.625rem,4vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-text">
            Startup burn, runway, and deal metrics
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            Enter a handful of numbers from the deck. BurnCalc returns standard VC
            formulas with plain-language notes—no signup, all in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
          <InputPanel
            raw={raw}
            invalidFields={invalidFields}
            onChange={onChange}
            onCorporateOpen={setCorporateOpen}
          />
          <ResultsPanel outputs={outputs} inputs={inputs} showCorporate={showCorporate} />
        </div>
      </div>
    </TooltipProvider>
  );
}
