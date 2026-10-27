"use client";

import type { RawInputs } from "@/lib/metrics/parse";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InputGroup, type InputFieldConfig } from "@/components/calculator/input-group";

const INVALID_MSG = "Enter a valid number.";

function field(
  id: string,
  label: string,
  raw: RawInputs,
  invalidFields: string[],
  opts?: Partial<InputFieldConfig>,
): InputFieldConfig {
  return {
    id,
    label,
    value: raw[id] ?? "",
    invalid: invalidFields.includes(id),
    errorMessage: INVALID_MSG,
    ...opts,
  };
}

export interface InputPanelProps {
  raw: RawInputs;
  invalidFields: string[];
  onChange: (id: string, value: string) => void;
  onCorporateOpen?: (open: boolean) => void;
}

export function InputPanel({
  raw,
  invalidFields,
  onChange,
  onCorporateOpen,
}: InputPanelProps) {
  const survival: InputFieldConfig[] = [
    field("cashBalance", "Cash balance", raw, invalidFields, {
      prefix: "$",
      hint: "Cash on hand today.",
      placeholder: "2,400,000",
    }),
    field("monthlyRevenue", "Monthly revenue", raw, invalidFields, {
      prefix: "$",
      hint: "Recognized revenue this month.",
      placeholder: "185,000",
    }),
    field("monthlyExpenses", "Monthly expenses / burn", raw, invalidFields, {
      prefix: "$",
      hint: "All operating spend this month.",
      placeholder: "310,000",
    }),
  ];

  const growth: InputFieldConfig[] = [
    field("priorMonthRevenue", "Prior month revenue", raw, invalidFields, {
      prefix: "$",
      hint: "For month over month growth.",
    }),
    field("priorYearRevenue", "Prior year revenue", raw, invalidFields, {
      prefix: "$",
      hint: "For year over year growth.",
    }),
    field("grossMarginPercent", "Gross margin %", raw, invalidFields, {
      suffix: "%",
      hint: "0 to 100. Used for LTV if COGS is empty.",
      placeholder: "72",
    }),
    field("revenue", "Period revenue (optional)", raw, invalidFields, {
      prefix: "$",
      hint: "Annual revenue for margins; defaults to monthly × 12.",
    }),
    field("cogs", "COGS (optional)", raw, invalidFields, {
      prefix: "$",
      hint: "Same period as revenue.",
    }),
    field("netIncome", "Net income (optional)", raw, invalidFields, {
      prefix: "$",
      hint: "For net margin and Rule of 40.",
    }),
  ];

  const unitEconomics: InputFieldConfig[] = [
    field("smSpend", "Sales & marketing spend", raw, invalidFields, {
      prefix: "$",
      hint: "S&M in the same period as new customers.",
      placeholder: "48,000",
    }),
    field("newCustomers", "New customers", raw, invalidFields, {
      hint: "Customers acquired in that period.",
      placeholder: "126",
    }),
    field("arpu", "ARPU (monthly)", raw, invalidFields, {
      prefix: "$",
      hint: "Average revenue per user per month.",
      placeholder: "890",
    }),
    field("monthlyChurnPercent", "Churn rate % (monthly)", raw, invalidFields, {
      suffix: "%",
      hint: "Customer churn per month, 0 to 100.",
      placeholder: "3.2",
    }),
  ];

  const round: InputFieldConfig[] = [
    field("preMoneyValuation", "Pre-money valuation", raw, invalidFields, {
      prefix: "$",
      hint: "Valuation before new money.",
      placeholder: "18,000,000",
    }),
    field("investmentAmount", "Investment amount", raw, invalidFields, {
      prefix: "$",
      hint: "Amount raised in this round.",
      placeholder: "4,500,000",
    }),
    field("sharesOutstanding", "Shares outstanding", raw, invalidFields, {
      hint: "For EPS and ownership context.",
    }),
  ];

  const corporate: InputFieldConfig[] = [
    field("sharePrice", "Share price", raw, invalidFields, {
      prefix: "$",
      hint: "For P/E ratio.",
    }),
    field("shareholdersEquity", "Shareholders' equity", raw, invalidFields, {
      prefix: "$",
      hint: "For return on equity.",
    }),
  ];

  return (
    <div className="panel-glow rounded-lg border border-border bg-surface p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Inputs</p>
      <div className="mt-6 space-y-8">
        <InputGroup title="Cash & P&L" fields={survival} onChange={onChange} />
        <Separator />
        <InputGroup title="Growth & margins" fields={growth} onChange={onChange} />
        <Separator />
        <InputGroup title="Unit economics" fields={unitEconomics} onChange={onChange} />
        <Separator />
        <InputGroup title="Valuation & cap table" fields={round} onChange={onChange} />
        <Accordion
          type="single"
          collapsible
          className="w-full"
          onValueChange={(v) => onCorporateOpen?.(v === "corporate")}
        >
          <AccordionItem value="corporate" className="border-border">
            <AccordionTrigger className="py-2 text-sm font-semibold text-text">
              Later stage (optional)
            </AccordionTrigger>
            <AccordionContent>
              <InputGroup
                title="Corporate ratios"
                fields={corporate}
                onChange={onChange}
                className="pt-2"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
