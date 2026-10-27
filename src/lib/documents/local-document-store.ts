import type { LocalDocumentRecord } from "@/lib/documents/types";

const DB_NAME = "burncalc-documents";
const DB_VERSION = 1;
const META_STORE = "meta";
const BLOB_STORE = "blobs";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB open failed"));
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(BLOB_STORE)) {
        db.createObjectStore(BLOB_STORE, { keyPath: "id" });
      }
    };
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed"));
    tx.onabort = () => reject(tx.error ?? new Error("IndexedDB transaction aborted"));
  });
}

export async function saveLocalDocument(
  file: File,
): Promise<LocalDocumentRecord> {
  const id = crypto.randomUUID();
  const record: LocalDocumentRecord = {
    id,
    fileName: file.name,
    mimeType: file.type || "application/pdf",
    sizeBytes: file.size,
    createdAt: Date.now(),
    status: "ready",
  };

  const db = await openDb();
  const tx = db.transaction([META_STORE, BLOB_STORE], "readwrite");
  tx.objectStore(META_STORE).put(record);
  tx.objectStore(BLOB_STORE).put({ id, blob: file });
  await txDone(tx);
  db.close();
  return record;
}

export async function listLocalDocuments(): Promise<LocalDocumentRecord[]> {
  const db = await openDb();
  const tx = db.transaction(META_STORE, "readonly");
  const req = tx.objectStore(META_STORE).getAll();
  const rows = await new Promise<LocalDocumentRecord[]>((resolve, reject) => {
    req.onsuccess = () => resolve(req.result as LocalDocumentRecord[]);
    req.onerror = () => reject(req.error);
  });
  await txDone(tx);
  db.close();
  return rows.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getLocalDocumentMeta(
  id: string,
): Promise<LocalDocumentRecord | undefined> {
  const db = await openDb();
  const tx = db.transaction(META_STORE, "readonly");
  const req = tx.objectStore(META_STORE).get(id);
  const row = await new Promise<LocalDocumentRecord | undefined>((resolve, reject) => {
    req.onsuccess = () => resolve(req.result as LocalDocumentRecord | undefined);
    req.onerror = () => reject(req.error);
  });
  await txDone(tx);
  db.close();
  return row;
}

export async function getLocalDocumentBlob(id: string): Promise<Blob | undefined> {
  const db = await openDb();
  const tx = db.transaction(BLOB_STORE, "readonly");
  const req = tx.objectStore(BLOB_STORE).get(id);
  const row = await new Promise<{ id: string; blob: Blob } | undefined>((resolve, reject) => {
    req.onsuccess = () => resolve(req.result as { id: string; blob: Blob } | undefined);
    req.onerror = () => reject(req.error);
  });
  await txDone(tx);
  db.close();
  return row?.blob;
}

export async function updateLocalDocumentMeta(
  record: LocalDocumentRecord,
): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(META_STORE, "readwrite");
  tx.objectStore(META_STORE).put(record);
  await txDone(tx);
  db.close();
}

export async function deleteLocalDocument(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([META_STORE, BLOB_STORE], "readwrite");
  tx.objectStore(META_STORE).delete(id);
  tx.objectStore(BLOB_STORE).delete(id);
  await txDone(tx);
  db.close();
}

export async function clearAllLocalDocuments(): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([META_STORE, BLOB_STORE], "readwrite");
  tx.objectStore(META_STORE).clear();
  tx.objectStore(BLOB_STORE).clear();
  await txDone(tx);
  db.close();
}
