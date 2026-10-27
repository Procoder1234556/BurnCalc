import type { CalculatorOutputs } from "@/lib/metrics/types";

export const METRIC_LABELS: Record<keyof CalculatorOutputs, string> = {
  monthlyBurn: "Monthly burn",
  runwayMonths: "Runway (months)",
  revenueGrowthMom: "Revenue growth (MoM)",
  revenueGrowthAnnualized: "Revenue growth (annualized)",
  revenueGrowthYoy: "Revenue growth (YoY)",
  grossMargin: "Gross margin",
  netMargin: "Net margin",
  ruleOf40: "Rule of 40",
  cac: "CAC",
  ltv: "LTV",
  ltvToCac: "LTV : CAC",
  paybackMonths: "CAC payback (months)",
  postMoney: "Post-money valuation",
  investorOwnership: "Investor ownership",
  dilution: "Dilution",
  eps: "EPS",
  peRatio: "P/E ratio",
  roe: "ROE",
};
