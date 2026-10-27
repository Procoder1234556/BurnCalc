"use client";

import { InputPanel } from "@/components/calculator/input-panel";
import { ResultsPanel } from "@/components/calculator/results-panel";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PdfDocumentPanel } from "@/components/documents/pdf-document-panel";

export function WorkspaceView() {
  const {
    raw,
    invalidFields,
    onChange,
    setCorporateOpen,
    outputs,
    inputs,
    showCorporate,
    setRaw,
  } = useDashboard();

  return (
    <TooltipProvider delayDuration={200}>
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-medium text-muted">Workspace</p>
        <p className="mt-1 font-display text-xl font-semibold text-text sm:text-2xl">
          Inputs and live metrics
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Enter numbers from your model or deck. Results update instantly with short
          explanations.
        </p>
      </div>

      <div className="mb-8">
        <PdfDocumentPanel outputs={outputs} raw={raw} onApplyInputs={setRaw} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-2">
          <InputPanel
            raw={raw}
            invalidFields={invalidFields}
            onChange={onChange}
            onCorporateOpen={setCorporateOpen}
          />
        </div>
        <div className="lg:col-span-3">
          <ResultsPanel
            outputs={outputs}
            inputs={inputs}
            showCorporate={showCorporate}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
