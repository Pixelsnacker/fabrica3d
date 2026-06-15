import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { getDb } from "../db";
import { datasheets } from "../../drizzle/schema";
import { publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { storagePut } from "../storage";

// ── Validierung der Datenblatt-Struktur ──────────────────────────────────────
const langText = z.record(z.string(), z.string());

const featureGroup = z.object({
  id: z.string(),
  title: langText,
  points: z.array(langText),
});

const techRow = z.object({
  id: z.string(),
  type: langText,
  value: langText,
});

const datasheet = z.object({
  id: z.string().min(1).max(32),
  status: z.enum(["entwurf", "pruefung", "freigegeben", "archiviert"]),
  createdAt: z.number(),
  updatedAt: z.number(),
  productGroup: z.string(),
  prospektNr: z.string(),
  datum: z.string(),
  headline: langText,
  subline: langText,
  image: z.string(),
  imageZoom: z.number(),
  imageX: z.number(),
  imageY: z.number(),
  imageDescription: langText,
  features: z.array(featureGroup),
  techData: z.array(techRow),
  note: langText,
});

type Datasheet = z.infer<typeof datasheet>;

function parseRow(row: { data: string }): Datasheet | null {
  try {
    return datasheet.parse(JSON.parse(row.data));
  } catch {
    return null;
  }
}

export const datasheetsRouter = router({
  /** Öffentlich: alle Datenblätter (für die Konfigurator-Übersicht). */
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [] as Datasheet[];
    const rows = await db.select().from(datasheets).orderBy(desc(datasheets.updatedAt));
    return rows.map(parseRow).filter((d): d is Datasheet => d !== null);
  }),

  /** Öffentlich: einzelnes Datenblatt per Permalink-id (für Webseite/ERP). */
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return null;
    const rows = await db.select().from(datasheets).where(eq(datasheets.id, input.id)).limit(1);
    return rows[0] ? parseRow(rows[0]) : null;
  }),

  /** Anlegen/Aktualisieren. Der Permalink (id) bleibt stabil. */
  upsert: publicProcedure.input(datasheet).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB not available" });
    const now = Date.now();
    const value = { ...input, updatedAt: now };
    const dataJson = JSON.stringify(value);
    await db
      .insert(datasheets)
      .values({
        id: value.id,
        status: value.status,
        headlineDe: value.headline.de ?? "",
        productGroup: value.productGroup,
        prospektNr: value.prospektNr,
        datum: value.datum,
        data: dataJson,
      })
      .onDuplicateKeyUpdate({
        set: {
          status: value.status,
          headlineDe: value.headline.de ?? "",
          productGroup: value.productGroup,
          prospektNr: value.prospektNr,
          datum: value.datum,
          data: dataJson,
        },
      });
    return value;
  }),

  /** Status-Wechsel (Workflow). */
  setStatus: publicProcedure
    .input(z.object({ id: z.string(), status: z.enum(["entwurf", "pruefung", "freigegeben", "archiviert"]) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB not available" });
      const rows = await db.select().from(datasheets).where(eq(datasheets.id, input.id)).limit(1);
      const current = rows[0] ? parseRow(rows[0]) : null;
      if (!current) throw new TRPCError({ code: "NOT_FOUND" });
      const value = { ...current, status: input.status, updatedAt: Date.now() };
      await db
        .update(datasheets)
        .set({ status: value.status, data: JSON.stringify(value) })
        .where(eq(datasheets.id, input.id));
      return value;
    }),

  /** Löschen. */
  remove: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB not available" });
    await db.delete(datasheets).where(eq(datasheets.id, input.id));
    return { success: true } as const;
  }),

  /**
   * Produktbild hochladen → S3. Liefert eine stabile CDN-URL zurück, damit das
   * Bild über den Permalink überall (Webseite, ERP) sichtbar bleibt.
   */
  uploadImage: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        filename: z.string().min(1),
        dataBase64: z.string().min(1),
        mimeType: z.string().default("image/jpeg"),
      }),
    )
    .mutation(async ({ input }) => {
      const buffer = Buffer.from(input.dataBase64, "base64");
      const ext = input.mimeType.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
      const suffix = Math.random().toString(36).slice(2, 8);
      const key = `datasheets/${input.id}/${suffix}.${ext}`;
      const { url } = await storagePut(key, buffer, input.mimeType);
      return { url };
    }),
});
