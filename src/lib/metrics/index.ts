import type { CalculatorInputs, CalculatorOutputs } from "./types";
import { computeEps, computePeRatio, computeRoe } from "./corporate";
import {
  computeRevenueGrowthAnnualized,
  computeRevenueGrowthMom,
  computeRevenueGrowthYoy,
  computeRuleOf40,
} from "./growth";
import { computeGrossMargin, computeNetMargin } from "./margins";
import { computeMonthlyBurn, computeRunway } from "./survival";
import {
  computeCac,
  computeLtv,
  computeLtvToCac,
  computePaybackMonths,
} from "./unit-economics";
import {
  computeDilution,
  computeInvestorOwnership,
  computePostMoney,
} from "./valuation";

export const METRICS_VERSION = "1.0.0";

export function computeAllMetrics(inputs: CalculatorInputs): CalculatorOutputs {
  return {
    monthlyBurn: computeMonthlyBurn(inputs),
    runwayMonths: computeRunway(inputs),
    revenueGrowthMom: computeRevenueGrowthMom(inputs),
    revenueGrowthAnnualized: computeRevenueGrowthAnnualized(inputs),
    revenueGrowthYoy: computeRevenueGrowthYoy(inputs),
    grossMargin: computeGrossMargin(inputs),
    netMargin: computeNetMargin(inputs),
    ruleOf40: computeRuleOf40(inputs),
    cac: computeCac(inputs),
    ltv: computeLtv(inputs),
    ltvToCac: computeLtvToCac(inputs),
    paybackMonths: computePaybackMonths(inputs),
    postMoney: computePostMoney(inputs),
    investorOwnership: computeInvestorOwnership(inputs),
    dilution: computeDilution(inputs),
    eps: computeEps(inputs),
    peRatio: computePeRatio(inputs),
    roe: computeRoe(inputs),
  };
}

export * from "./types";
export * from "./parse";
