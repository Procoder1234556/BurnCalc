"use client";

import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { PrimaryButton } from "@/components/marketing/primary-button";
import { HERO_QUOTE, ROTATING_QUOTES } from "@/data/quotes-thoughts";
import { JitterReveal } from "@/components/motion/jitter-reveal";
import { useEffect, useState } from "react";

export function QuotesHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_QUOTES.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  const rotating = ROTATING_QUOTES[index] ?? ROTATING_QUOTES[0];

  return (
    <section className="border-b border-border bg-background pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pt-16">
      <MarketingContainer>
        <div className="mx-auto max-w-3xl text-center">
          <JitterReveal>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Quotes & thoughts for founders and investors
            </p>
            <blockquote className="mt-6">
              <p className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight text-text sm:text-3xl lg:text-[2rem]">
                &ldquo;{HERO_QUOTE.text}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-muted">— {HERO_QUOTE.attribution}</footer>
            </blockquote>
          </JitterReveal>

          <JitterReveal delayMs={80} className="mt-10">
            <div
              className="min-h-[4.5rem] rounded-xl border border-border bg-surface-muted/50 px-5 py-4 text-left sm:px-6"
              aria-live="polite"
            >
              <p className="text-sm leading-relaxed text-text sm:text-[15px]">
                &ldquo;{rotating.text}&rdquo;
              </p>
              <p className="mt-2 text-xs text-muted">— {rotating.attribution}</p>
            </div>
          </JitterReveal>

          <JitterReveal delayMs={120} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton href="/tools">Browse free calculators</PrimaryButton>
            <Link
              href="/dashboard/workspace"
              className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-white px-5 text-sm font-medium text-text transition-colors hover:bg-surface-muted"
            >
              Open full workspace
            </Link>
          </JitterReveal>

          <p className="mt-6 text-pretty text-sm text-muted">
            No signup. Calculations stay in your browser — trusted by operators from
            San Francisco to London, Berlin, and Bangalore.
          </p>
        </div>
      </MarketingContainer>
    </section>
  );
}
