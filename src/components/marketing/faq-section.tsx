"use client";

import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/data/marketing";

export function FAQSection() {
  return (
    <section id="faq" className="bg-surface-elevated py-20 sm:py-24 lg:py-28">
      <MarketingContainer>
        <SectionHeading align="center" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mx-auto mt-10 max-w-2xl">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left text-[15px] font-medium text-text">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-pretty text-sm leading-relaxed text-muted">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MarketingContainer>
    </section>
  );
}
