import type { CalculatorInputs, MetricResult } from "./types";

export function computePostMoney(inputs: CalculatorInputs): MetricResult {
  const formula = "post-money = pre-money + investment";
  if (
    inputs.preMoneyValuation === undefined ||
    inputs.investmentAmount === undefined
  ) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs pre-money valuation and investment.",
      formula,
      explanation: "Company valuation immediately after the round closes.",
    };
  }
  if (inputs.preMoneyValuation < 0 || inputs.investmentAmount < 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Pre-money and investment must be non-negative.",
      formula,
      explanation: "Company valuation immediately after the round closes.",
    };
  }
  return {
    value: inputs.preMoneyValuation + inputs.investmentAmount,
    status: "ok",
    formula,
    explanation: "Company valuation immediately after the round closes.",
  };
}

export function computeInvestorOwnership(
  inputs: CalculatorInputs,
): MetricResult {
  const formula = "ownership % = investment ÷ post-money × 100";
  const post = computePostMoney(inputs);
  if (post.status !== "ok" || post.value === null) {
    return {
      value: null,
      status: post.status,
      reason: post.reason,
      formula,
      explanation: "New investor share of the company after the round.",
    };
  }
  if (inputs.investmentAmount === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs investment amount.",
      formula,
      explanation: "New investor share of the company after the round.",
    };
  }
  if (post.value <= 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Post-money must be positive.",
      formula,
      explanation: "New investor share of the company after the round.",
    };
  }
  return {
    value: (inputs.investmentAmount / post.value) * 100,
    status: "ok",
    formula,
    explanation: "New investor share of the company after the round.",
  };
}

export function computeDilution(inputs: CalculatorInputs): MetricResult {
  const formula = "dilution % = (1 − pre ÷ post) × 100";
  const post = computePostMoney(inputs);
  if (post.status !== "ok" || post.value === null) {
    return {
      value: null,
      status: post.status,
      reason: post.reason,
      formula,
      explanation: "How much existing shareholders are diluted by the round.",
    };
  }
  if (inputs.preMoneyValuation === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs pre-money valuation.",
      formula,
      explanation: "How much existing shareholders are diluted by the round.",
    };
  }
  if (post.value <= 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Post-money must be positive.",
      formula,
      explanation: "How much existing shareholders are diluted by the round.",
    };
  }
  const pct = (1 - inputs.preMoneyValuation / post.value) * 100;
  return {
    value: pct,
    status: "ok",
    formula,
    explanation: "How much existing shareholders are diluted by the round.",
  };
}
