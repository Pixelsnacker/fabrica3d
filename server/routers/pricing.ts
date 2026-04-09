import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { getDb } from "../db";
import { pricingConfig } from "../../drizzle/schema";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

// Only the owner (admin) can modify pricing
function requireOwner(ctx: { user: { openId: string; role?: string } | null }) {
  if (!ctx.user) throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
  // Primary check: admin role (set in DB)
  if (ctx.user.role === "admin") return;
  // Fallback: OWNER_OPEN_ID env var
  const ownerOpenId = process.env.OWNER_OPEN_ID;
  if (ownerOpenId && ctx.user.openId === ownerOpenId) return;
  throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
}

export const pricingRouter = router({
  /** Public: list all pricing configs for the calculator */
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(pricingConfig)
      .orderBy(asc(pricingConfig.sortOrder));
  }),

  /** Admin: update a single pricing entry */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        pricePerUnitMin: z.number().min(0),
        pricePerUnitMax: z.number().min(0),
        minimumPrice: z.number().min(0),
        discountFrom10: z.number().min(0).max(1),
        discountFrom50: z.number().min(0).max(1),
        noteDe: z.string().max(500).optional().nullable(),
        noteEn: z.string().max(500).optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      requireOwner(ctx);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'DB not available' });
      const { id, ...values } = input;
      await db
        .update(pricingConfig)
        .set({
          pricePerUnitMin: String(values.pricePerUnitMin),
          pricePerUnitMax: String(values.pricePerUnitMax),
          minimumPrice: String(values.minimumPrice),
          discountFrom10: String(values.discountFrom10),
          discountFrom50: String(values.discountFrom50),
          noteDe: values.noteDe ?? null,
          noteEn: values.noteEn ?? null,
        })
        .where(eq(pricingConfig.id, id));
      return { success: true };
    }),
});
