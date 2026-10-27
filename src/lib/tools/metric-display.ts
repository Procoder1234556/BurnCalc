import type { CalculatorOutputs } from "@/lib/metrics/types";

export type MetricDisplayKind = "currency" | "percent" | "months" | "ratio" | "number";

export const METRIC_KINDS: Record<keyof CalculatorOutputs, MetricDisplayKind> = {
  monthlyBurn: "currency",
  runwayMonths: "months",
  revenueGrowthMom: "percent",
  revenueGrowthAnnualized: "percent",
  revenueGrowthYoy: "percent",
  grossMargin: "percent",
  netMargin: "percent",
  ruleOf40: "percent",
  cac: "currency",
  ltv: "currency",
  ltvToCac: "ratio",
  paybackMonths: "months",
  postMoney: "currency",
  investorOwnership: "percent",
  dilution: "percent",
  eps: "number",
  peRatio: "ratio",
  roe: "percent",
};
