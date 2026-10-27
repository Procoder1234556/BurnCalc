import { PDFDocument, StandardFonts, rgb, type PDFPage } from "pdf-lib";
import type { CalculatorOutputs } from "@/lib/metrics/types";
import { buildResultsSummary } from "@/lib/summary";

const MARGIN = 50;
const LINE_HEIGHT = 14;

function drawWrappedLines(
  pdf: PDFDocument,
  startPage: PDFPage,
  lines: string[],
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
) {
  let page = startPage;
  let y = page.getSize().height - MARGIN;

  for (const line of lines) {
    if (y < MARGIN) {
      page = pdf.addPage();
      y = page.getSize().height - MARGIN;
    }
    page.drawText(line.slice(0, 100), {
      x: MARGIN,
      y,
      size: 11,
      font,
      color: rgb(0.15, 0.15, 0.15),
    });
    y -= LINE_HEIGHT;
  }
}

export async function buildResultsOnlyPdf(
  outputs: CalculatorOutputs,
  options?: { title?: string; sourceFileName?: string },
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const { height } = page.getSize();
  let y = height - MARGIN;

  const title = options?.title ?? "BurnCalc metrics report";
  page.drawText(title, { x: MARGIN, y, size: 16, font: bold, color: rgb(0.1, 0.1, 0.1) });
  y -= 22;

  if (options?.sourceFileName) {
    page.drawText(`Source: ${options.sourceFileName}`, {
      x: MARGIN,
      y,
      size: 10,
      font,
      color: rgb(0.35, 0.35, 0.35),
    });
    y -= 16;
  }

  page.drawText(`Generated: ${new Date().toLocaleString()}`, {
    x: MARGIN,
    y,
    size: 9,
    font,
    color: rgb(0.45, 0.45, 0.45),
  });
  y -= 24;

  const bodyLines = buildResultsSummary(outputs).split("\n");
  drawWrappedLines(pdf, page, bodyLines, font);

  return pdf.save();
}

export async function appendResultsToPdf(
  originalPdfBytes: ArrayBuffer,
  outputs: CalculatorOutputs,
  sourceFileName: string,
): Promise<Uint8Array> {
  const source = await PDFDocument.load(originalPdfBytes);
  const reportBytes = await buildResultsOnlyPdf(outputs, {
    title: "BurnCalc — appended metrics",
    sourceFileName,
  });
  const report = await PDFDocument.load(reportBytes);
  const pages = await source.copyPages(report, report.getPageIndices());
  for (const p of pages) {
    source.addPage(p);
  }
  return source.save();
}
