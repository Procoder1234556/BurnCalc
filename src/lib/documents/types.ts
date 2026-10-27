export type LocalDocumentStatus = "ready" | "processing" | "processed" | "error";

export type LocalDocumentRecord = {
  id: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: number;
  status: LocalDocumentStatus;
  errorMessage?: string;
  extractedFieldCount?: number;
  lastProcessedAt?: number;
};
