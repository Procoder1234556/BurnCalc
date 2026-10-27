import { Calculator, LineChart, PieChart } from "lucide-react";
import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PROBLEM_POINTS } from "@/data/marketing";

const ICONS = [Calculator, LineChart, PieChart];

export function ProblemSection() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <MarketingContainer>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            title="Spreadsheets shouldn't be your second job."
            description="Messy models, inconsistent metric definitions, and hours lost before investor meetings — when you only needed a clear burn, runway, and unit economics snapshot."
          />
        </div>
        <ul className="mt-14 grid gap-8 sm:grid-cols-3">
          {PROBLEM_POINTS.map((point, i) => {
            const Icon = ICONS[i] ?? Calculator;
            return (
              <li key={point.title} className="text-center sm:text-left">
                <span
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text"
                  aria-hidden
                >
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-text">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {point.description}
                </p>
              </li>
            );
          })}
        </ul>
      </MarketingContainer>
    </section>
  );
}
