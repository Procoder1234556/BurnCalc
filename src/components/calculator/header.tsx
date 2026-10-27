"use client";

import { Copy, Download, Flame, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CalculatorHeaderProps {
  onReset: () => void;
  onCopy: () => void;
  onExport?: () => void;
  copyLabel?: string;
}

export function CalculatorHeader({
  onReset,
  onCopy,
  onExport,
  copyLabel = "Copy",
}: CalculatorHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex w-[90%] max-w-[1200px] items-center justify-between gap-4 py-3 sm:py-4">
        <div className="flex items-center gap-2">
          <span
            className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground"
            aria-hidden
          >
            <Flame className="size-3.5" strokeWidth={2.5} />
          </span>
          <span className="text-sm font-semibold tracking-tight text-text">BurnCalc</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            aria-label="Reset all inputs"
          >
            <RotateCcw className="size-4" aria-hidden />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCopy}
            aria-label="Copy results summary"
          >
            <Copy className="size-4" aria-hidden />
            {copyLabel}
          </Button>
          {onExport ? (
            <Button type="button" size="sm" onClick={onExport} aria-label="Export summary">
              <Download className="size-4" aria-hidden />
              <span className="hidden sm:inline">Export</span>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
