import { describe, expect, it } from "vitest";
import { parseFinancialText } from "@/lib/documents/parse-financial-text";

describe("parseFinancialText", () => {
  it("extracts labeled money fields", () => {
    const text =
      "Cash balance: $2,400,000 Monthly revenue: $185k Monthly expenses: $310,000";
    const { fields, matches } = parseFinancialText(text);
    expect(fields.cashBalance).toBe("2400000");
    expect(fields.monthlyRevenue).toBe("185000");
    expect(fields.monthlyExpenses).toBe("310000");
    expect(matches.length).toBeGreaterThanOrEqual(3);
  });

  it("derives monthly revenue from ARR", () => {
    const { fields } = parseFinancialText("ARR: $1.2M");
    expect(fields.monthlyRevenue).toBe("100000");
  });
});
