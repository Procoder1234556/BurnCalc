"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const ITEMS = [
  {
    q: "Do you store my numbers?",
    a: "No. Everything runs in your browser until you copy or export.",
  },
  {
    q: "How is burn calculated?",
    a: "Monthly burn is max(0, expenses minus revenue). Runway divides cash by burn when burn is positive.",
  },
  {
    q: "Is this financial advice?",
    a: "No. BurnCalc shows standard formulas for illustration. Verify before sharing externally.",
  },
];

export function CompactFaq({ className }: { className?: string }) {
  return (
    <section aria-labelledby="faq-heading" className={cn(className)}>
      <h2 id="faq-heading" className="text-lg font-bold text-text">
        Common questions
      </h2>
      <Accordion type="single" collapsible className="mt-4 max-w-2xl">
        {ITEMS.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-sm font-medium text-text">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-pretty text-sm text-muted">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
