import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import {
  mileageSettings,
  mileageTrips,
  savedAddresses,
} from "../../drizzle/schema";
import { protectedProcedure, router } from "../_core/trpc";
import { makeRequest, type DirectionsResult } from "../_core/map";

/** Helper: get a connected DB or throw a clean tRPC error. */
async function requireDb() {
  const db = await getDb();
  if (!db) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Datenbank ist nicht verfügbar.",
    });
  }
  return db;
}

const DEFAULT_RATE = "0.30";

type AutocompleteResponse = {
  predictions: Array<{ description: string; place_id: string }>;
  status: string;
};

export const mileageRouter = router({
  // ---------------------------------------------------------------------------
  // Google Maps Hilfsfunktionen (Adress-Autocomplete + Distanzberechnung)
  // ---------------------------------------------------------------------------
  maps: router({
    /** Adressvorschläge während der Eingabe (wie bei Google Maps). */
    autocomplete: protectedProcedure
      .input(z.object({ input: z.string().min(2).max(200) }))
      .query(async ({ input }) => {
        const data = await makeRequest<AutocompleteResponse>(
          "/maps/api/place/autocomplete/json",
          {
            input: input.input,
            language: "de",
            components: "country:de",
          }
        );
        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Adresssuche fehlgeschlagen (${data.status}).`,
          });
        }
        return (data.predictions ?? []).map(p => ({
          description: p.description,
          placeId: p.place_id,
        }));
      }),

    /** Berechnet die Fahrstrecke (km) zwischen zwei Adressen über Google Directions. */
    distance: protectedProcedure
      .input(
        z.object({
          origin: z.string().min(3),
          destination: z.string().min(3),
        })
      )
      .query(async ({ input }) => {
        const data = await makeRequest<DirectionsResult>(
          "/maps/api/directions/json",
          {
            origin: input.origin,
            destination: input.destination,
            mode: "driving",
            language: "de",
            region: "de",
          }
        );
        const leg = data.routes?.[0]?.legs?.[0];
        if (data.status !== "OK" || !leg) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Strecke konnte nicht berechnet werden. Bitte Adressen prüfen.",
          });
        }
        return {
          distanceKm: Math.round((leg.distance.value / 1000) * 100) / 100,
          distanceText: leg.distance.text,
          durationText: leg.duration.text,
          startAddress: leg.start_address,
          endAddress: leg.end_address,
        };
      }),
  }),

  // ---------------------------------------------------------------------------
  // Stammdaten / Einstellungen
  // ---------------------------------------------------------------------------
  settings: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const rows = await db
        .select()
        .from(mileageSettings)
        .where(eq(mileageSettings.userId, ctx.user.id))
        .limit(1);
      return rows[0] ?? null;
    }),

    upsert: protectedProcedure
      .input(
        z.object({
          driverName: z.string().max(256).optional().nullable(),
          licensePlate: z.string().max(32).optional().nullable(),
          personnelNumber: z.string().max(64).optional().nullable(),
          defaultStartAddress: z.string().max(1000).optional().nullable(),
          ratePerKm: z.number().min(0).max(10).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const values = {
          driverName: input.driverName ?? null,
          licensePlate: input.licensePlate ?? null,
          personnelNumber: input.personnelNumber ?? null,
          defaultStartAddress: input.defaultStartAddress ?? null,
          ratePerKm:
            input.ratePerKm !== undefined
              ? input.ratePerKm.toFixed(2)
              : DEFAULT_RATE,
        };
        await db
          .insert(mileageSettings)
          .values({ userId: ctx.user.id, ...values })
          .onDuplicateKeyUpdate({ set: values });
        return { success: true };
      }),
  }),

  // ---------------------------------------------------------------------------
  // Gespeicherte (häufig angefahrene) Adressen
  // ---------------------------------------------------------------------------
  addresses: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      return db
        .select()
        .from(savedAddresses)
        .where(eq(savedAddresses.userId, ctx.user.id))
        .orderBy(savedAddresses.label);
    }),

    create: protectedProcedure
      .input(
        z.object({
          label: z.string().min(1).max(128),
          address: z.string().min(3).max(1000),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const [res] = await db.insert(savedAddresses).values({
          userId: ctx.user.id,
          label: input.label,
          address: input.address,
        });
        return { success: true, id: res.insertId };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number().int().positive(),
          label: z.string().min(1).max(128),
          address: z.string().min(3).max(1000),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        await db
          .update(savedAddresses)
          .set({ label: input.label, address: input.address })
          .where(
            and(
              eq(savedAddresses.id, input.id),
              eq(savedAddresses.userId, ctx.user.id)
            )
          );
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        await db
          .delete(savedAddresses)
          .where(
            and(
              eq(savedAddresses.id, input.id),
              eq(savedAddresses.userId, ctx.user.id)
            )
          );
        return { success: true };
      }),
  }),

  // ---------------------------------------------------------------------------
  // Fahrten
  // ---------------------------------------------------------------------------
  trips: router({
    /** Liste der Fahrten, optional gefiltert auf einen Monat (YYYY-MM). */
    list: protectedProcedure
      .input(
        z
          .object({ month: z.string().regex(/^\d{4}-\d{2}$/).optional() })
          .optional()
      )
      .query(async ({ ctx, input }) => {
        const db = await requireDb();
        const rows = await db
          .select()
          .from(mileageTrips)
          .where(eq(mileageTrips.userId, ctx.user.id))
          .orderBy(desc(mileageTrips.tripDate), desc(mileageTrips.id));
        const month = input?.month;
        return month
          ? rows.filter(r => String(r.tripDate).startsWith(month))
          : rows;
      }),

    create: protectedProcedure
      .input(
        z.object({
          tripDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
          purpose: z.string().min(1).max(512),
          startAddress: z.string().min(3).max(1000),
          endAddress: z.string().min(3).max(1000),
          roundTrip: z.boolean().default(false),
          distanceKm: z.number().min(0).max(100000),
          ratePerKm: z.number().min(0).max(10).default(0.3),
          note: z.string().max(1000).optional().nullable(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const [res] = await db.insert(mileageTrips).values({
          userId: ctx.user.id,
          tripDate: input.tripDate,
          purpose: input.purpose,
          startAddress: input.startAddress,
          endAddress: input.endAddress,
          roundTrip: input.roundTrip,
          distanceKm: input.distanceKm.toFixed(2),
          ratePerKm: input.ratePerKm.toFixed(2),
          note: input.note ?? null,
        });
        return { success: true, id: res.insertId };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number().int().positive(),
          tripDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
          purpose: z.string().min(1).max(512),
          startAddress: z.string().min(3).max(1000),
          endAddress: z.string().min(3).max(1000),
          roundTrip: z.boolean(),
          distanceKm: z.number().min(0).max(100000),
          ratePerKm: z.number().min(0).max(10),
          note: z.string().max(1000).optional().nullable(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const { id, ...rest } = input;
        await db
          .update(mileageTrips)
          .set({
            tripDate: rest.tripDate,
            purpose: rest.purpose,
            startAddress: rest.startAddress,
            endAddress: rest.endAddress,
            roundTrip: rest.roundTrip,
            distanceKm: rest.distanceKm.toFixed(2),
            ratePerKm: rest.ratePerKm.toFixed(2),
            note: rest.note ?? null,
          })
          .where(
            and(
              eq(mileageTrips.id, id),
              eq(mileageTrips.userId, ctx.user.id)
            )
          );
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        await db
          .delete(mileageTrips)
          .where(
            and(
              eq(mileageTrips.id, input.id),
              eq(mileageTrips.userId, ctx.user.id)
            )
          );
        return { success: true };
      }),
  }),
});
