import { readFile } from "node:fs/promises";
import path from "node:path";

export const LEGAL_DOCUMENT_SLUGS = ["privacy", "terms", "cookies"] as const;

export type LegalDocumentSlug = (typeof LEGAL_DOCUMENT_SLUGS)[number];

export function isLegalDocumentSlug(value: string): value is LegalDocumentSlug {
  return (LEGAL_DOCUMENT_SLUGS as readonly string[]).includes(value);
}

export async function loadLegalDocument(slug: LegalDocumentSlug): Promise<string> {
  const filePath = path.join(process.cwd(), "legal-templates", "site", `${slug}.md`);
  return readFile(filePath, "utf8");
}
