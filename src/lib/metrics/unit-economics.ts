import type { CalculatorInputs, MetricResult } from "./types";
import { computeGrossMargin } from "./margins";

function grossFraction(inputs: CalculatorInputs): number | null {
  const gm = computeGrossMargin(inputs);
  if (gm.status !== "ok" || gm.value === null) return null;
  return gm.value / 100;
}

export function computeCac(inputs: CalculatorInputs): MetricResult {
  const formula = "CAC = S&M spend ÷ new customers";
  if (inputs.smSpend === undefined || inputs.newCustomers === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs S&M spend and new customers.",
      formula,
      explanation: "Cost to acquire one new customer in the period.",
    };
  }
  if (inputs.newCustomers <= 0) {
    return {
      value: null,
      status: "insufficient",
      reason: "Add new customers acquired in period.",
      formula,
      explanation: "Cost to acquire one new customer in the period.",
    };
  }
  return {
    value: inputs.smSpend / inputs.newCustomers,
    status: "ok",
    formula,
    explanation: "Cost to acquire one new customer in the period.",
  };
}

export function computeLtv(inputs: CalculatorInputs): MetricResult {
  const formula = "LTV = (ARPU × gross margin) ÷ monthly churn";
  if (
    inputs.arpu === undefined ||
    inputs.monthlyChurnPercent === undefined
  ) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs ARPU, gross margin, and monthly churn.",
      formula,
      explanation:
        "Expected gross profit per customer at constant churn and ARPU.",
    };
  }
  const gm = grossFraction(inputs);
  if (gm === null) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs gross margin %.",
      formula,
      explanation:
        "Expected gross profit per customer at constant churn and ARPU.",
    };
  }
  if (inputs.monthlyChurnPercent <= 0) {
    return {
      value: null,
      status: "insufficient",
      reason: "Enter monthly churn greater than 0 for LTV.",
      formula,
      explanation:
        "Expected gross profit per customer at constant churn and ARPU.",
    };
  }
  const churn = inputs.monthlyChurnPercent / 100;
  const ltv = (inputs.arpu * gm) / churn;
  return {
    value: ltv,
    status: "ok",
    formula,
    explanation:
      "Expected gross profit per customer at constant churn and ARPU.",
  };
}

export function computeLtvToCac(inputs: CalculatorInputs): MetricResult {
  const formula = "LTV : CAC = LTV ÷ CAC";
  const ltv = computeLtv(inputs);
  const cac = computeCac(inputs);
  if (ltv.status !== "ok" || ltv.value === null) {
    return {
      value: null,
      status: "insufficient",
      reason: ltv.reason ?? "Needs LTV.",
      formula,
      explanation:
        "Ratio of lifetime value to acquisition cost. Often cited near 3× for SaaS; context varies.",
    };
  }
  if (cac.status !== "ok" || cac.value === null || cac.value === 0) {
    return {
      value: null,
      status: "insufficient",
      reason: cac.reason ?? "Needs CAC.",
      formula,
      explanation:
        "Ratio of lifetime value to acquisition cost. Often cited near 3× for SaaS; context varies.",
    };
  }
  return {
    value: ltv.value / cac.value,
    status: "ok",
    formula,
    explanation:
      "Ratio of lifetime value to acquisition cost. Often cited near 3× for SaaS; context varies.",
  };
}

export function computePaybackMonths(inputs: CalculatorInputs): MetricResult {
  const formula = "payback = CAC ÷ (ARPU × gross margin)";
  const cac = computeCac(inputs);
  if (cac.status !== "ok" || cac.value === null) {
    return {
      value: null,
      status: "insufficient",
      reason: cac.reason ?? "Needs CAC.",
      formula,
      explanation: "Months to recover CAC from gross profit per customer.",
    };
  }
  if (inputs.arpu === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs ARPU.",
      formula,
      explanation: "Months to recover CAC from gross profit per customer.",
    };
  }
  const gm = grossFraction(inputs);
  if (gm === null || gm === 0) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs gross margin %.",
      formula,
      explanation: "Months to recover CAC from gross profit per customer.",
    };
  }
  const denom = inputs.arpu * gm;
  if (denom <= 0) {
    return {
      value: null,
      status: "invalid",
      reason: "ARPU and gross margin must be positive.",
      formula,
      explanation: "Months to recover CAC from gross profit per customer.",
    };
  }
  return {
    value: cac.value / denom,
    status: "ok",
    formula,
    explanation: "Months to recover CAC from gross profit per customer.",
  };
}
