"use client";

import type { MetricResult } from "@/lib/metrics/types";
import { displayMetric } from "@/lib/format";
import type { MetricHealth } from "@/lib/metric-status";
import { FormulaTooltip } from "@/components/calculator/formula-tooltip";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  label: string;
  result: MetricResult;
  kind?: "currency" | "percent" | "months" | "ratio" | "number";
  status?: MetricHealth;
}

export function MetricCard({
  label,
  result,
  kind = "number",
  status,
}: MetricCardProps) {
  const { display, hint } = displayMetric(result, kind);
  const valueClass =
    status === "positive"
      ? "text-positive"
      : status === "warning"
        ? "text-warning"
        : "text-text";

  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-surface-elevated p-4 transition-colors hover:border-primary/25 motion-reduce:transition-none",
        status === "positive" && "border-positive/25",
        status === "warning" && "border-warning/25",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-muted">{label}</p>
        <FormulaTooltip formula={result.formula} />
      </div>
      <p
        className={cn(
          "mt-2 font-mono text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl",
          valueClass,
        )}
      >
        {display}
      </p>
      <p className="mt-2 text-pretty text-xs leading-relaxed text-muted">
        {result.explanation}
      </p>
      {hint && display === "—" ? (
        <p className="mt-1 text-xs text-muted/90">{hint}</p>
      ) : null}
    </article>
  );
}
