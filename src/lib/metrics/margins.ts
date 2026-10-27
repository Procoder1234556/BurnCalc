import type { CalculatorInputs, MetricResult } from "./types";

function periodRevenue(inputs: CalculatorInputs): number | undefined {
  if (inputs.revenue !== undefined) return inputs.revenue;
  if (inputs.monthlyRevenue !== undefined) return inputs.monthlyRevenue * 12;
  return undefined;
}

export function computeGrossMargin(inputs: CalculatorInputs): MetricResult {
  const formula = "gross margin = (revenue − COGS) ÷ revenue × 100";
  if (inputs.grossMarginPercent !== undefined) {
    return {
      value: inputs.grossMarginPercent,
      status: "ok",
      formula: "gross margin % (direct input)",
      explanation: "Revenue retained after cost of goods sold.",
    };
  }
  const revenue = periodRevenue(inputs);
  if (revenue === undefined || inputs.cogs === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs revenue and COGS, or gross margin %.",
      formula,
      explanation: "Revenue retained after cost of goods sold.",
    };
  }
  if (revenue <= 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Revenue must be positive.",
      formula,
      explanation: "Revenue retained after cost of goods sold.",
    };
  }
  const pct = ((revenue - inputs.cogs) / revenue) * 100;
  return {
    value: pct,
    status: "ok",
    formula,
    explanation: "Revenue retained after cost of goods sold.",
  };
}

export function computeNetMargin(inputs: CalculatorInputs): MetricResult {
  const formula = "net margin = net income ÷ revenue × 100";
  const revenue = periodRevenue(inputs);
  if (revenue === undefined || inputs.netIncome === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs revenue and net income.",
      formula,
      explanation: "Profit as a percentage of revenue.",
    };
  }
  if (revenue <= 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Revenue must be positive.",
      formula,
      explanation: "Profit as a percentage of revenue.",
    };
  }
  const pct = (inputs.netIncome / revenue) * 100;
  return {
    value: pct,
    status: "ok",
    formula,
    explanation: "Profit as a percentage of revenue.",
  };
}
