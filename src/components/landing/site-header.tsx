"use client";

import { useState } from "react";

const NAV = [
  { href: "#metrics", label: "Metrics" },
  { href: "#benefits", label: "Why" },
  { href: "#how", label: "Flow" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 sm:px-6">
        <a
          href="/"
          className="group flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md bg-ink font-mono text-[10px] font-medium text-paper"
            aria-hidden
          >
            BC
          </span>
          <span className="font-display text-base font-bold tracking-tight text-ink">
            BurnCalc
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:bg-paper-elevated hover:text-ink focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#calculator"
          className="ml-auto hidden min-h-10 items-center justify-center rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 active:scale-[0.98] md:inline-flex"
        >
          Run the numbers
        </a>

        <button
          type="button"
          className="relative ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-paper-elevated md:ml-0 md:hidden focus:outline-none focus:ring-2 focus:ring-accent"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-0.5 w-5 bg-ink transition-all duration-300 ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-ink transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-30 bg-paper/98 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <nav
            className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-14"
            aria-label="Mobile"
          >
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="nav-item-enter font-display text-2xl font-semibold text-ink"
                style={{ animationDelay: `${80 + i * 40}ms` }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#calculator"
              onClick={() => setOpen(false)}
              className="nav-item-enter mt-2 rounded-lg bg-ink px-6 py-3 text-base font-semibold text-paper"
              style={{ animationDelay: "280ms" }}
            >
              Run the numbers
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
