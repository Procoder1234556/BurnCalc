import type { CalculatorInputs } from "./types";

export type RawInputs = Record<string, string>;

export function parseInput(raw: string): number | undefined | null {
  const trimmed = raw.trim();
  if (trimmed === "") return undefined;
  const normalized = trimmed.replace(/,/g, "");
  const n = Number(normalized);
  if (!Number.isFinite(n)) return null;
  return n;
}

export function parseInputs(raw: RawInputs): {
  inputs: CalculatorInputs;
  invalidFields: string[];
} {
  const invalidFields: string[] = [];
  const inputs: CalculatorInputs = {};

  const fields: Array<{ key: keyof CalculatorInputs; rawKey: string }> = [
    { key: "cashBalance", rawKey: "cashBalance" },
    { key: "monthlyRevenue", rawKey: "monthlyRevenue" },
    { key: "monthlyExpenses", rawKey: "monthlyExpenses" },
    { key: "priorMonthRevenue", rawKey: "priorMonthRevenue" },
    { key: "priorYearRevenue", rawKey: "priorYearRevenue" },
    { key: "revenue", rawKey: "revenue" },
    { key: "cogs", rawKey: "cogs" },
    { key: "netIncome", rawKey: "netIncome" },
    { key: "smSpend", rawKey: "smSpend" },
    { key: "newCustomers", rawKey: "newCustomers" },
    { key: "arpu", rawKey: "arpu" },
    { key: "grossMarginPercent", rawKey: "grossMarginPercent" },
    { key: "monthlyChurnPercent", rawKey: "monthlyChurnPercent" },
    { key: "preMoneyValuation", rawKey: "preMoneyValuation" },
    { key: "investmentAmount", rawKey: "investmentAmount" },
    { key: "sharesOutstanding", rawKey: "sharesOutstanding" },
    { key: "sharePrice", rawKey: "sharePrice" },
    { key: "shareholdersEquity", rawKey: "shareholdersEquity" },
  ];

  for (const { key, rawKey } of fields) {
    const value = parseInput(raw[rawKey] ?? "");
    if (value === null) {
      invalidFields.push(rawKey);
    } else if (value !== undefined) {
      inputs[key] = value;
    }
  }

  return { inputs, invalidFields };
}
