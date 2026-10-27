"use client";

import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface FormulaTooltipProps {
  formula: string;
  label?: string;
}

export function FormulaTooltip({ formula, label = "Formula" }: FormulaTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`${label}: ${formula}`}
      >
        <Info className="size-3.5" aria-hidden />
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-medium text-muted">{label}</p>
        <p className="mt-1 font-mono text-xs leading-snug text-text">{formula}</p>
      </TooltipContent>
    </Tooltip>
  );
}
