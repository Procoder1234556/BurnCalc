import type { CalculatorInputs, MetricResult } from "./types";

export function computeEps(inputs: CalculatorInputs): MetricResult {
  const formula = "EPS = net income ÷ shares outstanding";
  if (
    inputs.netIncome === undefined ||
    inputs.sharesOutstanding === undefined
  ) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs net income and shares outstanding.",
      formula,
      explanation: "Earnings per share for the period.",
    };
  }
  if (inputs.sharesOutstanding <= 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Shares outstanding must be positive.",
      formula,
      explanation: "Earnings per share for the period.",
    };
  }
  return {
    value: inputs.netIncome / inputs.sharesOutstanding,
    status: "ok",
    formula,
    explanation: "Earnings per share for the period.",
  };
}

export function computePeRatio(inputs: CalculatorInputs): MetricResult {
  const formula = "P/E = share price ÷ EPS";
  const eps = computeEps(inputs);
  if (eps.status !== "ok" || eps.value === null) {
    return {
      value: null,
      status: "insufficient",
      reason: eps.reason ?? "Needs EPS.",
      formula,
      explanation: "Price multiple relative to earnings per share.",
    };
  }
  if (inputs.sharePrice === undefined) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs share price.",
      formula,
      explanation: "Price multiple relative to earnings per share.",
    };
  }
  if (eps.value === 0) {
    return {
      value: null,
      status: "insufficient",
      reason: "EPS cannot be zero for P/E.",
      formula,
      explanation: "Price multiple relative to earnings per share.",
    };
  }
  return {
    value: inputs.sharePrice / eps.value,
    status: "ok",
    formula,
    explanation: "Price multiple relative to earnings per share.",
  };
}

export function computeRoe(inputs: CalculatorInputs): MetricResult {
  const formula = "ROE = net income ÷ equity × 100";
  if (
    inputs.netIncome === undefined ||
    inputs.shareholdersEquity === undefined
  ) {
    return {
      value: null,
      status: "insufficient",
      reason: "Needs net income and shareholders' equity.",
      formula,
      explanation: "Return on equity for the period.",
    };
  }
  if (inputs.shareholdersEquity === 0) {
    return {
      value: null,
      status: "invalid",
      reason: "Shareholders' equity cannot be zero.",
      formula,
      explanation: "Return on equity for the period.",
    };
  }
  return {
    value: (inputs.netIncome / inputs.shareholdersEquity) * 100,
    status: "ok",
    formula,
    explanation: "Return on equity for the period.",
  };
}
