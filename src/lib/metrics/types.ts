export interface CalculatorInputs {
  cashBalance?: number;
  monthlyRevenue?: number;
  monthlyExpenses?: number;
  priorMonthRevenue?: number;
  priorYearRevenue?: number;
  revenue?: number;
  cogs?: number;
  netIncome?: number;
  smSpend?: number;
  newCustomers?: number;
  arpu?: number;
  grossMarginPercent?: number;
  monthlyChurnPercent?: number;
  preMoneyValuation?: number;
  investmentAmount?: number;
  sharesOutstanding?: number;
  sharePrice?: number;
  shareholdersEquity?: number;
}

export interface MetricResult<T = number> {
  value: T | null;
  status: "ok" | "insufficient" | "invalid";
  reason?: string;
  formula: string;
  explanation: string;
}

export interface CalculatorOutputs {
  monthlyBurn: MetricResult;
  runwayMonths: MetricResult;
  revenueGrowthMom: MetricResult;
  revenueGrowthAnnualized: MetricResult;
  revenueGrowthYoy: MetricResult;
  grossMargin: MetricResult;
  netMargin: MetricResult;
  ruleOf40: MetricResult;
  cac: MetricResult;
  ltv: MetricResult;
  ltvToCac: MetricResult;
  paybackMonths: MetricResult;
  postMoney: MetricResult;
  investorOwnership: MetricResult;
  dilution: MetricResult;
  eps: MetricResult;
  peRatio: MetricResult;
  roe: MetricResult;
}
