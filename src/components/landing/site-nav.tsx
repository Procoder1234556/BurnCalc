"use client";

import { useCallback, useState } from "react";
import {
  ArrowCounterClockwise,
  Copy,
  DownloadSimple,
  Flame,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SiteNavProps {
  onReset: () => void;
  onCopy: () => void;
  onExport: () => void;
  copyLabel?: string;
}

export function SiteNav({ onReset, onCopy, onExport, copyLabel = "Copy" }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <nav
        aria-label="Primary"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-6"
      >
        <div
          className="pointer-events-auto flex w-full max-w-[1200px] items-center justify-between gap-4 rounded-full border border-border bg-background/90 px-4 py-2 backdrop-blur-md motion-reduce:backdrop-blur-none sm:px-6"
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-current="page"
          >
            <span
              className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-primary"
              aria-hidden
            >
              <Flame className="size-4" weight="fill" />
            </span>
            <span className="text-sm font-semibold text-text">BurnCalc</span>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <Button type="button" variant="ghost" size="sm" onClick={onReset}>
              <ArrowCounterClockwise className="size-4" aria-hidden />
              Reset
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onCopy}>
              <Copy className="size-4" aria-hidden />
              {copyLabel}
            </Button>
            <Button type="button" size="sm" onClick={onExport}>
              <DownloadSimple className="size-4" aria-hidden />
              Export
            </Button>
          </div>

          <button
            type="button"
            className="relative flex size-10 items-center justify-center rounded-full border border-border bg-surface sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={cn(
                "absolute block h-0.5 w-5 bg-text transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
                menuOpen ? "rotate-45" : "-translate-y-1.5",
              )}
              aria-hidden
            />
            <span
              className={cn(
                "absolute block h-0.5 w-5 bg-text transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
                menuOpen ? "-rotate-45" : "translate-y-1.5",
              )}
              aria-hidden
            />
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-3xl motion-reduce:backdrop-blur-none sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <ul className="flex flex-col gap-2 px-6 pt-28">
            {[
              { label: "Calculator", href: "#calculator", delay: "delay-100" },
              { label: "FAQ", href: "#faq", delay: "delay-150" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "nav-item-enter block rounded-lg border border-border px-4 py-4 text-lg font-semibold text-text",
                    item.delay,
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-item-enter delay-200 pt-4">
              <Button type="button" variant="outline" className="w-full" onClick={() => { onReset(); closeMenu(); }}>
                Reset inputs
              </Button>
            </li>
            <li className="nav-item-enter delay-300">
              <Button type="button" className="w-full" onClick={() => { onCopy(); closeMenu(); }}>
                {copyLabel}
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}
