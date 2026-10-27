import type { RawInputs } from "@/lib/metrics/parse";

export type InputFieldMeta = {
  id: keyof RawInputs;
  label: string;
  hint?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
};

export const INPUT_FIELD_META: Record<keyof RawInputs, InputFieldMeta> = {
  cashBalance: {
    id: "cashBalance",
    label: "Cash balance",
    prefix: "$",
    hint: "Cash on hand today.",
    placeholder: "2,400,000",
  },
  monthlyRevenue: {
    id: "monthlyRevenue",
    label: "Monthly revenue",
    prefix: "$",
    hint: "Recognized revenue this month.",
    placeholder: "185,000",
  },
  monthlyExpenses: {
    id: "monthlyExpenses",
    label: "Monthly expenses",
    prefix: "$",
    hint: "All operating spend this month.",
    placeholder: "310,000",
  },
  priorMonthRevenue: {
    id: "priorMonthRevenue",
    label: "Prior month revenue",
    prefix: "$",
    hint: "Last month's recognized revenue.",
    placeholder: "172,000",
  },
  priorYearRevenue: {
    id: "priorYearRevenue",
    label: "Prior year revenue (same month)",
    prefix: "$",
    hint: "Revenue in the same month last year.",
    placeholder: "1,200,000",
  },
  revenue: {
    id: "revenue",
    label: "Revenue",
    prefix: "$",
    hint: "Revenue for the period.",
    placeholder: "500,000",
  },
  cogs: {
    id: "cogs",
    label: "Cost of goods sold",
    prefix: "$",
    placeholder: "120,000",
  },
  netIncome: {
    id: "netIncome",
    label: "Net income",
    prefix: "$",
    placeholder: "45,000",
  },
  smSpend: {
    id: "smSpend",
    label: "Sales & marketing spend",
    prefix: "$",
    hint: "Acquisition spend for the period.",
    placeholder: "48,000",
  },
  newCustomers: {
    id: "newCustomers",
    label: "New customers",
    hint: "Customers acquired in the same period.",
    placeholder: "126",
  },
  arpu: {
    id: "arpu",
    label: "ARPU (monthly)",
    prefix: "$",
    hint: "Average revenue per user per month.",
    placeholder: "890",
  },
  grossMarginPercent: {
    id: "grossMarginPercent",
    label: "Gross margin",
    suffix: "%",
    placeholder: "72",
  },
  monthlyChurnPercent: {
    id: "monthlyChurnPercent",
    label: "Monthly churn",
    suffix: "%",
    placeholder: "3.2",
  },
  preMoneyValuation: {
    id: "preMoneyValuation",
    label: "Pre-money valuation",
    prefix: "$",
    placeholder: "18,000,000",
  },
  investmentAmount: {
    id: "investmentAmount",
    label: "Investment amount",
    prefix: "$",
    placeholder: "4,500,000",
  },
  sharesOutstanding: {
    id: "sharesOutstanding",
    label: "Shares outstanding",
    placeholder: "10,000,000",
  },
  sharePrice: {
    id: "sharePrice",
    label: "Share price",
    prefix: "$",
    placeholder: "24.50",
  },
  shareholdersEquity: {
    id: "shareholdersEquity",
    label: "Shareholders' equity",
    prefix: "$",
    placeholder: "80,000,000",
  },
};
