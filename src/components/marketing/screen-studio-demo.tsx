"use client";

import { useEffect, useState } from "react";
import { CalculatorMockup } from "@/components/marketing/calculator-mockup";
import { DeviceBrowserFrame } from "@/components/marketing/device-browser-frame";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Monthly revenue", x: 28, y: 32 },
  { label: "Runway", x: 72, y: 58 },
  { label: "LTV : CAC", x: 68, y: 78 },
] as const;

/** Screen Studio–style guided cursor over the calculator UI */
export function ScreenStudioDemo({ className }: { className?: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const spot = STEPS[step] ?? STEPS[0];

  return (
    <DeviceBrowserFrame className={cn("relative", className)}>
      <div className="relative overflow-hidden p-1">
        <CalculatorMockup variant="hero" />
        <div
          className="pointer-events-none absolute inset-0 motion-safe:transition-opacity motion-reduce:transition-none"
          aria-hidden
        >
          <div
            className="absolute size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/25 bg-primary/5 motion-safe:animate-ping motion-reduce:animate-none"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          />
          <div
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 motion-safe:transition-all motion-reduce:transition-none duration-700 ease-out"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="drop-shadow-md"
              fill="none"
            >
              <path
                d="M5 3l14 9-6 1-2 6-6-16z"
                fill="#1a1a1a"
                stroke="#fff"
                strokeWidth="1.2"
              />
            </svg>
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground shadow-sm">
              {spot.label}
            </span>
          </div>
        </div>
      </div>
    </DeviceBrowserFrame>
  );
}
