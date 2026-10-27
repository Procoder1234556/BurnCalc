import type { RawInputs } from "@/lib/metrics/parse";

export const DASHBOARD_SAMPLE_INPUTS: RawInputs = {
  cashBalance: "2400000",
  monthlyRevenue: "185000",
  monthlyExpenses: "310000",
  priorMonthRevenue: "172000",
  priorYearRevenue: "",
  revenue: "",
  cogs: "",
  netIncome: "",
  smSpend: "48000",
  newCustomers: "126",
  arpu: "890",
  grossMarginPercent: "72",
  monthlyChurnPercent: "3.2",
  preMoneyValuation: "18000000",
  investmentAmount: "4500000",
  sharesOutstanding: "",
  sharePrice: "",
  shareholdersEquity: "",
};

export const DASHBOARD_EMPTY_INPUTS: RawInputs = Object.fromEntries(
  Object.keys(DASHBOARD_SAMPLE_INPUTS).map((k) => [k, ""]),
) as RawInputs;
