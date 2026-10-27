import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { METRIC_FEATURES } from "@/data/marketing";

export function FeatureMetricsGrid() {
  return (
    <section id="metrics" className="bg-surface-elevated py-20 sm:py-24 lg:py-28">
      <MarketingContainer>
        <SectionHeading
          align="center"
          title="Everything you need to calculate in one place"
          description="From survival metrics to round modeling — each output includes a short explanation so you can defend the numbers in the room."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METRIC_FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-[0_6px_20px_rgba(26,26,26,0.04)]"
            >
              <h3 className="text-[15px] font-semibold text-text">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
              <Link
                href={feature.href}
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-text hover:text-muted"
              >
                Learn more
                <ArrowRight className="size-3" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </MarketingContainer>
    </section>
  );
}
