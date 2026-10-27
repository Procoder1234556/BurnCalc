# Frontend Design System & Guidelines — BurnCalc

## 1. Design Principles

1. **Memo, not dashboard:** Feels like a crisp one-pager an associate would paste into a deal note—quiet UI, loud numbers.
2. **Numbers first:** Metric values use tabular monospace; labels and explanations stay humanist sans.
3. **Honest math:** Every output pairs value + one-line formula hint; no gamified scores.
4. **Accessibility:** WCAG 2.1 AA; respect `prefers-reduced-motion`.

**Aesthetic direction:** Ledger ink on warm off-white—deep navy text, single amber accent for focus/warnings (not generic blue SaaS). Signature element: **live “Deal snapshot” rail** that highlights the 4–5 most complete metrics.

---

## 2. Design Tokens

Define in `src/app/globals.css` via Tailwind v4 `@theme` (Context7: theme variables + `@import "tailwindcss"`).

### Color Palette

```css
@import "tailwindcss";

@theme {
  --color-ink: #0f172a;
  --color-ink-muted: #475569;
  --color-paper: #f8f6f1;
  --color-paper-elevated: #ffffff;
  --color-border: #e2e8f0;
  --color-accent: #b45309;
  --color-accent-soft: #fef3c7;
  --color-positive: #047857;
  --color-negative: #b91c1c;
  --color-info: #0369a1;
  --font-sans: "Source Sans 3", system-ui, sans-serif;
  --font-display: "Fraunces", Georgia, serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
}
```

#### Usage Rules

- **paper / paper-elevated:** Page background vs cards
- **ink / ink-muted:** Headings vs helper text
- **accent:** Focus rings, primary CTA, active section marker
- **positive / negative:** Favorable vs caution metric deltas (use sparingly)
- **info:** Informational callouts only

### Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Page title | Fraunces | 2rem | 600 |
| Section title | Source Sans 3 | 0.875rem uppercase tracking | 600 |
| Body | Source Sans 3 | 1rem | 400 |
| Metric value | IBM Plex Mono | 1.5–2rem | 500 |
| Metric label | Source Sans 3 | 0.875rem | 500 |
| Formula hint | IBM Plex Mono | 0.75rem | 400 |

Load via `next/font/google` in `src/app/layout.tsx`.

### Spacing Scale

Use Tailwind spacing scale; defaults:

- Input groups: `gap-6`
- Card padding: `p-5` (mobile `p-4`)
- Section vertical rhythm: `space-y-10`

### Border Radius

- Inputs/cards: `rounded-lg` (8px)
- Pills/tags: `rounded-full`

### Shadows

- Cards: `shadow-sm` only; no heavy elevation

---

## 3. Layout System

- **Container:** `max-w-6xl mx-auto px-4 sm:px-6`
- **Calculator grid:** `grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10`
  - Inputs: `lg:col-span-2`
  - Results: `lg:col-span-3`

### Breakpoints

Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

---

## 4. Component Library

### Money / number input

```tsx
<div className="space-y-1.5">
  <label htmlFor="cash" className="text-sm font-medium text-ink">
    Cash balance
  </label>
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">$</span>
    <input
      id="cash"
      inputMode="decimal"
      className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-paper-elevated
        font-mono text-ink placeholder:text-ink-muted/50
        focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
      aria-describedby="cash-hint"
    />
  </div>
  <p id="cash-hint" className="text-xs text-ink-muted">Cash on hand today.</p>
</div>
```

### Metric card

```tsx
<article className="rounded-lg border border-border bg-paper-elevated p-4">
  <h3 className="text-sm font-medium text-ink-muted">Runway</h3>
  <p className="mt-1 font-mono text-2xl text-ink tabular-nums">14.2 mo</p>
  <p className="mt-2 text-xs text-ink-muted leading-relaxed">
    Cash ÷ monthly burn. How long you can run at current burn.
  </p>
  <p className="mt-1 font-mono text-[11px] text-ink-muted/80">runway = cash / burn</p>
</article>
```

### Section header

```tsx
<div className="flex items-baseline gap-3 border-b border-border pb-2 mb-4">
  <h2 className="font-display text-lg text-ink">Unit economics</h2>
  <span className="text-xs text-ink-muted">CAC · LTV · Payback</span>
</div>
```

### Primary button (P1 export)

```tsx
<button
  type="button"
  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg
    bg-ink text-paper text-sm font-medium
    hover:bg-ink/90 transition-colors
    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none"
>
  Copy summary
</button>
```

### Disclaimer footer

```tsx
<p className="text-xs text-ink-muted max-w-prose">
  BurnCalc is for illustration only—not investment, tax, or legal advice. Verify formulas
  against your model before sharing externally.
</p>
```

---

## 5. Accessibility Guidelines

- Contrast: ink on paper ≥ 7:1 for body; muted text ≥ 4.5:1.
- All inputs have visible `<label>`; errors use `aria-invalid` + `aria-describedby`.
- Focus: 2px accent ring, offset 2px.
- No essential info by color alone.
- `prefers-reduced-motion`: disable metric highlight animation.

---

## 6. Animation Guidelines

- Default transition: 150–200ms ease-out on border/background only.
- Metric update highlight: background `accent-soft` fade 150ms (disabled when reduced motion).

---

## 7. Icon System

- **Library:** Lucide React (when needed)
- **Sizes:** 16px inline with labels
- Use icons only for copy/export/actions—not decorative metric icons.

---

## 8. State Indicators

### Empty metric

Display em dash `—` with `text-ink-muted` and reason below in `text-xs`.

### Invalid input

Border `negative`; message “Enter a valid number.”

---

## 9. Responsive Design

- Mobile: accordion sections; results after inputs.
- Touch targets: min height 44px on inputs and buttons.

---

## 10. Performance Guidelines

- Calculator as single Client Component bundle; lazy-load fonts.
- Avoid re-rendering entire tree: memoize derived metrics object.
- Next.js: static page shell where possible (`page.tsx` Server Component wrapping client shell).

---

## 11. Browser Support

Latest two versions of Chrome, Firefox, Safari, Edge.
