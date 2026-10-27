import type { MetricResult } from "@/lib/metrics/types";
import { displayMetric } from "@/lib/format";

export interface MetricCardProps {
  title: string;
  result: MetricResult;
  kind?: "currency" | "percent" | "months" | "ratio" | "number";
  highlight?: boolean;
}

export function MetricCard({
  title,
  result,
  kind = "number",
  highlight,
}: MetricCardProps) {
  const { display, hint } = displayMetric(result, kind);

  return (
    <article
      className={`rounded-lg border border-border bg-paper-elevated p-4 shadow-sm ${
        highlight ? "ring-2 ring-accent/30" : ""
      }`}
    >
      <h3 className="text-sm font-medium text-ink-muted">{title}</h3>
      <p className="mt-1 font-mono text-2xl tabular-nums text-ink">{display}</p>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">
        {result.explanation}
      </p>
      {hint && display === "—" ? (
        <p className="mt-1 text-xs text-ink-muted">{hint}</p>
      ) : null}
      <p className="mt-1 font-mono text-[11px] text-ink-muted/80">
        {result.formula}
      </p>
    </article>
  );
}
