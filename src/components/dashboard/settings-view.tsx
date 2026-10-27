"use client";

import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { Button } from "@/components/ui/button";

export function SettingsView() {
  const { reset, loadSample, copySummary, exportSummary } = useDashboard();

  return (
    <div className="max-w-lg space-y-8">
      <div>
        <p className="text-xs font-medium text-muted">Settings</p>
        <p className="mt-1 font-display text-xl font-semibold text-text sm:text-2xl">
          Data & export
        </p>
      </div>

      <section className="rounded-xl border border-border bg-white p-6">
        <h2 className="text-sm font-semibold text-text">Workspace data</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Inputs stay in this browser session. Reset clears fields, or reload the
          sample scenario for a demo walkthrough.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => loadSample()}>
            Load sample data
          </Button>
          <Button type="button" variant="ghost" onClick={() => reset()}>
            Clear all inputs
          </Button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-6">
        <h2 className="text-sm font-semibold text-text">Share results</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Copy a plain-text summary for investor updates, or download a file for
          your data room notes.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => copySummary()}>
            Copy summary
          </Button>
          <Button type="button" onClick={() => exportSummary()}>
            Export .txt
          </Button>
        </div>
      </section>

      <p className="text-xs text-muted">
        For illustration only. Not financial advice. Verify all figures against
        your official model before sharing externally.
      </p>
    </div>
  );
}
