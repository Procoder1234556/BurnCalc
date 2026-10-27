"use client";

import { useMemo, useState } from "react";
import type { ToolDefinition } from "@/data/tools-catalog";
import { InputGroup } from "@/components/calculator/input-group";
import { MetricCard } from "@/components/calculator/metric-card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { computeAllMetrics } from "@/lib/metrics";
import { parseInputs, type RawInputs } from "@/lib/metrics/parse";
import { INPUT_FIELD_META } from "@/lib/tools/input-field-meta";
import { METRIC_LABELS } from "@/lib/tools/metric-labels";
import { METRIC_KINDS } from "@/lib/tools/metric-display";
import { metricHealth } from "@/lib/metric-status";
import { ResultsDownloadActions } from "@/components/export/results-download-actions";
import { PdfDocumentPanel } from "@/components/documents/pdf-document-panel";

const EMPTY: RawInputs = {
  cashBalance: "",
  monthlyRevenue: "",
  monthlyExpenses: "",
  priorMonthRevenue: "",
  priorYearRevenue: "",
  revenue: "",
  cogs: "",
  netIncome: "",
  smSpend: "",
  newCustomers: "",
  arpu: "",
  grossMarginPercent: "",
  monthlyChurnPercent: "",
  preMoneyValuation: "",
  investmentAmount: "",
  sharesOutstanding: "",
  sharePrice: "",
  shareholdersEquity: "",
};

const INVALID_MSG = "Enter a valid number.";

export function FocusedToolCalculator({ tool }: { tool: ToolDefinition }) {
  const [raw, setRaw] = useState<RawInputs>(EMPTY);

  const { inputs, invalidFields } = useMemo(() => parseInputs(raw), [raw]);
  const outputs = useMemo(() => computeAllMetrics(inputs), [inputs]);

  const fields = tool.inputIds.map((id) => {
    const meta = INPUT_FIELD_META[id]!;
    return {
      id,
      label: meta.label,
      hint: meta.hint,
      placeholder: meta.placeholder,
      prefix: meta.prefix,
      suffix: meta.suffix,
      value: raw[id] ?? "",
      invalid: invalidFields.includes(id),
      errorMessage: INVALID_MSG,
    };
  });

  const metricKeys = [...tool.primaryMetrics, ...(tool.secondaryMetrics ?? [])];

  return (
    <TooltipProvider delayDuration={200}>
      <div className="mb-8">
        <PdfDocumentPanel outputs={outputs} raw={raw} onApplyInputs={setRaw} />
      </div>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
          <InputGroup
            title="Inputs"
            fields={fields}
            onChange={(id, value) => setRaw((prev) => ({ ...prev, [id]: value }))}
          />
        </div>
        <div className="space-y-4 rounded-xl border border-border bg-surface-elevated p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Results
          </p>
          <ul className="space-y-3">
            {metricKeys.map((key) => (
              <li key={key}>
                <MetricCard
                  label={METRIC_LABELS[key]}
                  result={outputs[key]}
                  kind={METRIC_KINDS[key]}
                  status={metricHealth(key, outputs[key])}
                />
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-border pt-4">
            <p className="mb-2 text-xs font-medium text-muted">Download results</p>
            <ResultsDownloadActions
              outputs={outputs}
              fileBaseName={`burncalc-${tool.slug}`}
              compact
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
