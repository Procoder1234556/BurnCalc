"use client";

import { useMemo, useState } from "react";
import { MetricCard } from "@/components/metrics/metric-card";
import { SectionHeader } from "@/components/ui/section-header";
import { NumberField } from "@/components/ui/number-field";
import { computeAllMetrics } from "@/lib/metrics";
import { parseInputs, type RawInputs } from "@/lib/metrics/parse";

const INITIAL: RawInputs = {
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

function snapshotCompleteness(
  outputs: ReturnType<typeof computeAllMetrics>,
): string[] {
  const picks: Array<{ key: string; ok: boolean }> = [
    { key: "Runway", ok: outputs.runwayMonths.status === "ok" },
    { key: "Burn", ok: outputs.monthlyBurn.status === "ok" },
    { key: "LTV:CAC", ok: outputs.ltvToCac.status === "ok" },
    { key: "Rule of 40", ok: outputs.ruleOf40.status === "ok" },
    { key: "Dilution", ok: outputs.dilution.status === "ok" },
  ];
  return picks.filter((p) => p.ok).map((p) => p.key);
}

export function CalculatorShell() {
  const [raw, setRaw] = useState<RawInputs>(INITIAL);
  const [publicOpen, setPublicOpen] = useState(false);

  const { inputs, invalidFields } = useMemo(() => parseInputs(raw), [raw]);
  const outputs = useMemo(() => computeAllMetrics(inputs), [inputs]);
  const rail = useMemo(() => snapshotCompleteness(outputs), [outputs]);

  const set =
    (key: string) =>
    (value: string): void => {
      setRaw((prev) => ({ ...prev, [key]: value }));
    };

  const invalid = (key: string) => invalidFields.includes(key);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
      <div className="space-y-10 lg:col-span-2">
        <section aria-labelledby="pl-heading">
          <SectionHeader
            title="Cash & monthly P&L"
            subtitle="Burn · Runway"
          />
          <div className="space-y-6" id="pl-heading">
            <NumberField
              id="cashBalance"
              label="Cash balance"
              hint="Cash on hand today."
              prefix="$"
              value={raw.cashBalance ?? ""}
              onChange={set("cashBalance")}
              invalid={invalid("cashBalance")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="monthlyRevenue"
              label="Monthly revenue"
              hint="Recognized revenue this month."
              prefix="$"
              value={raw.monthlyRevenue ?? ""}
              onChange={set("monthlyRevenue")}
              invalid={invalid("monthlyRevenue")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="monthlyExpenses"
              label="Monthly expenses"
              hint="All operating spend this month."
              prefix="$"
              value={raw.monthlyExpenses ?? ""}
              onChange={set("monthlyExpenses")}
              invalid={invalid("monthlyExpenses")}
              errorMessage="Enter a valid number."
            />
          </div>
        </section>

        <section aria-labelledby="growth-heading">
          <SectionHeader
            title="Growth & margins"
            subtitle="MoM · YoY · Rule of 40"
          />
          <div className="space-y-6" id="growth-heading">
            <NumberField
              id="priorMonthRevenue"
              label="Prior month revenue"
              hint="For month over month growth."
              prefix="$"
              value={raw.priorMonthRevenue ?? ""}
              onChange={set("priorMonthRevenue")}
              invalid={invalid("priorMonthRevenue")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="priorYearRevenue"
              label="Prior year revenue"
              hint="For year over year growth."
              prefix="$"
              value={raw.priorYearRevenue ?? ""}
              onChange={set("priorYearRevenue")}
              invalid={invalid("priorYearRevenue")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="revenue"
              label="Period revenue (optional)"
              hint="Annual revenue for margins; defaults to monthly × 12."
              prefix="$"
              value={raw.revenue ?? ""}
              onChange={set("revenue")}
              invalid={invalid("revenue")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="cogs"
              label="COGS (optional)"
              hint="Same period as revenue."
              prefix="$"
              value={raw.cogs ?? ""}
              onChange={set("cogs")}
              invalid={invalid("cogs")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="netIncome"
              label="Net income (optional)"
              hint="For net margin and Rule of 40."
              prefix="$"
              value={raw.netIncome ?? ""}
              onChange={set("netIncome")}
              invalid={invalid("netIncome")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="grossMarginPercent"
              label="Gross margin %"
              hint="0–100. Used for LTV if COGS not provided."
              suffix="%"
              value={raw.grossMarginPercent ?? ""}
              onChange={set("grossMarginPercent")}
              invalid={invalid("grossMarginPercent")}
              errorMessage="Enter a valid number."
            />
          </div>
        </section>

        <section aria-labelledby="unit-heading">
          <SectionHeader
            title="Unit economics"
            subtitle="CAC · LTV · Payback"
          />
          <div className="space-y-6" id="unit-heading">
            <NumberField
              id="smSpend"
              label="S&M spend (period)"
              hint="Sales and marketing in the same period as new customers."
              prefix="$"
              value={raw.smSpend ?? ""}
              onChange={set("smSpend")}
              invalid={invalid("smSpend")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="newCustomers"
              label="New customers"
              hint="Customers acquired in that period."
              value={raw.newCustomers ?? ""}
              onChange={set("newCustomers")}
              invalid={invalid("newCustomers")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="arpu"
              label="ARPU (monthly)"
              hint="Average revenue per user per month."
              prefix="$"
              value={raw.arpu ?? ""}
              onChange={set("arpu")}
              invalid={invalid("arpu")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="monthlyChurnPercent"
              label="Monthly churn %"
              hint="Customer churn per month, 0–100."
              suffix="%"
              value={raw.monthlyChurnPercent ?? ""}
              onChange={set("monthlyChurnPercent")}
              invalid={invalid("monthlyChurnPercent")}
              errorMessage="Enter a valid number."
            />
          </div>
        </section>

        <section aria-labelledby="round-heading">
          <SectionHeader
            title="Fundraising round"
            subtitle="Pre · Post · Dilution"
          />
          <div className="space-y-6" id="round-heading">
            <NumberField
              id="preMoneyValuation"
              label="Pre-money valuation"
              prefix="$"
              hint="Valuation before new money."
              value={raw.preMoneyValuation ?? ""}
              onChange={set("preMoneyValuation")}
              invalid={invalid("preMoneyValuation")}
              errorMessage="Enter a valid number."
            />
            <NumberField
              id="investmentAmount"
              label="New investment"
              prefix="$"
              hint="Amount raised in this round."
              value={raw.investmentAmount ?? ""}
              onChange={set("investmentAmount")}
              invalid={invalid("investmentAmount")}
              errorMessage="Enter a valid number."
            />
          </div>
        </section>

        <section aria-labelledby="public-heading">
          <button
            type="button"
            id="public-heading"
            onClick={() => setPublicOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-paper-elevated px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:bg-accent-soft/40 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-expanded={publicOpen}
          >
            Public company metrics (optional)
            <span className="text-ink-muted" aria-hidden>
              {publicOpen ? "−" : "+"}
            </span>
          </button>
          {publicOpen ? (
            <div className="mt-4 space-y-6">
              <NumberField
                id="sharesOutstanding"
                label="Shares outstanding"
                value={raw.sharesOutstanding ?? ""}
                onChange={set("sharesOutstanding")}
                hint="For earnings per share."
                invalid={invalid("sharesOutstanding")}
                errorMessage="Enter a valid number."
              />
              <NumberField
                id="sharePrice"
                label="Share price"
                prefix="$"
                value={raw.sharePrice ?? ""}
                onChange={set("sharePrice")}
                hint="For P/E ratio."
                invalid={invalid("sharePrice")}
                errorMessage="Enter a valid number."
              />
              <NumberField
                id="shareholdersEquity"
                label="Shareholders' equity"
                prefix="$"
                value={raw.shareholdersEquity ?? ""}
                onChange={set("shareholdersEquity")}
                hint="For return on equity."
                invalid={invalid("shareholdersEquity")}
                errorMessage="Enter a valid number."
              />
            </div>
          ) : null}
        </section>
      </div>

      <div className="space-y-8 lg:col-span-3">
        {rail.length > 0 ? (
          <aside
            className="rounded-lg border border-border bg-accent-soft/50 px-4 py-3"
            aria-label="Deal snapshot"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Deal snapshot
            </p>
            <p className="mt-1 font-mono text-sm text-ink">
              {rail.join(" · ")}
            </p>
          </aside>
        ) : null}

        <div>
          <SectionHeader title="Survival" subtitle="Burn · Runway" />
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard
              title="Monthly burn"
              result={outputs.monthlyBurn}
              kind="currency"
              highlight={rail.includes("Burn")}
            />
            <MetricCard
              title="Runway"
              result={outputs.runwayMonths}
              kind="months"
              highlight={rail.includes("Runway")}
            />
          </div>
        </div>

        <div>
          <SectionHeader title="Growth & margins" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Revenue growth MoM"
              result={outputs.revenueGrowthMom}
              kind="percent"
            />
            <MetricCard
              title="Revenue growth YoY"
              result={outputs.revenueGrowthYoy}
              kind="percent"
            />
            <MetricCard
              title="Gross margin"
              result={outputs.grossMargin}
              kind="percent"
            />
            <MetricCard
              title="Net margin"
              result={outputs.netMargin}
              kind="percent"
            />
            <MetricCard
              title="Rule of 40"
              result={outputs.ruleOf40}
              kind="percent"
              highlight={rail.includes("Rule of 40")}
            />
          </div>
        </div>

        <div>
          <SectionHeader title="Unit economics" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="CAC" result={outputs.cac} kind="currency" />
            <MetricCard title="LTV" result={outputs.ltv} kind="currency" />
            <MetricCard
              title="LTV : CAC"
              result={outputs.ltvToCac}
              kind="ratio"
              highlight={rail.includes("LTV:CAC")}
            />
            <MetricCard
              title="Payback"
              result={outputs.paybackMonths}
              kind="months"
            />
          </div>
        </div>

        <div>
          <SectionHeader title="Valuation & dilution" />
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              title="Post-money"
              result={outputs.postMoney}
              kind="currency"
            />
            <MetricCard
              title="Investor ownership"
              result={outputs.investorOwnership}
              kind="percent"
            />
            <MetricCard
              title="Dilution"
              result={outputs.dilution}
              kind="percent"
              highlight={rail.includes("Dilution")}
            />
          </div>
        </div>

        {publicOpen ? (
          <div>
            <SectionHeader title="Corporate ratios" />
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard title="EPS" result={outputs.eps} kind="number" />
              <MetricCard title="P/E" result={outputs.peRatio} kind="ratio" />
              <MetricCard title="ROE" result={outputs.roe} kind="percent" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
