export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadText(text: string, fileName: string) {
  downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), fileName);
}

export function downloadPdfBytes(bytes: Uint8Array, fileName: string) {
  const copy = new Uint8Array(bytes);
  downloadBlob(new Blob([copy], { type: "application/pdf" }), fileName);
}
