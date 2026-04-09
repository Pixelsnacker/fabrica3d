import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { siteImages } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { storagePut } from "../storage";

// ─── helpers ────────────────────────────────────────────────────────────────

function randomSuffix() {
  return Math.random().toString(36).slice(2, 10);
}

function isOwner(ctx: { user: { openId: string } }) {
  const ownerOpenId = process.env.OWNER_OPEN_ID;
  if (!ownerOpenId) return false;
  return ctx.user.openId === ownerOpenId;
}

// ─── router ─────────────────────────────────────────────────────────────────

export const imagesRouter = router({
  /** Public: get a single image slot by key (for frontend pages) */
  getByKey: publicProcedure
    .input(z.object({ imageKey: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const rows = await db
        .select()
        .from(siteImages)
        .where(eq(siteImages.imageKey, input.imageKey))
        .limit(1);
      return rows[0] ?? null;
    }),

  /** Return all image slots */
  list: protectedProcedure.query(async ({ ctx }) => {
    if (!isOwner(ctx)) throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB not available" });
    return db.select().from(siteImages).orderBy(siteImages.imageKey);
  }),

  /** Upload a new image for a given slot (base64-encoded) */
  upload: protectedProcedure
    .input(
      z.object({
        imageKey: z.string().min(1),
        filename: z.string().min(1),
        /** base64-encoded file content */
        dataBase64: z.string().min(1),
        mimeType: z.string().default("image/jpeg"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isOwner(ctx)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB not available" });

      // Decode base64 → Buffer
      const buffer = Buffer.from(input.dataBase64, "base64");

      // Derive extension from mimeType
      const ext = input.mimeType.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
      const s3Key = `site-images/${input.imageKey}-${randomSuffix()}.${ext}`;

      // Upload to S3
      const { url } = await storagePut(s3Key, buffer, input.mimeType);

      // Upsert in DB
      await db
        .insert(siteImages)
        .values({
          imageKey: input.imageKey,
          labelDe: input.imageKey,
          url,
          filename: input.filename,
        })
        .onDuplicateKeyUpdate({ set: { url, filename: input.filename } });

      return { url };
    }),

  /** Update label only (no image change) */
  updateLabel: protectedProcedure
    .input(z.object({ imageKey: z.string(), labelDe: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!isOwner(ctx)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB not available" });
      await db
        .update(siteImages)
        .set({ labelDe: input.labelDe })
        .where(eq(siteImages.imageKey, input.imageKey));
      return { ok: true };
    }),
});
