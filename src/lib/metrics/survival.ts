import type { CalculatorInputs, MetricResult } from "./types";

export function computeMonthlyBurn(inputs: CalculatorInputs): MetricResult {
  const formula = "burn = max(0, expenses − revenue)";
  if (
    inputs.monthlyExpenses === undefined ||
    inputs.monthlyRevenue === undefined
  ) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs monthly expenses and revenue.",
      formula,
      explanation:
        "Cash spent per month after revenue. Zero when revenue covers expenses.",
    };
  }
  const burn = Math.max(0, inputs.monthlyExpenses - inputs.monthlyRevenue);
  return {
    value: burn,
    status: "ok",
    formula,
    explanation:
      "Cash spent per month after revenue. Zero when revenue covers expenses.",
  };
}

export function computeRunway(inputs: CalculatorInputs): MetricResult {
  const formula = "runway = cash ÷ burn";
  const burnResult = computeMonthlyBurn(inputs);
  if (burnResult.status === "insufficient") {
    return {
      value: null,
      status: "insufficient",
      reason: burnResult.reason,
      formula,
      explanation: "How many months you can run at the current burn rate.",
    };
  }
  if (inputs.cashBalance === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs cash balance.",
      formula,
      explanation: "How many months you can run at the current burn rate.",
    };
  }
  const burn = burnResult.value ?? 0;
  if (burn === 0) {
    return {
      value: null,
      status: "ok",
      reason: "Profitable / no burn",
      formula,
      explanation: "Revenue covers expenses; runway is not meaningful.",
    };
  }
  const months = inputs.cashBalance / burn;
  return {
    value: months,
    status: "ok",
    formula,
    explanation: "How many months you can run at the current burn rate.",
  };
}
