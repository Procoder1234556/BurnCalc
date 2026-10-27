"use client";

import Link from "next/link";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { KpiStat } from "@/components/dashboard/kpi-stat";
import { displayMetric } from "@/lib/format";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";

function runwayBar(months: number | null, max = 24) {
  if (months === null) return 0;
  return Math.min(100, (months / max) * 100);
}

export function OverviewView() {
  const { outputs, inputs } = useDashboard();
  const readyCount = Object.values(outputs).filter(
    (r) => r.status === "ok" && r.value !== null,
  ).length;

  const burn = displayMetric(outputs.monthlyBurn, "currency").display;
  const runwayVal = outputs.runwayMonths.value;
  const cash = inputs.cashBalance;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted">Today&apos;s snapshot</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Financial health
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/dashboard/workspace">Edit inputs</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiStat
          label="Monthly burn"
          result={outputs.monthlyBurn}
          kind="currency"
          metricKey="monthlyBurn"
          href="/dashboard/workspace"
        />
        <KpiStat
          label="Runway"
          result={outputs.runwayMonths}
          kind="months"
          metricKey="runwayMonths"
          href="/dashboard/workspace"
        />
        <KpiStat
          label="LTV : CAC"
          result={outputs.ltvToCac}
          kind="ratio"
          metricKey="ltvToCac"
          href="/dashboard/metrics"
        />
        <KpiStat
          label="Rule of 40"
          result={outputs.ruleOf40}
          kind="percent"
          metricKey="ruleOf40"
          href="/dashboard/metrics"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section
          className="rounded-xl border border-border bg-white p-6 lg:col-span-3"
          aria-labelledby="cash-heading"
        >
          <h2 id="cash-heading" className="text-sm font-semibold text-text">
            Cash position
          </h2>
          <p className="mt-1 text-sm text-muted">
            Runway at current burn — a simple read, not a forecast.
          </p>
          <p className="mt-6 font-mono text-3xl font-semibold tabular-nums text-text">
            {cash !== undefined ? formatCurrency(cash) : "—"}
          </p>
          <p className="mt-1 text-xs text-muted">Cash on hand</p>
          <div className="mt-6">
            <div className="flex justify-between text-xs text-muted">
              <span>Runway</span>
              <span className="font-mono text-text">
                {displayMetric(outputs.runwayMonths, "months").display}
              </span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted"
              role="presentation"
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 motion-reduce:transition-none"
                style={{ width: `${runwayBar(runwayVal)}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-muted">
              Net burn {burn} per month at entered revenue and expenses.
            </p>
          </div>
        </section>

        <section
          className="rounded-xl border border-border bg-surface-muted/50 p-6 lg:col-span-2"
          aria-labelledby="status-heading"
        >
          <h2 id="status-heading" className="text-sm font-semibold text-text">
            Model status
          </h2>
          <p className="mt-4 font-mono text-4xl font-semibold tabular-nums text-text">
            {readyCount}
          </p>
          <p className="text-sm text-muted">metrics ready with current inputs</p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li className="flex gap-2">
              <span className="text-positive" aria-hidden>●</span>
              Survival: burn & runway
            </li>
            <li className="flex gap-2">
              <span
                className={
                  outputs.ltvToCac.status === "ok" ? "text-positive" : "text-muted"
                }
                aria-hidden
              >
                ●
              </span>
              Unit economics
            </li>
            <li className="flex gap-2">
              <span
                className={
                  outputs.dilution.status === "ok" ? "text-positive" : "text-muted"
                }
                aria-hidden
              >
                ●
              </span>
              Round & dilution
            </li>
          </ul>
          <Link
            href="/dashboard/metrics"
            className="mt-6 inline-block text-sm font-medium text-text underline-offset-2 hover:underline"
          >
            View all metrics
          </Link>
        </section>
      </div>
    </div>
  );
}
