import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { THOUGHTS } from "@/data/quotes-thoughts";

export function ThoughtsSection() {
  return (
    <section id="thoughts" className="scroll-mt-24 border-y border-border bg-background py-16 sm:py-20">
      <MarketingContainer>
        <SectionHeading
          align="center"
          eyebrow="Thoughts"
          title="Short reads before you open a spreadsheet"
          description="Principles we use when building BurnCalc — useful for pitch prep, diligence, and board updates worldwide."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {THOUGHTS.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-border bg-white p-5"
            >
              <h3 className="text-sm font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </MarketingContainer>
    </section>
  );
}
