"use client";

import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CalculatorMockup } from "@/components/marketing/calculator-mockup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ITEMS = [
  {
    category: "Growth",
    title: "Rule of 40 and growth rates",
    body: "MoM and annualized revenue growth alongside margin for a quick SaaS health check.",
    mock: "compact" as const,
  },
  {
    category: "Ratios",
    title: "EPS and basic ROE",
    body: "Later stage fields unlock earnings per share and return on equity when you have them.",
    mock: "valuation" as const,
  },
  {
    category: "Workflow",
    title: "Scenario comparison",
    body: "Reset and re-run inputs in seconds during a live partner call or founder sync.",
    mock: "burn" as const,
  },
  {
    category: "Export",
    title: "Shareable summaries",
    body: "Copy or export a clean text snapshot for memos, updates, and data rooms.",
    mock: "unit-economics" as const,
  },
];

export function CapabilityGrid() {
  return (
    <section className="py-14 sm:py-20 lg:py-28">
      <MarketingContainer>
        <SectionHeading
          align="center"
          eyebrow="Platform"
          title="More than just burn"
          description="The same workspace covers growth, ratios, and exports without switching tools."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-border bg-surface p-4"
            >
              <p className="text-[10px] font-bold uppercase text-primary">{item.category}</p>
              <h3 className="mt-2 text-base font-bold text-text">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{item.body}</p>
              <div className="mt-4 overflow-hidden rounded-md border border-border bg-background">
                <CalculatorMockup variant={item.mock} />
              </div>
            </article>
          ))}
        </div>
        <Tabs defaultValue="cash" className="mt-12 flex flex-col items-center">
          <TabsList>
            <TabsTrigger value="cash">Cash</TabsTrigger>
            <TabsTrigger value="unit">Unit economics</TabsTrigger>
            <TabsTrigger value="val">Valuation</TabsTrigger>
            <TabsTrigger value="ratios">Ratios</TabsTrigger>
          </TabsList>
          <TabsContent value="cash" className="text-center text-xs text-muted">
            Burn, runway, and survival metrics from P&L inputs.
          </TabsContent>
          <TabsContent value="unit" className="text-center text-xs text-muted">
            CAC, LTV, payback, and Rule of 40 from customer metrics.
          </TabsContent>
          <TabsContent value="val" className="text-center text-xs text-muted">
            Pre and post money, ownership, and dilution.
          </TabsContent>
          <TabsContent value="ratios" className="text-center text-xs text-muted">
            EPS, P/E, and ROE when cap table fields are filled.
          </TabsContent>
        </Tabs>
      </MarketingContainer>
    </section>
  );
}
