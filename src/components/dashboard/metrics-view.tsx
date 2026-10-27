"use client";

import { MetricCard } from "@/components/calculator/metric-card";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { metricHealth } from "@/lib/metric-status";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

export function MetricsView() {
  const { outputs } = useDashboard();

  return (
    <TooltipProvider delayDuration={200}>
    <div className="space-y-10">
      <div>
        <p className="text-xs font-medium text-muted">Metrics</p>
        <p className="mt-1 font-display text-xl font-semibold text-text sm:text-2xl">
          Complete output grid
        </p>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Every ratio BurnCalc computes from your inputs, grouped by category.
        </p>
      </div>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Survival
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <MetricCard
            label="Monthly burn"
            result={outputs.monthlyBurn}
            kind="currency"
          />
          <MetricCard
            label="Runway"
            result={outputs.runwayMonths}
            kind="months"
            status={metricHealth("runwayMonths", outputs.runwayMonths)}
          />
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Growth & margins
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Revenue growth MoM"
            result={outputs.revenueGrowthMom}
            kind="percent"
          />
          <MetricCard
            label="Revenue growth (annualized)"
            result={outputs.revenueGrowthAnnualized}
            kind="percent"
          />
          <MetricCard
            label="Revenue growth YoY"
            result={outputs.revenueGrowthYoy}
            kind="percent"
          />
          <MetricCard
            label="Gross margin"
            result={outputs.grossMargin}
            kind="percent"
            status={metricHealth("grossMargin", outputs.grossMargin)}
          />
          <MetricCard
            label="Net margin"
            result={outputs.netMargin}
            kind="percent"
          />
          <MetricCard
            label="Rule of 40"
            result={outputs.ruleOf40}
            kind="percent"
            status={metricHealth("ruleOf40", outputs.ruleOf40)}
          />
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Unit economics
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="CAC" result={outputs.cac} kind="currency" />
          <MetricCard label="LTV" result={outputs.ltv} kind="currency" />
          <MetricCard
            label="LTV : CAC"
            result={outputs.ltvToCac}
            kind="ratio"
            status={metricHealth("ltvToCac", outputs.ltvToCac)}
          />
          <MetricCard
            label="Payback"
            result={outputs.paybackMonths}
            kind="months"
            status={metricHealth("paybackMonths", outputs.paybackMonths)}
          />
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Valuation & ownership
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="Post-money" result={outputs.postMoney} kind="currency" />
          <MetricCard
            label="Investor ownership"
            result={outputs.investorOwnership}
            kind="percent"
          />
          <MetricCard label="Dilution" result={outputs.dilution} kind="percent" />
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Later-stage ratios
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <MetricCard label="EPS" result={outputs.eps} kind="number" />
          <MetricCard label="P/E" result={outputs.peRatio} kind="ratio" />
          <MetricCard label="ROE" result={outputs.roe} kind="percent" />
        </div>
      </section>
    </div>
    </TooltipProvider>
  );
}
