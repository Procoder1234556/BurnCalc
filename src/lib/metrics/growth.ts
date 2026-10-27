import type { CalculatorInputs, MetricResult } from "./types";
import { computeGrossMargin, computeNetMargin } from "./margins";

export function computeRevenueGrowthMom(inputs: CalculatorInputs): MetricResult {
  const formula = "MoM = (current − prior) ÷ prior × 100";
  if (
    inputs.monthlyRevenue === undefined ||
    inputs.priorMonthRevenue === undefined
  ) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs current and prior month revenue.",
      formula,
      explanation: "Month over month revenue growth percentage.",
    };
  }
  if (inputs.priorMonthRevenue <= 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Prior month revenue must be positive.",
      formula,
      explanation: "Month over month revenue growth percentage.",
    };
  }
  const pct =
    ((inputs.monthlyRevenue - inputs.priorMonthRevenue) /
      inputs.priorMonthRevenue) *
    100;
  return {
    value: pct,
    status: "ok",
    formula,
    explanation: "Month over month revenue growth percentage.",
  };
}

export function computeRevenueGrowthAnnualized(
  inputs: CalculatorInputs,
): MetricResult {
  const formula = "annualized ≈ (1 + MoM)^12 − 1";
  const mom = computeRevenueGrowthMom(inputs);
  if (mom.status !== "ok" || mom.value === null) {
    return {
      value: null,
      status: mom.status,
      reason: mom.reason ?? "Needs month-over-month growth.",
      formula,
      explanation: "MoM growth compounded to an annualized rate.",
    };
  }
  const annualized = (Math.pow(1 + mom.value / 100, 12) - 1) * 100;
  return {
    value: annualized,
    status: "ok",
    formula,
    explanation: "MoM growth compounded to an annualized rate.",
  };
}

export function computeRevenueGrowthYoy(inputs: CalculatorInputs): MetricResult {
  const formula = "YoY = (current − prior year) ÷ prior year × 100";
  const current = inputs.revenue ?? inputs.monthlyRevenue;
  if (current === undefined || inputs.priorYearRevenue === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs current and prior year revenue.",
      formula,
      explanation: "Year over year revenue growth percentage.",
    };
  }
  if (inputs.priorYearRevenue <= 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Prior year revenue must be positive.",
      formula,
      explanation: "Year over year revenue growth percentage.",
    };
  }
  const pct =
    ((current - inputs.priorYearRevenue) / inputs.priorYearRevenue) * 100;
  return {
    value: pct,
    status: "ok",
    formula,
    explanation: "Year over year revenue growth percentage.",
  };
}

export function computeRuleOf40(inputs: CalculatorInputs): MetricResult {
  const formula = "Rule of 40 = growth % + profit margin %";
  const yoy = computeRevenueGrowthYoy(inputs);
  const mom = computeRevenueGrowthMom(inputs);
  const net = computeNetMargin(inputs);
  const gross = computeGrossMargin(inputs);

  let growth: MetricResult | null = null;
  if (yoy.status === "ok" && yoy.value !== null) {
    growth = yoy;
  } else if (mom.status === "ok" && mom.value !== null) {
    growth = {
      ...mom,
      explanation:
        "MoM growth used (not annualized) plus profit margin for Rule of 40.",
    };
  }

  let margin: MetricResult | null = null;
  if (net.status === "ok" && net.value !== null) {
    margin = net;
  } else if (gross.status === "ok" && gross.value !== null) {
    margin = {
      ...gross,
      explanation: "Gross margin used for Rule of 40 when net margin is unavailable.",
    };
  }

  if (!growth || growth.value === null) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs revenue growth (YoY or MoM).",
      formula,
      explanation:
        "SaaS benchmark: growth rate plus profit margin. Context varies by stage.",
    };
  }
  if (!margin || margin.value === null) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs net or gross margin.",
      formula,
      explanation:
        "SaaS benchmark: growth rate plus profit margin. Context varies by stage.",
    };
  }

  return {
    value: growth.value + margin.value,
    status: "ok",
    formula,
    explanation: growth.explanation.includes("MoM")
      ? growth.explanation
      : "YoY growth plus net margin for Rule of 40.",
  };
}
