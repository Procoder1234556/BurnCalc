"use client";

import { MarketingContainer } from "@/components/marketing/container";
import { PrimaryButton } from "@/components/marketing/primary-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { INTEGRATIONS } from "@/data/marketing";
import { SIGNUP_URL } from "@/lib/marketing/links";

export function IntegrationsGrid() {
  return (
    <section id="integrations" className="py-14 sm:py-20 lg:py-28">
      <MarketingContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight text-text sm:text-3xl">
              Connect your numbers
            </h2>
            <p className="mt-3 max-w-lg text-sm text-muted">
              Pull figures from the tools you already use, then paste them into BurnCalc
              for instant metrics.
            </p>
          </div>
          <PrimaryButton href={SIGNUP_URL} className="h-9 text-xs">
            Open workspace
          </PrimaryButton>
        </div>
        <TooltipProvider>
          <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {INTEGRATIONS.map((item) => (
              <li key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="flex aspect-square flex-col items-center justify-center rounded-md border border-border bg-surface p-2 transition-colors hover:border-primary/40"
                      tabIndex={0}
                    >
                      <span
                        className="size-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                        aria-hidden
                      />
                      <span className="mt-2 text-center text-[9px] font-medium text-muted">
                        {item.name.split(" ")[0]}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{item.name}</TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
        <ul className="mt-10 grid gap-4 text-center sm:grid-cols-3">
          {[
            "Paste from sheets in seconds",
            "No API keys required",
            "Export back to your workflow",
          ].map((line) => (
            <li key={line} className="text-xs text-muted">
              <span className="text-primary">→ </span>
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-[10px] text-muted">
          Integrations shown for workflow context. BurnCalc does not connect to third
          party APIs in the free workspace.
        </p>
      </MarketingContainer>
    </section>
  );
}
