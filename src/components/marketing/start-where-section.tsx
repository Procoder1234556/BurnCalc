import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PERSONA_CARDS } from "@/data/marketing";

export function StartWhereSection() {
  return (
    <section className="bg-surface-elevated py-20 sm:py-24 lg:py-28">
      <MarketingContainer>
        <SectionHeading
          align="center"
          title="Start where you are — then see the numbers that matter"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {PERSONA_CARDS.map((card) => (
            <li
              key={card.title}
              className="flex flex-col rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_rgba(26,26,26,0.05)]"
            >
              <h3 className="text-base font-semibold text-text">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-text transition-colors hover:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {card.cta}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </MarketingContainer>
    </section>
  );
}
