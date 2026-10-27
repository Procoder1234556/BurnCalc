# Product Requirements Document: BurnCalc MVP

## Executive Summary

**Product:** BurnCalc  
**Version:** MVP (1.0)  
**Document Status:** Final (MVP scope)  
**Last Updated:** 2025-10-25

### Product Vision

BurnCalc is a clean, browser-based financial metrics calculator. Users enter a small set of numbers—revenue, expenses, cash, unit-economics inputs, cap-table assumptions, and optional public-company fields—and instantly see 12–15 core metrics with short, plain-language explanations. The product favors **simple inputs and clear outputs** over spreadsheets or heavy modeling tools, so VCs can screen deals quickly and founders can sanity-check pitch metrics before a meeting.

All MVP calculations run **client-side** (no account required). Nothing is stored on a server unless the user explicitly exports or copies results.

### Success Criteria

- A first-time user can produce a complete “deal snapshot” (burn, runway, unit economics, valuation/dilution, and margins) in **under 3 minutes** without documentation.
- **100%** of listed MVP metrics either display a computed value or a clear “needs more inputs” state (no silent wrong numbers).
- Metric formulas match documented definitions in `BACKEND_STRUCTURE.md` (calculation module) with **≥90% unit test coverage** on formula code.
- Lighthouse Performance **≥90** on the calculator page on desktop; WCAG **2.1 AA** for the primary flow.

---

## Problem Statement

### Problem Definition

Founders and investors constantly translate the same handful of inputs into the same metrics—burn, runway, CAC/LTV, Rule of 40, pre/post-money, dilution, EPS—using ad hoc spreadsheets, memo templates, or mental math. That wastes time, introduces inconsistent definitions, and makes screening calls harder when numbers do not reconcile.

There is no widely adopted **minimal-input, explanation-first** web tool tuned for early-stage deal work and pitch prep.

### Impact Analysis

- **User Impact:** Cuts 15–30 minutes per deal memo or pitch dry-run; reduces formula errors and definition mismatches between founder and investor.
- **Market Impact:** Large addressable audience (angels, seed funds, accelerators, bootstrapped founders); low switching cost from spreadsheets.
- **Business Impact:** MVP is free utility; future monetization via saved scenarios, team workspaces, export branding, or API (post-MVP).

---

## Target Audience

### Primary Persona: “Screening VC” (Alex)

**Demographics:**
- Associate or principal at seed/Series A fund; 26–40; US/EU/India; works from laptop + calls.

**Psychographics:**
- Values speed and comparability across deals; skeptical of over-modeled decks; wants defensible numbers.

**Jobs to Be Done:**
1. **Functional:** Turn founder-shared inputs into standard metrics before a partner meeting.
2. **Emotional:** Feel confident the math is right and definitions are standard.
3. **Social:** Share a one-screen snapshot in Slack or a memo without sending a messy sheet.

**Current Solutions & Pain Points:**

| Current Solution | Pain Points | Our Advantage |
|-----------------|-------------|---------------|
| Excel/Google Sheets | Template drift, broken links, opaque formulas | Fixed formulas + inline explanations |
| Notion calculators | Fragmented, not metric-complete | Single page, 12–15 metrics aligned to VC vocabulary |
| Mental math on calls | Errors, inconsistent MoM vs YoY | Live updates, labeled periods |

### Secondary Persona: “Pitch-prep Founder” (Maya)

**Demographics:**
- Pre-seed to Series A founder; 28–45; preparing investor updates or data room snippets.

**Psychographics:**
- Wants to look prepared without building a full model; time-poor.

**Jobs to Be Done:**
1. Validate that stated burn, runway, and unit economics are internally consistent.
2. Preview dilution from a proposed round before sharing with counsel.

---

## User Stories

### Epic: Instant deal metrics from minimal inputs

**Primary User Story:**  
"As a VC or founder, I want to enter a few financial inputs and see standard metrics with short explanations, so that I can screen or pitch with consistent, defensible numbers."

**Acceptance Criteria:**
- [ ] Inputs grouped into logical sections (Runway & P&L, Growth & margins, Unit economics, Round, Public/later-stage).
- [ ] Outputs update live as inputs change (no submit required).
- [ ] Each metric shows name, value, formula hint, and 1–2 sentence explanation.
- [ ] Invalid or incomplete inputs show inline guidance; metrics that cannot be computed show “—” and why.

### Supporting User Stories

1. "As a VC, I want burn rate and runway from cash and monthly P&L so that I can assess survival quickly."
   - **AC:** Burn = max(0, monthly expenses − monthly revenue); Runway = cash ÷ burn when burn > 0.

2. "As a founder, I want LTV, CAC, ratio, and payback from S&M and customer metrics so that I can defend unit economics."
   - **AC:** Documented formulas; divide-by-zero guarded.

3. "As either user, I want pre-money, post-money, investor ownership, and dilution from round inputs."
   - **AC:** Post = pre + investment; ownership % = investment ÷ post; dilution % = 100 − (pre ÷ post)×100.

4. "As a later-stage user, I want EPS, P/E, and ROE when I provide optional public fields."
   - **AC:** Shown only when required inputs present.

5. "As a user, I want to copy or export a summary for my memo."
   - **AC (P1):** Copy-to-clipboard text block; PDF export optional P1.

---

## Functional Requirements

### Core Features (MVP — P0)

#### Feature 1: Runway & burn panel

- **Description:** Cash balance, monthly revenue, monthly expenses → monthly burn, runway (months).
- **User Value:** Fast survival read.
- **Business Value:** Core brand promise (“BurnCalc”).
- **Acceptance Criteria:**
  - [ ] Burn displays in currency per month.
  - [ ] Runway shows months to 1 decimal when burn > 0; shows “Profitable / no burn” when burn = 0.
  - [ ] Explanation references formula.
- **Dependencies:** `lib/metrics` calculation module.
- **Estimated Effort:** S

#### Feature 2: Growth & profitability metrics

- **Description:** Prior-period revenue for MoM/YoY; COGS or gross margin; net income for margins and Rule of 40.
- **User Value:** Growth and efficiency in one view.
- **Acceptance Criteria:**
  - [ ] MoM and YoY growth % when prior inputs provided.
  - [ ] Gross margin % and net margin % when computable.
  - [ ] Rule of 40 = revenue growth % (YoY preferred, else MoM annualized label shown) + profit margin % (net margin).
- **Estimated Effort:** M

#### Feature 3: Unit economics block

- **Description:** S&M spend, new customers, ARPU, gross margin %, optional monthly churn → CAC, LTV, LTV:CAC, payback months.
- **Formulas (MVP):**
  - CAC = S&M ÷ new customers
  - LTV = (ARPU × gross margin fraction) ÷ monthly churn rate (when churn > 0)
  - Payback = CAC ÷ (ARPU × gross margin fraction)
- **Acceptance Criteria:**
  - [ ] All ratios handle zero/empty inputs gracefully.
- **Estimated Effort:** M

#### Feature 4: Valuation & cap table (simplified)

- **Description:** Pre-money valuation, new money → post-money, investor ownership %, existing shareholder dilution %.
- **Acceptance Criteria:**
  - [ ] Post-money = pre-money + investment.
  - [ ] Investor ownership = investment ÷ post-money × 100.
  - [ ] Dilution = (1 − pre ÷ post) × 100.
- **Estimated Effort:** S

#### Feature 5: Corporate / later-stage metrics (optional inputs)

- **Description:** Net income, shares outstanding, share price, shareholders’ equity → EPS, P/E, ROE.
- **Acceptance Criteria:**
  - [ ] Section collapsible or visually secondary; metrics hidden until inputs exist.
- **Estimated Effort:** S

#### Feature 6: Metric glossary & explanations

- **Description:** Each output includes a tooltip or subtext with definition and typical “good/bad” context (non-advisory).
- **Acceptance Criteria:**
  - [ ] Copy is concise (&lt;280 characters per metric).
- **Estimated Effort:** S

### Should Have (P1)

- ARR/MRR toggle and implied ARR from MRR.
- Magic Number = net new ARR ÷ prior-quarter S&M.
- Monthly churn impact on LTV sensitivity (slider).
- Save scenario to `localStorage`; share via encoded URL query (no server).
- Export markdown/plain-text summary.

### Could Have (P2)

- Multi-currency with FX input.
- Cap table with multiple investors.
- PDF branded export.
- Team accounts and saved deal library.

### Out of Scope (Won't Have) — MVP

- **User authentication / accounts:** Adds friction; defer to P2.
- **Server-side data storage:** Privacy and scope; client-only for MVP.
- **Full financial modeling (3-statement):** Conflicts with minimal-input vision.
- **Investment advice or recommendations:** Legal/compliance; explanations only.
- **Real-time market data feeds:** PE requires user-supplied price.

---

## Non-Functional Requirements

### Performance

- **Page Load:** &lt; 2 seconds LCP (p95) on broadband.
- **Interaction:** Metric recalc &lt; 16ms per keystroke batch (client-side).
- **Concurrent Users:** Static/SSR shell on Vercel; scales with CDN (no MVP API).
- **Uptime:** 99.9% (Vercel SLA).

### Security

- **Authentication:** None for MVP.
- **Authorization:** N/A.
- **Data Protection:** No PII collection; inputs stay in browser unless user exports.
- **Compliance:** No PCI; optional anonymous analytics only with consent (P1).

### Usability

- **Accessibility:** WCAG 2.1 AA (labels, focus, contrast, `prefers-reduced-motion`).
- **Browser Support:** Chrome, Safari, Firefox, Edge (latest 2 versions).
- **Mobile Support:** Responsive single-column layout; touch-friendly inputs.
- **Internationalization:** English MVP; number formatting via `Intl` (P1).

### Scalability

- **User Growth:** Edge-hosted static assets; no database in MVP.
- **Data Growth:** N/A (client-only).

---

## Quality Standards (Anti-Vibe Rules)

### Code Quality Requirements

- **Type Safety:** Strict TypeScript; no `any` in `src/lib/metrics*.ts`.
- **Architecture:** Pure functions in `src/lib/metrics`; UI components only format and bind.
- **Error Handling:** `Result` or nullable returns for invalid math; never `NaN` in UI.
- **Testing:** ≥90% coverage on `src/lib/metrics`; Vitest per `TECH_STACK.md`.

### Design Quality Requirements

- **Design System:** Tokens in `globals.css` / Tailwind `@theme`; no random hex in components.
- **Accessibility:** Keyboard navigable inputs; `aria-describedby` for help text.
- **Performance:** Core Web Vitals green on `/`.

### What This Project Will NOT Accept

- Placeholder “lorem” metric copy in production.
- Auth or database in MVP without PRD revision.
- Skipped tests for formula changes.
- Deprecated Next.js Pages Router for new code (App Router only).

---

## UI/UX Requirements

### Design Principles

1. **Clarity over density:** One primary calculator view; outputs read like a memo sidebar.
2. **Progressive disclosure:** Advanced/public-company fields collapsed by default.
3. **Trust through transparency:** Show formula hints, not black-box scores.

### Information Architecture

```
├── Landing / Calculator (/)
│   ├── Inputs (left / top on mobile)
│   │   ├── Cash & monthly P&L
│   │   ├── Growth & margins
│   │   ├── Unit economics
│   │   ├── Fundraising round
│   │   └── Public company (optional)
│   └── Results (right / below)
│       ├── Survival (burn, runway)
│       ├── Growth & margins
│       ├── Unit economics
│       ├── Valuation & dilution
│       └── Corporate ratios
├── About / Methodology (/methodology) — P1
└── Privacy (/privacy) — P1
```

### Key User Flows

#### Flow 1: VC quick screen

```mermaid
graph LR
    A[Open BurnCalc] --> B[Enter cash, revenue, expenses]
    B --> C[See burn & runway]
    C --> D[Add CAC/LTV inputs]
    D --> E[Review LTV:CAC & Rule of 40]
    E --> F[Copy summary for memo]
```

#### Flow 2: Founder round check

```mermaid
graph LR
    A[Open BurnCalc] --> B[Enter pre-money & raise]
    B --> C[See ownership & dilution]
    C --> D[Adjust pre-money]
    D --> E[Share numbers with co-founder]
```

---

## Success Metrics

### North Star Metric

**Weekly active calculators completed** — session with ≥3 metric sections populated and ≥10 seconds on page (proxy for real use).

### OKRs for MVP (First 90 Days)

**Objective 1:** Prove utility with investors and founders  
- **KR1:** 500 unique users in 90 days  
- **KR2:** ≥40% of sessions populate unit economics or runway sections  
- **KR3:** ≥15% copy/export interaction rate (P1 when shipped)

**Objective 2:** Trustworthy math  
- **KR1:** Zero known formula bugs after launch  
- **KR2:** ≥90% unit test coverage on metrics module  

### Metrics Framework

| Category | Metric | Target | Measurement |
|----------|--------|--------|-------------|
| Acquisition | Unique visitors | 500 / 90d | Vercel Analytics |
| Activation | Completed snapshot sessions | 40% | Custom event |
| Retention | 7-day return rate | 15% | Analytics |
| Revenue | N/A MVP | — | — |
| Referral | Shared links opened | 50 | URL param tracking (P1) |

---

## Constraints & Assumptions

### Constraints

- **Budget:** Minimal (Vercel hobby/pro, OSS stack).
- **Timeline:** MVP in 2–3 weeks solo dev.
- **Resources:** 1 full-stack developer.
- **Technical:** Next.js 15 App Router, client-side calc, Vercel deploy (see `TECH_STACK.md`).

### Assumptions

- Users understand basic terms (burn, pre-money); glossary suffices for edge cases.
- YoY growth uses user-supplied prior-year revenue (no automatic fiscal calendar).
- LTV uses constant churn and ARPU (no cohort model in MVP).

### Open Questions

- Default currency symbol (USD vs locale)?
- Annualize MoM for Rule of 40 label when YoY missing?

### Dependencies

- Vercel hosting (existing project linkage).
- Context7 / official docs for Next.js, Tailwind, Vitest during implementation.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Formula disagreement with users | Med | Med | Document definitions; methodology page |
| Scope creep (full cap table) | High | Med | Strict P0 list in this PRD |
| Misinterpretation as financial advice | Low | High | Disclaimers; no recommendations |
| Poor mobile UX | Med | Med | Mobile-first layout in `FRONTEND_GUIDELINES.md` |

---

## MVP Definition of Done

### Feature Complete

- [ ] All P0 features implemented
- [ ] All acceptance criteria met
- [ ] Code review completed

### Quality Assurance

- [ ] Unit test coverage ≥90% on metrics
- [ ] Manual cross-check against 3 reference spreadsheets
- [ ] Performance benchmarks met

### Documentation

- [ ] Methodology aligns with `BACKEND_STRUCTURE.md` formulas
- [ ] `TECH_STACK.md` matches repo
- [ ] Deployment steps in `IMPLEMENTATION_PLAN.md` verified

### Release Ready

- [ ] Staging/preview on Vercel validated
- [ ] Error monitoring optional (Sentry P1)
- [ ] Rollback via Vercel instant rollback
- [ ] Launch note prepared

---

## MVP Metric Catalog (Reference)

| Metric | Required inputs (minimum) |
|--------|---------------------------|
| Monthly burn | Monthly expenses, monthly revenue |
| Runway (mo) | Cash, burn &gt; 0 |
| Revenue growth MoM | Current & prior month revenue |
| Revenue growth YoY | Current & prior year revenue |
| Gross margin % | Revenue, COGS (or direct gross margin %) |
| Net margin % | Revenue, net income |
| CAC | S&M spend, new customers |
| LTV | ARPU, gross margin %, monthly churn % |
| LTV : CAC | LTV and CAC |
| Payback (mo) | CAC, ARPU, gross margin % |
| Rule of 40 | Growth % + profit margin % |
| Pre / post-money | Pre-money, investment |
| Investor ownership % | Investment, post-money |
| Dilution % | Pre-money, post-money |
| EPS | Net income, shares outstanding |
| P/E | Share price, EPS |
| ROE | Net income, shareholders’ equity |

---
