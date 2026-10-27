# Technology Stack Documentation — BurnCalc

## 1. Stack Overview

**Last Updated:** 2025-10-25  
**Version:** 1.0 (MVP)

### Architecture Pattern

- **Type:** JAMstack — static/SSR shell + client-side calculation
- **Pattern:** Next.js App Router; Server Components for layout/marketing; Client Component for calculator
- **Deployment:** Vercel (edge CDN, preview deployments)
- **Documentation during build:** [Context7](https://context7.com) MCP (`user-context7`) — resolve library IDs, then `query-docs` for Next.js, Tailwind, and Vitest (per team workflow in `documentation guide.md`)

**Rationale:** No user accounts or persisted deal data in MVP → no database or API reduces cost, latency, and compliance surface. All formulas are testable pure TypeScript.

---

## 2. Frontend Stack

### Core Framework

- **Framework:** Next.js
- **Version:** 15.1.11 (pin in `package.json`)
- **Reason:** App Router, fast local dev (Turbopack optional), first-class Vercel deploy
- **Documentation:** https://nextjs.org/docs (Context7: `/vercel/next.js/v15.1.11`)
- **License:** MIT

**Scaffold command (Context7 / official):**

```bash
npx create-next-app@latest burncalc --typescript --eslint --app --src-dir --import-alias "@/*"
```

Use prompts: Tailwind **Yes**, App Router **Yes**, `src/` directory **Yes**.

### UI Library

- **Library:** React
- **Version:** 19.x (match `create-next-app` peer for Next 15.1.11)
- **Documentation:** https://react.dev
- **License:** MIT

### State Management

- **Approach:** React `useState` / `useMemo` in calculator Client Component
- **Reason:** Single-page form; no global store needed for MVP
- **Alternatives considered:** Zustand (rejected: unnecessary), URL state via `nuqs` (P1 for share links)

### Styling

- **Framework:** Tailwind CSS v4
- **Packages:** `tailwindcss`, `@tailwindcss/postcss`, `postcss`
- **Entry:** `src/app/globals.css` — `@import "tailwindcss";` and `@theme` tokens
- **Documentation:** https://tailwindcss.com/docs (Context7: `/websites/tailwindcss`)
- **License:** MIT

### Type Safety

- **Language:** TypeScript 5.x
- **Config:** `strict: true`, `noUncheckedIndexedAccess` recommended
- **Path alias:** `@/*` → `src/*`

### Form Handling

- **Library:** Native controlled inputs (MVP)
- **Validation:** Zod 3.x (optional) for parsing numeric strings → numbers in one helper
- **Reason:** Minimal dependencies; Zod guards edge cases in `parseInput`

### HTTP Client

- **MVP:** None (no API)
- **Future:** `fetch` for saved scenarios API if added

### Routing

- **Built-in:** Next.js App Router (`src/app/`)
- **Client boundary:** `src/components/calculator/calculator-shell.tsx` with `'use client'` (Context7: Client Components require directive at module top)

---

## 3. Backend Stack

### MVP

**No application backend.** Calculation logic lives in `src/lib/metrics/` and runs in the browser.

### Future (P2+)

- **Runtime:** Node.js 20 LTS
- **Framework:** Next.js Route Handlers or Hono on Edge
- **Database:** PostgreSQL + Prisma if user accounts / saved deals
- **Auth:** Clerk or NextAuth — out of MVP scope

---

## 4. DevOps & Infrastructure

### Version Control

- **System:** Git
- **Platform:** GitHub
- **Branch Strategy:** `main` (production), `feature/*`

### CI/CD

- **Platform:** GitHub Actions
- **Workflows:**
  - PR: `npm run lint`, `npm run test`, `npm run build`
  - Merge to `main`: Vercel production deploy

### Hosting

- **Frontend:** Vercel (project linked in repo `.vercel/`)
- **Database:** N/A (MVP)

### Monitoring

- **Analytics:** Vercel Analytics (optional)
- **Errors:** Sentry (P1)

### Testing

- **Unit Tests:** Vitest 3.2.4
- **Documentation:** Context7 `/vitest-dev/vitest/v3_2_4`
- **E2E (P1):** Playwright — smoke test calculator input → result
- **Coverage Target:** ≥90% on `src/lib/metrics/**`

**Vitest config notes (Context7):**

- Use `vite-tsconfig-paths` or align `test.alias` with `tsconfig` paths for `@/`.
- Add `"types": ["vitest/globals"]` if using global test APIs.

---

## 5. Development Tools

### Code Quality

- **Linter:** ESLint (`eslint-config-next`)
- **Formatter:** Prettier (recommended)

### IDE

- VS Code + ESLint, Prettier, Tailwind CSS IntelliSense

### Context7 MCP workflow

1. `resolve-library-id` with `libraryName` + task query.
2. `query-docs` with chosen `libraryId` for setup snippets (one topic per call).
3. Pin versions in this doc when upgrading.

---

## 6. Environment Variables

### MVP

```bash
# Optional — analytics only
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=""
NODE_ENV="development"
```

No secrets required for MVP.

---

## 7. Package.json Scripts (target)

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 8. Dependencies Lock (MVP target)

### Production

```json
{
  "next": "15.1.11",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "zod": "3.24.1"
}
```

### Development

```json
{
  "typescript": "5.7.3",
  "tailwindcss": "4.0.0",
  "@tailwindcss/postcss": "4.0.0",
  "postcss": "8.4.49",
  "eslint": "9.x",
  "eslint-config-next": "15.1.11",
  "vitest": "3.2.4",
  "vite-tsconfig-paths": "5.1.4",
  "@types/node": "22.x",
  "@types/react": "19.x",
  "@types/react-dom": "19.x"
}
```

*Exact patch versions to be locked in `package-lock.json` on install.*

---

## 9. Security Considerations

- No server storage of financial inputs in MVP.
- Content Security Policy via Next.js headers (P1).
- Dependencies: Dependabot weekly.
- Disclaimer in UI: not financial advice.

---

## 10. Version Upgrade Policy

- **Next.js:** Review release notes quarterly; stay on supported minor.
- **Vitest / Tailwind:** Minor updates monthly after CI green.
- **Major bumps:** Staging preview + full test run before production.

---
