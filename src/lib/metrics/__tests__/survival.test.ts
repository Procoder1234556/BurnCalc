import { describe, expect, it } from "vitest";
import { computeMonthlyBurn, computeRunway } from "../survival";

describe("survival", () => {
  it("computes burn as max(0, expenses - revenue)", () => {
    const r = computeMonthlyBurn({
      monthlyExpenses: 100_000,
      monthlyRevenue: 40_000,
    });
    expect(r.status).toBe("ok");
    expect(r.value).toBe(60_000);
  });

  it("burn is zero when profitable", () => {
    const r = computeMonthlyBurn({
      monthlyExpenses: 50_000,
      monthlyRevenue: 80_000,
    });
    expect(r.value).toBe(0);
  });

  it("runway when burn positive", () => {
    const r = computeRunway({
      cashBalance: 1_200_000,
      monthlyExpenses: 100_000,
      monthlyRevenue: 40_000,
    });
    expect(r.status).toBe("ok");
    expect(r.value).toBe(20);
  });

  it("runway profitable message when no burn", () => {
    const r = computeRunway({
      cashBalance: 500_000,
      monthlyExpenses: 40_000,
      monthlyRevenue: 60_000,
    });
    expect(r.reason).toBe("Profitable / no burn");
  });
});
