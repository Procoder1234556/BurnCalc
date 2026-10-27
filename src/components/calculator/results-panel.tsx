"use client";

import type { CalculatorInputs, CalculatorOutputs } from "@/lib/metrics/types";
import { formatCurrency } from "@/lib/format";
import { metricHealth } from "@/lib/metric-status";
import { MetricCard } from "@/components/calculator/metric-card";
import { Separator } from "@/components/ui/separator";
import type { MetricResult } from "@/lib/metrics/types";
import { ResultsDownloadActions } from "@/components/export/results-download-actions";

function preMoneyResult(inputs: CalculatorInputs): MetricResult {
  const formula = "pre money = term sheet valuation before new money";
  if (inputs.preMoneyValuation === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Enter pre money valuation.",
      formula,
      explanation: "Company valuation immediately before the round closes.",
    };
  }
  if (inputs.preMoneyValuation < 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Pre money must be non-negative.",
      formula,
      explanation: "Company valuation immediately before the round closes.",
    };
  }
  return {
    value: inputs.preMoneyValuation,
    status: "ok",
    formula,
    explanation: "Company valuation immediately before the round closes.",
  };
}

function snapshotRail(outputs: CalculatorOutputs): string[] {
  const picks: Array<{ key: string; ok: boolean }> = [
    { key: "Runway", ok: outputs.runwayMonths.status === "ok" },
    { key: "Burn", ok: outputs.monthlyBurn.status === "ok" },
    { key: "LTV:CAC", ok: outputs.ltvToCac.status === "ok" },
    { key: "Rule of 40", ok: outputs.ruleOf40.status === "ok" },
    { key: "Dilution", ok: outputs.dilution.status === "ok" },
  ];
  return picks.filter((p) => p.ok).map((p) => p.key);
}

function countReady(outputs: CalculatorOutputs): number {
  return Object.values(outputs).filter(
    (r) => r.status === "ok" && r.value !== null,
  ).length;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
      {children}
    </h3>
  );
}

export interface ResultsPanelProps {
  outputs: CalculatorOutputs;
  inputs: CalculatorInputs;
  showCorporate: boolean;
}

export function ResultsPanel({ outputs, inputs, showCorporate }: ResultsPanelProps) {
  const preMoney = preMoneyResult(inputs);
  const ready = countReady(outputs);
  const rail = snapshotRail(outputs);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Metrics</p>
        <p className="mt-1 text-sm text-muted">
          Live values with one sentence explanations. Use the info icon for formulas.
        </p>
      </div>

      {rail.length > 0 ? (
        <aside
          className="rounded-lg border border-primary/20 bg-surface px-4 py-3"
          aria-label="Deal snapshot"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Snapshot
          </p>
          <p className="mt-1 font-mono text-sm text-text">{rail.join(" · ")}</p>
        </aside>
      ) : null}

      {ready === 0 ? (
        <div
          className="rounded-lg border border-border bg-surface-elevated p-6"
          role="status"
        >
          <p className="text-base font-semibold text-text">Start with cash and P&L</p>
          <p className="mt-2 text-pretty text-sm text-muted">
            Add monthly revenue and expenses to see burn and runway. Other metrics unlock
            as you fill the related inputs.
          </p>
        </div>
      ) : null}

      <div>
        <SectionLabel>Survival</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <MetricCard label="Monthly burn rate" result={outputs.monthlyBurn} kind="currency" />
          <MetricCard
            label="Runway"
            result={outputs.runwayMonths}
            kind="months"
            status={metricHealth("runwayMonths", outputs.runwayMonths)}
          />
        </div>
      </div>

      <Separator />

      <div>
        <SectionLabel>Growth & margins</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <MetricCard label="Revenue growth (MoM)" result={outputs.revenueGrowthMom} kind="percent" />
          <MetricCard
            label="Revenue growth (annualized)"
            result={outputs.revenueGrowthAnnualized}
            kind="percent"
          />
          <MetricCard label="Revenue growth (YoY)" result={outputs.revenueGrowthYoy} kind="percent" />
          <MetricCard
            label="Gross margin"
            result={outputs.grossMargin}
            kind="percent"
            status={metricHealth("grossMargin", outputs.grossMargin)}
          />
          <MetricCard label="Net margin" result={outputs.netMargin} kind="percent" />
          <MetricCard
            label="Rule of 40"
            result={outputs.ruleOf40}
            kind="percent"
            status={metricHealth("ruleOf40", outputs.ruleOf40)}
          />
        </div>
      </div>

      <Separator />

      <div>
        <SectionLabel>Unit economics</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="CAC" result={outputs.cac} kind="currency" />
          <MetricCard label="LTV" result={outputs.ltv} kind="currency" />
          <MetricCard
            label="LTV : CAC"
            result={outputs.ltvToCac}
            kind="ratio"
            status={metricHealth("ltvToCac", outputs.ltvToCac)}
          />
          <MetricCard
            label="Payback period"
            result={outputs.paybackMonths}
            kind="months"
            status={metricHealth("paybackMonths", outputs.paybackMonths)}
          />
        </div>
      </div>

      <Separator />

      <div>
        <SectionLabel>Valuation & cap table</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <MetricCard label="Pre money valuation" result={preMoney} kind="currency" />
          <MetricCard label="Post money valuation" result={outputs.postMoney} kind="currency" />
          <MetricCard label="Investor ownership" result={outputs.investorOwnership} kind="percent" />
          <MetricCard label="Dilution" result={outputs.dilution} kind="percent" />
        </div>
        {inputs.preMoneyValuation !== undefined && inputs.investmentAmount !== undefined ? (
          <p className="mt-3 text-xs text-muted">
            Round check{" "}
            <span className="font-mono tabular-nums text-text">
              {formatCurrency(inputs.investmentAmount)}
            </span>{" "}
            on pre money{" "}
            <span className="font-mono tabular-nums text-text">
              {formatCurrency(inputs.preMoneyValuation)}
            </span>
            .
          </p>
        ) : null}
      </div>

      {showCorporate ? (
        <>
          <Separator />
          <div>
            <SectionLabel>Corporate</SectionLabel>
            <div className="grid gap-3 sm:grid-cols-3">
              <MetricCard label="EPS" result={outputs.eps} kind="number" />
              <MetricCard label="P/E ratio" result={outputs.peRatio} kind="ratio" />
              <MetricCard label="Basic ROE" result={outputs.roe} kind="percent" />
            </div>
          </div>
        </>
      ) : null}

      <div className="border-t border-border pt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Download results
        </p>
        <ResultsDownloadActions outputs={outputs} />
      </div>
    </div>
  );
}
