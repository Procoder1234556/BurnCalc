import type { MetricResult } from "@/lib/metrics/types";

export type MetricHealth = "positive" | "warning" | "neutral";

export function metricHealth(
  key: string,
  result: MetricResult,
): MetricHealth | undefined {
  if (result.status !== "ok" || result.value === null) return undefined;

  const v = result.value;

  switch (key) {
    case "runwayMonths":
      if (v >= 18) return "positive";
      if (v < 6) return "warning";
      return "neutral";
    case "ltvToCac":
      if (v >= 3) return "positive";
      if (v < 1) return "warning";
      return "neutral";
    case "ruleOf40":
      if (v >= 40) return "positive";
      if (v < 20) return "warning";
      return "neutral";
    case "grossMargin":
      if (v >= 60) return "positive";
      if (v < 40) return "warning";
      return "neutral";
    case "paybackMonths":
      if (v <= 12) return "positive";
      if (v > 24) return "warning";
      return "neutral";
    default:
      return undefined;
  }
}
