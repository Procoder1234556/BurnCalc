import { cn } from "@/lib/utils";

export type MockupVariant =
  | "hero"
  | "burn"
  | "unit-economics"
  | "valuation"
  | "compact";

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[9px] font-medium text-muted">{label}</p>
      <div className="rounded-md border border-border bg-surface-elevated px-2 py-1 font-mono text-[10px] text-text">
        {value}
      </div>
    </div>
  );
}

function MockMetric({
  label,
  value,
  note,
  positive,
}: {
  label: string;
  value: string;
  note: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded border border-border bg-surface-elevated p-2">
      <p className="text-[9px] text-muted">{label}</p>
      <p
        className={cn(
          "mt-0.5 font-mono text-sm font-semibold tabular-nums",
          positive ? "text-positive" : "text-text",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[8px] leading-snug text-muted">{note}</p>
    </div>
  );
}

export function CalculatorMockup({
  variant = "hero",
  className,
}: {
  variant?: MockupVariant;
  className?: string;
}) {
  if (variant === "burn") {
    return (
      <div className={cn("grid gap-3 p-3 sm:grid-cols-2 sm:p-4", className)}>
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Inputs</p>
          <MockField label="Monthly revenue" value="$185,000" />
          <MockField label="Monthly expenses" value="$310,000" />
          <MockField label="Cash balance" value="$2,400,000" />
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Metrics</p>
          <MockMetric
            label="Monthly burn"
            value="$125,000"
            note="Expenses minus revenue when negative."
          />
          <MockMetric
            label="Runway"
            value="19.2 mo"
            note="Cash divided by monthly burn."
            positive
          />
        </div>
      </div>
    );
  }

  if (variant === "unit-economics") {
    return (
      <div className={cn("grid gap-3 p-3 sm:grid-cols-2 sm:p-4", className)}>
        <div className="space-y-2">
          <MockField label="S&M spend" value="$48,000" />
          <MockField label="New customers" value="126" />
          <MockField label="ARPU" value="$890" />
          <MockField label="Churn" value="3.2%" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <MockMetric label="CAC" value="$381" note="S&M per new customer." />
          <MockMetric label="LTV" value="$20,025" note="ARPU, margin, churn." positive />
          <MockMetric label="LTV : CAC" value="52.6×" note="Healthy above 3×." positive />
          <MockMetric label="Payback" value="0.6 mo" note="CAC over gross profit." />
        </div>
      </div>
    );
  }

  if (variant === "valuation") {
    return (
      <div className={cn("grid gap-3 p-3 sm:grid-cols-2 sm:p-4", className)}>
        <div className="space-y-2">
          <MockField label="Pre money" value="$18,000,000" />
          <MockField label="Investment" value="$4,500,000" />
        </div>
        <div className="space-y-2">
          <MockMetric label="Post money" value="$22.5M" note="Pre plus new money." />
          <MockMetric label="Investor ownership" value="20.0%" note="Check over post money." />
          <MockMetric label="Dilution" value="20.0%" note="Round impact on cap table." />
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("grid grid-cols-3 gap-2 p-3", className)}>
        <MockMetric label="Burn" value="$125k" note="Monthly" />
        <MockMetric label="Runway" value="19 mo" note="At current burn" positive />
        <MockMetric label="LTV:CAC" value="52.6" note="Unit economics" positive />
      </div>
    );
  }

  return (
    <div className={cn("grid gap-2 p-2 sm:grid-cols-5 sm:gap-3 sm:p-3", className)}>
      <div className="space-y-1.5 sm:col-span-2">
        <p className="text-[9px] font-semibold uppercase text-muted">Inputs</p>
        <MockField label="Revenue" value="$185k" />
        <MockField label="Expenses" value="$310k" />
        <MockField label="Growth" value="7.6% MoM" />
      </div>
      <div className="grid grid-cols-2 gap-1.5 sm:col-span-3 sm:grid-cols-2">
        <MockMetric label="Burn" value="$125k" note="Monthly net burn" />
        <MockMetric label="Runway" value="19.2 mo" note="Months of cash" positive />
        <MockMetric label="LTV:CAC" value="52.6×" note="SaaS benchmark context" positive />
        <MockMetric label="Rule of 40" value="79.6%" note="Growth plus margin" />
      </div>
    </div>
  );
}
