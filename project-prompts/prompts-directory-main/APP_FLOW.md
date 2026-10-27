# Application Flow Documentation — BurnCalc

## 1. Entry Points

### Primary Entry Points

- **Direct URL:** `https://burncalc.app/` (or Vercel preview URL) loads the calculator immediately—no gate, no login.
- **Landing / Calculator:** Single-page experience: inputs + live results on `/`.
- **Deep Links (P1):** `/?scenario=<base64>` hydrates inputs from URL (shareable snapshot).
- **OAuth/Social Login:** Not in MVP.

### Secondary Entry Points

- **Search Engine:** SEO title/description for “startup burn runway calculator”, “LTV CAC calculator”, “pre money post money dilution”.
- **Marketing Campaigns:** UTM params preserved; same `/` experience.

---

## 2. Core User Flows

### Flow 1: Quick runway check

**Goal:** Determine monthly burn and runway from cash and P&L.  
**Entry Point:** `/`  
**Frequency:** High (every screening call)

#### Happy Path

1. **Screen: Calculator (`/`)**
   - Elements: Section “Cash & monthly P&L” — cash balance, monthly revenue, monthly expenses (currency inputs).
   - User Action: Enters three numbers.
   - System Response: Live update of **Monthly burn** and **Runway** in results panel.
   - Validation: Non-negative numbers; empty treated as blank (metric shows “—”).

2. **Results: Survival metrics**
   - Elements: Burn (currency/mo), Runway (months), explanation text.
   - Success State: User reads runway and copies value for memo (P1: copy button).

#### Error States

- **Negative cash entered**
  - Display: Inline warning “Cash is usually non-negative; check sign.”
  - Action: User corrects; metrics still compute if desired.

- **Expenses &lt; revenue (profitable)**
  - Display: Burn = 0; Runway = “Profitable / no burn”
  - Action: None required.

#### Edge Cases

- User clears one field → dependent metrics show “—” with “Needs monthly expenses and revenue.”
- Very small burn → runway shows large number with note “&gt;120 months” cap optional for display.

#### Exit Points

- Success: User leaves with numbers copied or memorized.
- Abandonment: Close tab (no server state in MVP).

---

### Flow 2: Unit economics review

**Goal:** Compute CAC, LTV, ratio, payback.  
**Entry Point:** `/` → scroll to “Unit economics”  
**Frequency:** Medium-high

#### Happy Path

1. User enters S&M spend, new customers, ARPU, gross margin %, monthly churn %.
2. System computes CAC, LTV, LTV:CAC, payback months.
3. User reads explanations (e.g. “LTV:CAC &gt; 3 often cited for SaaS—context varies”).

#### Error States

- **New customers = 0**
  - Display: CAC “—”; message “Add new customers acquired in period.”
- **Churn = 0**
  - Display: LTV “—” or “∞ not shown”; prompt to enter churn &gt; 0 for LTV.

#### Edge Cases

- Gross margin entered as 0–100 vs 0–1 → normalize in UI (label “%”).

---

### Flow 3: Round dilution preview

**Goal:** Pre/post-money, ownership, dilution.  
**Entry Point:** `/` → “Fundraising round”

#### Happy Path

1. User enters pre-money valuation and investment amount.
2. System shows post-money, investor ownership %, dilution %.
3. User adjusts pre-money slider/input to see sensitivity.

#### Error States

- Investment or pre-money negative → inline error, block calculation.

---

### Flow 4: Later-stage ratios (optional)

**Goal:** EPS, P/E, ROE when public fields known.  
**Entry Point:** Expand “Public company (optional)”

#### Happy Path

1. User enters net income, shares outstanding; optionally share price and equity.
2. EPS, P/E, ROE appear as inputs allow.

#### Error States

- EPS = 0 with price given → P/E shows “—” (divide by zero).

---

## 3. Navigation Map

### Primary Navigation

```
/  (Calculator — default)
├── Methodology  (P1)
├── Privacy      (P1)
└── Footer: disclaimer
```

### Navigation Rules

- **Authentication Required:** None in MVP.
- **Redirect Logic:** N/A.
- **Back Button:** Browser back leaves site; no multi-step wizard.

---

## 4. Screen Inventory

### Screen: Calculator

- **Route:** `/`
- **Access:** Public
- **Purpose:** Enter inputs; view all metrics.
- **Key Elements:**
  - Input sections (5 groups)
  - Results grid grouped by category
  - Disclaimer footer
- **Actions Available:**
  - Type in fields → live recalc
  - (P1) Copy summary → clipboard toast
  - (P1) Reset all → confirm modal
- **State Variants:**
  - **Empty:** Results show placeholders and section intros.
  - **Partial:** Mix of values and “—”.
  - **Complete:** All applicable metrics filled.

### Screen: Methodology (P1)

- **Route:** `/methodology`
- **Access:** Public
- **Purpose:** Formula definitions matching calculation module.

---

## 5. Interaction Patterns

### Pattern: Live calculation

- Validation: On blur and on change (debounced 100ms for performance).
- Loading State: None (sync client math).
- Success: Numbers animate subtly (opacity) on change; respect `prefers-reduced-motion`.
- Error: Inline under field + metric-level reason.

### Pattern: Optional section expand

- Trigger: Click “Public company metrics” disclosure.
- Default: Collapsed on mobile and desktop.

---

## 6. Decision Points

### Decision: Can compute metric?

```
IF all required inputs for metric M are valid numbers
THEN compute and display formatted value
ELSE display "—" and reason string R
```

### Decision: Growth rate for Rule of 40

```
IF prior-year revenue provided AND current revenue provided
THEN use YoY growth % for Rule of 40
ELSE IF prior-month revenue provided
THEN use MoM growth % and label "MoM (not annualized)"
ELSE Rule of 40 shows "—"
```

### Decision: Profit margin for Rule of 40

```
IF net margin computable
THEN use net margin %
ELSE IF gross margin % provided
THEN use gross margin % with label "gross margin used"
ELSE "—"
```

---

## 7. Error Handling Flows

### 404 Not Found

- Display: Simple branded 404 with link to `/`.
- Actions: “Back to calculator”.

### Client runtime error

- Display: Error boundary “Something broke—refresh the page.”
- Log: (P1) Sentry.

### Offline

- Display: Banner “You’re offline; calculations still work.”
- Recovery: N/A (no network needed for MVP).

---

## 8. Responsive Behavior

### Mobile (&lt;768px)

- Single column: inputs first, sticky mini-summary optional (P1).
- Numeric inputs use `inputmode="decimal"`.
- Sections accordion to reduce scroll.

### Desktop (≥1024px)

- Two columns: inputs ~40%, results ~60%.
- Results sticky within viewport where possible.

---

## 9. Animation & Transitions

### Page Transitions

- First load: fade-in results panel (200ms) unless `prefers-reduced-motion: reduce`.

### Micro-interactions

- Input focus: ring per design tokens.
- Metric value change: brief highlight (background flash 150ms).

---
