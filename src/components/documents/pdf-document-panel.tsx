"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileUp, Loader2, Trash2, Wand2, Download, Shield } from "lucide-react";
import type { CalculatorOutputs } from "@/lib/metrics/types";
import type { RawInputs } from "@/lib/metrics/parse";
import type { LocalDocumentRecord } from "@/lib/documents/types";
import {
  deleteLocalDocument,
  getLocalDocumentBlob,
  listLocalDocuments,
  saveLocalDocument,
  updateLocalDocumentMeta,
} from "@/lib/documents/local-document-store";
import { extractTextFromPdf } from "@/lib/documents/pdf-extract";
import { mergeRawInputs, parseFinancialText } from "@/lib/documents/parse-financial-text";
import { downloadPdfBytes } from "@/lib/export/download";
import { appendResultsToPdf, buildResultsOnlyPdf } from "@/lib/export/results-pdf";
import { Button } from "@/components/ui/button";

type PdfDocumentPanelProps = {
  outputs: CalculatorOutputs;
  raw: RawInputs;
  onApplyInputs: (next: RawInputs) => void;
};

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function PdfDocumentPanel({ outputs, raw, onApplyInputs }: PdfDocumentPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [docs, setDocs] = useState<LocalDocumentRecord[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const rows = await listLocalDocuments();
    setDocs(rows);
    if (activeId && !rows.some((d) => d.id === activeId)) {
      setActiveId(null);
    }
  }, [activeId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onPickFile = useCallback(async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setMessage("Only PDF files are supported.");
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const record = await saveLocalDocument(file);
      setActiveId(record.id);
      await refresh();
      setMessage(`Stored locally: ${file.name}. Nothing was uploaded to a server.`);
    } catch {
      setMessage("Could not store this file in your browser.");
    } finally {
      setBusy(false);
    }
  }, [refresh]);

  const onProcess = useCallback(async (id: string) => {
    setBusy(true);
    setMessage(null);
    const meta = docs.find((d) => d.id === id);
    if (!meta) {
      setBusy(false);
      return;
    }
    try {
      await updateLocalDocumentMeta({ ...meta, status: "processing" });
      await refresh();
      const blob = await getLocalDocumentBlob(id);
      if (!blob) throw new Error("missing blob");
      const buffer = await blob.arrayBuffer();
      const text = await extractTextFromPdf(buffer);
      const { fields, matches } = parseFinancialText(text);
      const next = mergeRawInputs(raw, fields, true);
      onApplyInputs(next);
      await updateLocalDocumentMeta({
        ...meta,
        status: "processed",
        extractedFieldCount: matches.length,
        lastProcessedAt: Date.now(),
      });
      setActiveId(id);
      setMessage(
        matches.length > 0
          ? `Filled ${matches.length} field(s) from your PDF. Review inputs, then download results.`
          : "No labeled metrics found in this PDF. Try a deck with lines like “Monthly revenue: $185k”.",
      );
    } catch {
      await updateLocalDocumentMeta({
        ...meta,
        status: "error",
        errorMessage: "Could not read this PDF in the browser.",
      });
      setMessage("Processing failed. The PDF may be scanned or password-protected.");
    } finally {
      await refresh();
      setBusy(false);
    }
  }, [docs, onApplyInputs, raw, refresh]);

  const onDelete = useCallback(
    async (id: string) => {
      await deleteLocalDocument(id);
      if (activeId === id) setActiveId(null);
      await refresh();
      setMessage("File removed from this browser only.");
    },
    [activeId, refresh],
  );

  const onDownloadMerged = useCallback(
    async (id: string) => {
      const meta = docs.find((d) => d.id === id);
      const blob = await getLocalDocumentBlob(id);
      if (!meta || !blob) return;
      setBusy(true);
      try {
        const original = await blob.arrayBuffer();
        const bytes = await appendResultsToPdf(original, outputs, meta.fileName);
        const outName = meta.fileName.replace(/\.pdf$/i, "") + "-burncalc.pdf";
        downloadPdfBytes(bytes, outName);
      } finally {
        setBusy(false);
      }
    },
    [docs, outputs],
  );

  const onDownloadReportOnly = useCallback(async () => {
    const meta = activeId ? docs.find((d) => d.id === activeId) : undefined;
    setBusy(true);
    try {
      const bytes = await buildResultsOnlyPdf(outputs, {
        sourceFileName: meta?.fileName,
      });
      downloadPdfBytes(
        bytes,
        `${meta?.fileName?.replace(/\.pdf$/i, "") ?? "burncalc"}-metrics.pdf`,
      );
    } finally {
      setBusy(false);
    }
  }, [activeId, docs, outputs]);

  return (
    <section
      className="rounded-xl border border-border bg-white p-5 sm:p-6"
      aria-labelledby="pdf-panel-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="pdf-panel-title" className="text-sm font-semibold text-text">
            PDF workspace (local only)
          </h2>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted">
            Upload a pitch deck or financial PDF. Files stay in your browser (IndexedDB) — like
            iLovePDF — until you delete them. We extract text to fill calculator fields, then you
            download results.
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted">
          <Shield className="size-3.5" aria-hidden />
          Not sent to BurnCalc servers
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void onPickFile(file);
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          <FileUp className="size-4" aria-hidden />
          Upload PDF
        </Button>
        <Button type="button" size="sm" disabled={busy} onClick={() => onDownloadReportOnly()}>
          <Download className="size-4" aria-hidden />
          Download results PDF
        </Button>
      </div>

      {message ? (
        <p className="mt-3 text-xs text-muted" role="status">{message}</p>
      ) : null}

      {docs.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm ${
                activeId === doc.id ? "border-primary/40 bg-primary/5" : "border-border"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-text">{doc.fileName}</p>
                <p className="text-xs text-muted">
                  {formatBytes(doc.sizeBytes)} · {doc.status}
                  {doc.extractedFieldCount != null
                    ? ` · ${doc.extractedFieldCount} fields`
                    : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={busy}
                  onClick={() => onProcess(doc.id)}
                >
                  {busy ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <Wand2 className="size-4" aria-hidden />
                  )}
                  Process
                </Button>
                {doc.status === "processed" ? (
                  <Button
                    type="button"
                    size="sm"
                    disabled={busy}
                    onClick={() => onDownloadMerged(doc.id)}
                  >
                    <Download className="size-4" aria-hidden />
                    PDF + results
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={busy}
                  onClick={() => onDelete(doc.id)}
                  aria-label={`Delete ${doc.fileName}`}
                >
                  <Trash2 className="size-4" aria-hidden />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-xs text-muted">No PDFs in this browser yet.</p>
      )}
    </section>
  );
}
