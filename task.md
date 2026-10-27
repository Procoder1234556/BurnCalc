# BurnCalc — Task tracker

**Last updated:** 2025-10-25  
**Current phase:** 4 — Calculator UI (landing + calculator on `/` in progress)  
**Docs:** `project-prompts/prompts-directory-main/` (PRD, APP_FLOW, TECH_STACK, etc.)

---

## Status legend

- `[ ]` Not started  
- `[~]` In progress  
- `[x]` Done  
- `[!]` Blocked (note why in **Log** below)

---

## Phase 0 — Documentation

- [x] Unzip project prompts template
- [x] Fill PRD.md (BurnCalc vision, metrics, scope)
- [x] Fill APP_FLOW.md
- [x] Fill TECH_STACK.md (+ Context7 workflow)
- [x] Fill FRONTEND_GUIDELINES.md
- [x] Fill BACKEND_STRUCTURE.md (metrics module)
- [x] Fill IMPLEMENTATION_PLAN.md
- [x] Create task.md (this file)

---

## Phase 1 — Project setup & foundation

### 1.1 Initialize project

- [x] Next.js App Router + `src/` (manual scaffold; deps from package.json)
- [x] Vitest + `vite-tsconfig-paths`; `npm run test` passes
- [x] `npm run build` succeeds
- [~] Pin versions per TECH_STACK.md (versions differ slightly from doc)

### 1.2 Repository hygiene

- [ ] `.gitignore` / env templates
- [ ] GitHub Action: lint + test + build on PR
- [ ] Vercel project linked to repo

---

## Phase 2 — Calculation engine

### 2.1 Types & parser

- [ ] `src/lib/metrics/types.ts`
- [ ] `src/lib/metrics/parse.ts` + tests

### 2.2 Metric modules (≥90% coverage)

- [x] `survival.ts` — burn, runway
- [x] `growth.ts` — MoM, YoY, Rule of 40
- [x] `margins.ts` — gross, net margin
- [x] `unit-economics.ts` — CAC, LTV, ratio, payback
- [x] `valuation.ts` — pre/post, ownership, dilution
- [x] `corporate.ts` — EPS, P/E, ROE
- [x] `index.ts` — `computeAllMetrics`, `METRICS_VERSION`
- [ ] Golden checks vs reference spreadsheet (3 scenarios)
- [ ] ≥90% coverage (parser + survival tests only so far)

---

## Phase 3 — Design system

- [x] `globals.css` — Tailwind v4 `@theme` tokens (FRONTEND_GUIDELINES)
- [x] Fonts in `layout.tsx` (Fraunces, Source Sans 3, IBM Plex Mono)
- [x] `NumberField`, `MetricCard`, `SectionHeader` components

---

## Phase 4 — Calculator UI

- [x] `calculator-shell.tsx` (`use client`) on `/`
- [x] Input sections (5 groups) wired to parser + metrics
- [x] Results panel with explanations + formula hints
- [x] Empty / partial / invalid states per APP_FLOW
- [x] Footer disclaimer
- [x] Marketing landing sections (hero, benefits, how it works, tagline reveal, FAQ)
- [~] Mobile responsive (single column; public section accordion)

---

## Phase 5 — QA & polish

- [ ] Manual test: VC runway flow
- [ ] Manual test: unit economics flow
- [ ] Manual test: dilution flow
- [ ] Lighthouse: performance + a11y targets (PRD)
- [ ] (P1) Playwright smoke test
- [ ] (P1) Copy summary to clipboard

---

## Phase 6 — Deploy

- [ ] Vercel preview deploy + smoke test
- [ ] Production deploy
- [ ] (Optional) Custom domain

---

## P1 backlog (after MVP)

- [ ] Share scenario via URL query
- [ ] `localStorage` save scenario
- [ ] `/methodology` page
- [ ] Magic Number, ARR/MRR
- [ ] Sentry / analytics

---

## Log (edit as you go)

| Date | Note |
|------|------|
| 2025-10-25 | Project docs completed; app not scaffolded yet. |
| 2025-10-25 | Landing + calculator shipped on `/`; metrics lib + build green. |

---

## Quick links

| Doc | Path |
|-----|------|
| PRD | `project-prompts/prompts-directory-main/PRD.md` |
| Implementation order | `project-prompts/prompts-directory-main/IMPLEMENTATION_PLAN.md` |
| Formulas | `project-prompts/prompts-directory-main/BACKEND_STRUCTURE.md` |
