"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RevealOnView } from "@/components/landing/reveal-on-view";

const FAQ = [
  {
    q: "Do you store my numbers?",
    a: "No. Calculations run in your browser. Nothing is sent to a server unless you copy or export results yourself.",
  },
  {
    q: "Who is BurnCalc for?",
    a: "Seed and Series A investors screening deals, and founders sanity checking pitch metrics before a partner meeting.",
  },
  {
    q: "How is burn defined?",
    a: "Monthly burn is max(0, monthly expenses minus monthly revenue). Runway is cash divided by burn when burn is positive.",
  },
  {
    q: "How is LTV calculated?",
    a: "LTV uses ARPU, gross margin, and monthly churn with constant assumptions. It is a simple model, not a cohort forecast.",
  },
  {
    q: "Is this financial advice?",
    a: "No. BurnCalc shows standard formulas with short explanations. Verify against your model before sharing externally.",
  },
  {
    q: "Do I need an account?",
    a: "No signup for the MVP. Open the page, enter inputs, and read the live results.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-border bg-surface/50"
    >
      <div className="mx-auto w-[90%] max-w-[1200px] px-0 py-12 sm:py-16">
        <RevealOnView>
          <h2
            id="faq-heading"
            className="max-w-[680px] text-balance text-2xl font-bold text-text sm:text-3xl"
          >
            Questions before you paste the deck
          </h2>
          <Accordion type="single" collapsible className="mt-8 max-w-3xl">
            {FAQ.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-pretty text-sm text-muted">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnView>
      </div>
    </section>
  );
}
