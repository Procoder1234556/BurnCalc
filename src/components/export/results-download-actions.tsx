"use client";

import { useCallback, useState } from "react";
import { Download, FileText } from "lucide-react";
import type { CalculatorOutputs } from "@/lib/metrics/types";
import { buildResultsSummary } from "@/lib/summary";
import { downloadPdfBytes, downloadText } from "@/lib/export/download";
import { buildResultsOnlyPdf } from "@/lib/export/results-pdf";
import { Button } from "@/components/ui/button";

type ResultsDownloadActionsProps = {
  outputs: CalculatorOutputs;
  fileBaseName?: string;
  sourceFileName?: string;
  compact?: boolean;
};

export function ResultsDownloadActions({
  outputs,
  fileBaseName = "burncalc-results",
  sourceFileName,
  compact,
}: ResultsDownloadActionsProps) {
  const [busy, setBusy] = useState<"txt" | "pdf" | null>(null);

  const onTxt = useCallback(() => {
    downloadText(buildResultsSummary(outputs), `${fileBaseName}.txt`);
  }, [outputs, fileBaseName]);

  const onPdf = useCallback(async () => {
    setBusy("pdf");
    try {
      const bytes = await buildResultsOnlyPdf(outputs, {
        sourceFileName,
      });
      downloadPdfBytes(bytes, `${fileBaseName}.pdf`);
    } finally {
      setBusy(null);
    }
  }, [outputs, fileBaseName, sourceFileName]);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        size={compact ? "sm" : "default"}
        onClick={onTxt}
        disabled={busy !== null}
      >
        <FileText className="size-4" aria-hidden />
        {compact ? "TXT" : "Download TXT"}
      </Button>
      <Button
        type="button"
        size={compact ? "sm" : "default"}
        onClick={() => onPdf()}
        disabled={busy !== null}
      >
        <Download className="size-4" aria-hidden />
        {busy === "pdf" ? "Preparing…" : compact ? "PDF" : "Download PDF"}
      </Button>
    </div>
  );
}
