let workerConfigured = false;

async function getPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  if (!workerConfigured && typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    workerConfigured = true;
  }
  return pdfjs;
}

export async function extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string> {
  const pdfjs = await getPdfJs();
  const doc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  const parts: string[] = [];
  for (let page = 1; page <= doc.numPages; page += 1) {
    const pageObj = await doc.getPage(page);
    const content = await pageObj.getTextContent();
    const line = content.items
      .map((item) => {
        if (item && typeof item === "object" && "str" in item) {
          return String((item as { str: string }).str);
        }
        return "";
      })
      .join(" ");
    parts.push(line);
  }
  return parts.join("\n");
}
