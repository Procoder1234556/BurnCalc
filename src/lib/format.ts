import type { MetricResult } from "@/lib/metrics/types";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

export function formatMonths(value: number): string {
  return `${value.toFixed(1)} mo`;
}

export function formatRatio(value: number): string {
  return value.toFixed(2);
}

export function displayMetric(
  result: MetricResult,
  kind: "currency" | "percent" | "months" | "ratio" | "number" = "number",
): { display: string; hint?: string } {
  if (result.status === "ok" && result.value !== null) {
    let display: string;
    switch (kind) {
      case "currency":
        display = formatCurrency(result.value);
        break;
      case "percent":
        display = formatPercent(result.value);
        break;
      case "months":
        display = formatMonths(result.value);
        break;
      case "ratio":
        display = formatRatio(result.value);
        break;
      default:
        display = result.value.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        });
    }
    return { display };
  }
  if (result.status === "ok" && result.reason) {
    return { display: result.reason, hint: result.reason };
  }
  return { display: "—", hint: result.reason };
}
