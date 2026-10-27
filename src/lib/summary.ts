import type { CalculatorOutputs } from "@/lib/metrics/types";
import { displayMetric } from "@/lib/format";

function line(
  title: string,
  result: CalculatorOutputs[keyof CalculatorOutputs],
  kind: "currency" | "percent" | "months" | "ratio" | "number",
): string {
  const { display } = displayMetric(result, kind);
  return `${title}: ${display}`;
}

export function buildResultsSummary(outputs: CalculatorOutputs): string {
  const rows = [
    line("Monthly burn", outputs.monthlyBurn, "currency"),
    line("Runway", outputs.runwayMonths, "months"),
    line("Revenue growth MoM", outputs.revenueGrowthMom, "percent"),
    line("Revenue growth annualized", outputs.revenueGrowthAnnualized, "percent"),
    line("Revenue growth YoY", outputs.revenueGrowthYoy, "percent"),
    line("Gross margin", outputs.grossMargin, "percent"),
    line("Net margin", outputs.netMargin, "percent"),
    line("Rule of 40", outputs.ruleOf40, "percent"),
    line("CAC", outputs.cac, "currency"),
    line("LTV", outputs.ltv, "currency"),
    line("LTV : CAC", outputs.ltvToCac, "ratio"),
    line("Payback", outputs.paybackMonths, "months"),
    line("Post-money", outputs.postMoney, "currency"),
    line("Investor ownership", outputs.investorOwnership, "percent"),
    line("Dilution", outputs.dilution, "percent"),
    line("EPS", outputs.eps, "number"),
    line("P/E", outputs.peRatio, "ratio"),
    line("ROE", outputs.roe, "percent"),
  ];
  return `BurnCalc summary\n${rows.join("\n")}\n\nFor illustrative purposes only. Not financial advice.`;
}
