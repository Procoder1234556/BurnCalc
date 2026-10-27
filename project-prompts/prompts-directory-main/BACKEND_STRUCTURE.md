# Calculation Architecture & Data Contracts — BurnCalc

> **Note:** MVP has no server database or REST API. This document defines the **calculation module** (business logic), input/output types, and validation—equivalent to “backend” for a client-only app. Future APIs should mirror these contracts.

## 1. Architecture Overview

### System Architecture

- **Pattern:** Pure functions in `src/lib/metrics/` → consumed by Client Component
- **Data flow:** User input strings → `parseInputs()` → `CalculatorInputs` → `computeAllMetrics()` → `CalculatorOutputs`
- **Persistence:** None (MVP); P1 optional `localStorage` key `burncalc:v1:scenario`
- **Caching:** `useMemo` on derived metrics in UI

---

## 2. Module Layout

```
src/lib/metrics/
  types.ts           # CalculatorInputs, MetricResult, CalculatorOutputs
  parse.ts           # string → number, normalization (%, currency)
  survival.ts        # burn, runway
  growth.ts          # MoM, YoY, Rule of 40
  margins.ts         # gross, net margin
  unit-economics.ts  # CAC, LTV, payback
  valuation.ts       # pre/post, ownership, dilution
  corporate.ts       # EPS, PE, ROE
  index.ts           # computeAllMetrics, exports
  __tests__/         # Vitest suites per file
```

---

## 3. Types

### `CalculatorInputs` (all optional except where noted)

| Field | Type | Description |
|-------|------|-------------|
| `cashBalance` | number | Cash on hand |
| `monthlyRevenue` | number | Current month revenue |
| `monthlyExpenses` | number | Current month expenses (incl. COGS in opex if user bundles) |
| `priorMonthRevenue` | number | For MoM growth |
| `priorYearRevenue` | number | For YoY growth |
| `revenue` | number | Period revenue for margins (defaults to monthly × 12 if only monthly given—document in UI) |
| `cogs` | number | Cost of goods sold (same period as revenue) |
| `netIncome` | number | Net income (same period as revenue) |
| `smSpend` | number | Sales & marketing spend in period |
| `newCustomers` | number | New customers in same period |
| `arpu` | number | Average revenue per user per month |
| `grossMarginPercent` | number | 0–100 |
| `monthlyChurnPercent` | number | 0–100 |
| `preMoneyValuation` | number | Pre-money |
| `investmentAmount` | number | New money |
| `sharesOutstanding` | number | For EPS |
| `sharePrice` | number | For P/E |
| `shareholdersEquity` | number | For ROE |

### `MetricResult<T>`

```ts
interface MetricResult<T = number> {
  value: T | null;
  status: "ok" | "insufficient" | "invalid";
  reason?: string;
  formula: string;
  explanation: string;
}
```

---

## 4. Formulas & Business Rules

### Survival (`survival.ts`)

| Metric | Formula | Rules |
|--------|---------|-------|
| Monthly burn | `max(0, monthlyExpenses - monthlyRevenue)` | Requires expenses & revenue |
| Runway (months) | `cashBalance / monthlyBurn` | If burn = 0 → status `ok`, value `null`, reason “Profitable / no burn” |

### Growth (`growth.ts`)

| Metric | Formula | Rules |
|--------|---------|-------|
| MoM growth % | `(current - prior) / prior * 100` | prior &gt; 0 |
| YoY growth % | `(current - priorYear) / priorYear * 100` | priorYear &gt; 0 |

### Margins (`margins.ts`)

| Metric | Formula | Rules |
|--------|---------|-------|
| Gross margin % | `(revenue - cogs) / revenue * 100` | revenue &gt; 0 |
| Net margin % | `netIncome / revenue * 100` | revenue &gt; 0 |

### Unit economics (`unit-economics.ts`)

| Metric | Formula | Rules |
|--------|---------|-------|
| CAC | `smSpend / newCustomers` | newCustomers &gt; 0 |
| LTV | `(arpu * (grossMarginPercent/100)) / (monthlyChurnPercent/100)` | churn &gt; 0 |
| LTV : CAC | `ltv / cac` | both ok |
| Payback (months) | `cac / (arpu * (grossMarginPercent/100))` | denominator &gt; 0 |

### Valuation (`valuation.ts`)

| Metric | Formula | Rules |
|--------|---------|-------|
| Post-money | `preMoney + investment` | both ≥ 0 |
| Investor ownership % | `investment / postMoney * 100` | postMoney &gt; 0 |
| Dilution % | `(1 - preMoney/postMoney) * 100` | postMoney &gt; 0 |

### Corporate (`corporate.ts`)

| Metric | Formula | Rules |
|--------|---------|-------|
| EPS | `netIncome / sharesOutstanding` | shares &gt; 0 |
| P/E | `sharePrice / eps` | eps ≠ 0 |
| ROE | `netIncome / shareholdersEquity * 100` | equity ≠ 0 |

### Rule of 40 (`growth.ts` + `margins.ts`)

- `ruleOf40 = growthPercent + profitMarginPercent`
- Prefer **YoY growth** if available; else MoM with explicit label in `explanation`.
- Profit margin: prefer **net margin**; else gross margin % with label.

---

## 5. Validation Rules

### Numeric parsing (`parse.ts`)

- Trim whitespace; allow `,` thousands separators.
- Empty string → field omitted (undefined).
- Non-numeric → field invalid; block metrics that depend on it.

### Ranges (soft warnings in UI, hard invalid for math)

- Percent fields: clamp display warning if &lt; 0 or &gt; 100 (churn, margins).
- Money fields: warn if negative where unusual (cash, pre-money).

---

## 6. Error Handling

- Functions never throw for user input; return `status: "insufficient" | "invalid"`.
- UI never renders `NaN` or `Infinity`.

### Standard reasons

- `insufficient`: “Needs [field list].”
- `invalid`: “[Field] must be a positive number.”

---

## 7. Future API (P2) — Contract Sketch

If scenarios are saved server-side:

#### `POST /api/v1/scenarios`

- **Auth:** Required
- **Body:** `{ name: string, inputs: CalculatorInputs }`
- **Response:** `{ id: string, createdAt: string }`

#### `GET /api/v1/scenarios/:id`

- **Response:** `{ inputs, outputs: CalculatorOutputs }`

Mirror types from this document; do not duplicate formula logic on server—import shared package or run same `computeAllMetrics`.

---

## 8. Testing Requirements

- One Vitest file per module; table-driven cases for edge cases (zero burn, zero churn, negative investment blocked).
- Golden tests for 3 reference spreadsheets linked in repo `docs/fixtures/` (P1).

---

## 9. Versioning

- **Calculation version:** `METRICS_VERSION = "1.0.0"` exported from `index.ts`
- Include in exported summary text (P1) so memos remain auditable when formulas change.

---
