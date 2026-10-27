import Link from "next/link";
import { displayMetric } from "@/lib/format";
import type { MetricResult } from "@/lib/metrics/types";
import { metricHealth, type MetricHealth } from "@/lib/metric-status";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function KpiStat({
  label,
  result,
  kind,
  metricKey,
  href,
}: {
  label: string;
  result: MetricResult;
  kind: "currency" | "percent" | "months" | "ratio" | "number";
  metricKey?: string;
  href?: string;
}) {
  const { display } = displayMetric(result, kind);
  const health: MetricHealth | undefined =
    metricKey ? metricHealth(metricKey, result) : undefined;

  const valueClass =
    health === "positive"
      ? "text-positive"
      : health === "warning"
        ? "text-warning"
        : "text-text";

  return (
    <article
      className="rounded-xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(26,26,26,0.04)]"
    >
      <p className="text-xs font-medium text-muted">{label}</p>
      <p
        className={cn(
          "mt-2 font-mono text-2xl font-semibold tabular-nums tracking-tight sm:text-[1.75rem]",
          valueClass,
        )}
      >
        {display}
      </p>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
        {result.explanation}
      </p>
      {href ? (
        <Link
          href={href}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-text hover:text-muted"
        >
          Open workspace
          <ArrowRight className="size-3" aria-hidden />
        </Link>
      ) : null}
    </article>
  );
}
