"use client";

import { MarketingContainer } from "@/components/marketing/container";
import { WisprEditorialLead } from "@/components/marketing/wispr-editorial-lead";
import { JitterReveal } from "@/components/motion/jitter-reveal";
import { WISPR_VOICE_MEMOS } from "@/data/wispr-flow-marketing";

/** Short “voice memo” cards — Wispr Flow rhythm for quick scanning. */
export function WisprVoiceMemosSection() {
  return (
    <section
      id="memos"
      className="scroll-mt-24 border-b border-border bg-background py-16 sm:py-24"
      aria-labelledby="wispr-memos-title"
    >
      <MarketingContainer>
        <JitterReveal>
          <WisprEditorialLead
            align="center"
            titleId="wispr-memos-title"
            eyebrow="Voice memos"
            title="Three recordings you would actually send yourself"
            description="Dictated-style prompts — read them aloud before a meeting, then open BurnCalc and fill in the fields they name."
          />
        </JitterReveal>

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {WISPR_VOICE_MEMOS.map((memo, i) => (
            <JitterReveal
              key={memo.title}
              delayMs={i * 80}
              as="li"
              className="panel-glow flex h-full flex-col rounded-2xl border border-border bg-surface-elevated/90 p-6"
            >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-text">{memo.title}</h3>
                  <span className="shrink-0 rounded-md border border-border bg-background px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {memo.duration}
                  </span>
                </div>
                <p className="mt-4 flex-1 text-pretty text-sm leading-[1.7] text-muted">
                  {memo.transcript}
                </p>
                <div className="mt-5 flex h-8 items-end gap-0.5 opacity-35" aria-hidden>
                  {[3, 5, 4, 7, 3, 6, 4, 8, 5, 3, 6, 4].map((h, j) => (
                    <span
                      key={j}
                      className="w-1 rounded-full bg-text"
                      style={{ height: `${h * 3}px` }}
                    />
                  ))}
                </div>
            </JitterReveal>
          ))}
        </ul>
      </MarketingContainer>
    </section>
  );
}
