"use client";

import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { PrimaryButton } from "@/components/marketing/primary-button";
import { WisprEditorialLead } from "@/components/marketing/wispr-editorial-lead";
import { JitterReveal } from "@/components/motion/jitter-reveal";
import { Button } from "@/components/ui/button";
import {
  WISPR_FLOW_CHAPTERS,
  WISPR_FLOW_CLOSER,
  WISPR_FLOW_INTRO,
  WISPR_FLOW_PULL_QUOTES,
} from "@/data/wispr-flow-marketing";

export function WisprFlowSection() {
  return (
    <section
      id="story"
      className="scroll-mt-24 border-y border-border bg-surface-muted/70 py-16 sm:py-24"
      aria-labelledby="wispr-flow-title"
    >
      <MarketingContainer>
        <JitterReveal>
          <WisprEditorialLead
            titleId="wispr-flow-title"
            eyebrow={WISPR_FLOW_INTRO.eyebrow}
            title={WISPR_FLOW_INTRO.title}
            description={WISPR_FLOW_INTRO.lede}
            byline={WISPR_FLOW_INTRO.byline}
          />
        </JitterReveal>

        <div className="mx-auto mt-14 max-w-3xl space-y-6">
          {WISPR_FLOW_CHAPTERS.map((chapter, i) => (
            <JitterReveal
              key={chapter.id}
              delayMs={i * 80}
              as="article"
              className="panel-glow rounded-xl border border-border bg-white/80 p-6 sm:p-8"
            >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {chapter.label}
                  </p>
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-text sm:text-[1.35rem]">
                  {chapter.headline}
                  {chapter.id === "runway" ? <piix-pal pal="moss" aria-hidden /> : null}
                </h3>
                <div className="mt-4 space-y-4">
                  {chapter.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-pretty text-[15px] leading-[1.75] text-muted sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
            </JitterReveal>
          ))}
        </div>

        <ul className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          {WISPR_FLOW_PULL_QUOTES.map((item, i) => (
            <JitterReveal
              key={item.quote}
              delayMs={i * 60}
              as="li"
              className="panel-glow h-full rounded-xl border border-border bg-white/80 p-5"
            >
              <blockquote className="text-pretty text-sm leading-relaxed text-text">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {item.context}
              </p>
            </JitterReveal>
          ))}
        </ul>

        <JitterReveal delayMs={120}>
          <div className="panel-glow mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-white px-6 py-10 text-center sm:px-10">
            <h3 className="text-balance text-xl font-semibold text-text sm:text-2xl">
              {WISPR_FLOW_CLOSER.title}
            </h3>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted sm:text-[15px]">
              {WISPR_FLOW_CLOSER.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton href="/calculator" className="rounded-md px-6">
                {WISPR_FLOW_CLOSER.primaryCta}
              </PrimaryButton>
              <Button asChild variant="outline" className="h-10 rounded-md px-5 text-sm">
                <Link href="/tools">{WISPR_FLOW_CLOSER.secondaryCta}</Link>
              </Button>
            </div>
          </div>
        </JitterReveal>
      </MarketingContainer>
    </section>
  );
}
