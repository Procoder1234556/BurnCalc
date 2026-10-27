# Implementation Plan & Build Sequence — BurnCalc

## Overview

**Project:** BurnCalc  
**MVP Target Date:** 2025-11-15 (adjust as needed)  
**Approach:** Documentation-first; formula tests before UI polish

### Build Philosophy

- Implement `src/lib/metrics` before calculator UI.
- Pin stack per `TECH_STACK.md`; use **Context7 MCP** (`resolve-library-id` → `query-docs`) when configuring Next.js Client Components, Tailwind v4 `@import`, or Vitest aliases.
- Deploy preview to Vercel after Phase 2.

---

## Phase 1: Project Setup & Foundation

### Step 1.1: Initialize project

**Duration:** 1–2 hours  
**Goal:** Runnable Next.js 15 app with Tailwind v4 and Vitest

**Tasks:**

1. `npx create-next-app@latest` with TypeScript, ESLint, Tailwind, App Router, `src/` (see `TECH_STACK.md`).
2. `npm install -D vitest vite-tsconfig-paths`
3. Add `vitest.config.ts` with path alias for `@/`.
4. Add `npm run test` and `npm run type-check`.

**Success Criteria:**

- [ ] `npm run dev` works
- [ ] `npm run test` runs (empty suite passes)
- [ ] `npm run build` succeeds

**Reference:** `TECH_STACK.md` §2, §4; Context7 `/vercel/next.js/v15.1.11` (create-next-app, `'use client'`)

---

### Step 1.2: Repository hygiene

**Duration:** 30 min  
**Goal:** CI-ready repo

**Tasks:**

1. `.gitignore` includes `.env*.local`, `.vercel`
2. GitHub Action: lint + test + build on PR
3. Link Vercel project (existing `.vercel/project.json` or new BurnCalc project)

**Success Criteria:**

- [ ] PR checks green on sample commit

---

## Phase 2: Calculation engine (P0 core)

### Step 2.1: Types and parser

**Duration:** 2 hours  
**Goal:** `CalculatorInputs` + `parse.ts`

**Tasks:**

1. Create `src/lib/metrics/types.ts` per `BACKEND_STRUCTURE.md`
2. Implement `parseInput`, `parseInputs` with tests
3. Export `METRICS_VERSION`

**Success Criteria:**

- [ ] Parser tests cover empty, commas, invalid

**Reference:** `BACKEND_STRUCTURE.md` §3, §5

---

### Step 2.2: Metric modules

**Duration:** 4 hours  
**Goal:** All P0 formulas with tests

**Tasks:**

1. Implement `survival.ts`, `growth.ts`, `margins.ts`, `unit-economics.ts`, `valuation.ts`, `corporate.ts`
2. `computeAllMetrics()` in `index.ts`
3. Vitest coverage ≥90% on `src/lib/metrics`

**Success Criteria:**

- [ ] Golden cases match manual spreadsheet checks
- [ ] No `NaN` paths in tests

**Reference:** `PRD.md` Metric Catalog; `BACKEND_STRUCTURE.md` §4

---

## Phase 3: Design system

### Step 3.1: Tokens and fonts

**Duration:** 2 hours  
**Goal:** Global theme matches `FRONTEND_GUIDELINES.md`

**Tasks:**

1. Configure `globals.css` with `@import "tailwindcss"` and `@theme` tokens
2. Load Fraunces, Source Sans 3, IBM Plex Mono via `next/font`
3. Build static layout shell in `src/app/layout.tsx`

**Success Criteria:**

- [ ] Tokens used in sample page; no hardcoded hex in components

**Reference:** `FRONTEND_GUIDELINES.md` §2; Context7 Tailwind Next.js install + `@theme`

---

### Step 3.2: UI primitives

**Duration:** 3 hours  
**Goal:** `NumberField`, `MetricCard`, `Section`

**Tasks:**

1. `src/components/ui/number-field.tsx`
2. `src/components/metrics/metric-card.tsx`
3. Match accessibility patterns from guidelines

**Success Criteria:**

- [ ] Keyboard focus visible; labels associated

**Reference:** `FRONTEND_GUIDELINES.md` §4–5

---

## Phase 4: Calculator UI

### Step 4.1: Client shell

**Duration:** 4 hours  
**Goal:** Live calculator on `/`

**Tasks:**

1. `calculator-shell.tsx` with `'use client'` (Context7: client boundary)
2. Wire inputs → `parseInputs` → `computeAllMetrics`
3. Layout per `APP_FLOW.md` (two-column desktop)

**Success Criteria:**

- [ ] All P0 metrics display per PRD
- [ ] Partial inputs show “—” + reason

**Reference:** `APP_FLOW.md` Flows 1–4; `PRD.md` P0 features

---

### Step 4.2: Copy & disclaimer

**Duration:** 1 hour  
**Goal:** Trust and compliance

**Tasks:**

1. Footer disclaimer
2. (P1) Copy summary button

**Success Criteria:**

- [ ] Disclaimer visible on `/`

---

## Phase 5: Testing & refinement

### Step 5.1: Unit tests (complete)

**Duration:** 1 hour buffer  
**Goal:** Maintain ≥90% metrics coverage on changes

---

### Step 5.2: E2E smoke (P1)

**Duration:** 2 hours  
**Goal:** Playwright: enter cash/expenses → see runway

---

## Phase 6: Deployment

### Step 6.1: Vercel preview

**Duration:** 1 hour  
**Tasks:** Connect repo, verify preview URL, run smoke on preview

### Step 6.2: Production

**Duration:** 30 min  
**Tasks:** Custom domain (optional), analytics toggle

**Success Criteria:**

- [ ] Production `/` loads &lt; 2s LCP
- [ ] Lighthouse accessibility ≥90

---

## Milestones & Timeline

| Milestone | Target | Deliverables |
|-----------|--------|--------------|
| Foundation | Week 1 | Next.js + Vitest + CI |
| Engine complete | Week 1–2 | Metrics lib + tests |
| UI complete | Week 2 | Calculator page |
| MVP launch | Week 3 | Vercel prod + docs synced |

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Formula disputes | Med | `BACKEND_STRUCTURE.md` + methodology page |
| Scope creep (auth, DB) | High | PRD out-of-scope |
| Tailwind v4 config drift | Med | Context7 docs + pin versions |

---

## Success Criteria (Overall)

1. All P0 features in `PRD.md`
2. Flows in `APP_FLOW.md` work on mobile and desktop
3. UI matches `FRONTEND_GUIDELINES.md`
4. Formulas match `BACKEND_STRUCTURE.md`
5. Stack matches `TECH_STACK.md`
6. ≥90% test coverage on metrics module

---

## Post-MVP Roadmap

1. P1: URL share, localStorage, copy export, Magic Number, ARR
2. P2: Accounts, saved scenarios API, multi-investor cap table

---

## Using documentation with AI (each session)

1. Attach relevant files from `project-prompts/prompts-directory-main/`
2. For library setup questions, use Context7: `resolve-library-id` then `query-docs` (max 3 queries per topic)
3. Implement only the current `IMPLEMENTATION_PLAN` step; confirm acceptance criteria before moving on
