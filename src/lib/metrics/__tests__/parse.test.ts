import { describe, expect, it } from "vitest";
import { parseInput, parseInputs } from "../parse";

describe("parseInput", () => {
  it("parses commas and blanks", () => {
    expect(parseInput("")).toBeUndefined();
    expect(parseInput("  1,234.5  ")).toBe(1234.5);
    expect(parseInput("nope")).toBeNull();
  });
});

describe("parseInputs", () => {
  it("collects invalid fields", () => {
    const { inputs, invalidFields } = parseInputs({
      cashBalance: "100",
      monthlyRevenue: "x",
    });
    expect(inputs.cashBalance).toBe(100);
    expect(invalidFields).toContain("monthlyRevenue");
  });
});
