import { boolean, date, decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here

/**
 * Pricing configuration for the F3 calculator.
 * Each row represents one manufacturing process with its price range and rules.
 * Admins can update these values via the /admin/preise panel.
 */
export const pricingConfig = mysqlTable("pricing_config", {
  id: int("id").autoincrement().primaryKey(),
  /** Internal key, e.g. "fdm", "sla", "cnc_fraesen" */
  processKey: varchar("processKey", { length: 64 }).notNull().unique(),
  /** Display name in German */
  labelDe: varchar("labelDe", { length: 128 }).notNull(),
  /** Display name in English */
  labelEn: varchar("labelEn", { length: 128 }).notNull(),
  /** Billing unit: 'cm3' = per cm³, 'hour' = per hour, 'object' = per object */
  unit: mysqlEnum("unit", ["cm3", "hour", "object"]).notNull(),
  /** Minimum price per unit (€, net) */
  pricePerUnitMin: decimal("pricePerUnitMin", { precision: 10, scale: 4 }).notNull(),
  /** Maximum price per unit (€, net) */
  pricePerUnitMax: decimal("pricePerUnitMax", { precision: 10, scale: 4 }).notNull(),
  /** Minimum order value per part (€, net) */
  minimumPrice: decimal("minimumPrice", { precision: 10, scale: 2 }).notNull(),
  /** Discount from 10 pcs (0–1, e.g. 0.15 = 15%) */
  discountFrom10: decimal("discountFrom10", { precision: 5, scale: 4 }).default("0.1500").notNull(),
  /** Discount from 50 pcs (0–1) */
  discountFrom50: decimal("discountFrom50", { precision: 5, scale: 4 }).default("0.2500").notNull(),
  /** Optional note shown in the calculator result */
  noteDe: text("noteDe"),
  noteEn: text("noteEn"),
  /** Sort order in the admin panel */
  sortOrder: int("sortOrder").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PricingConfig = typeof pricingConfig.$inferSelect;
export type InsertPricingConfig = typeof pricingConfig.$inferInsert;

/**
 * Site image registry – one row per image slot.
 * Admins can upload a new image via the /admin/bilder panel to replace any slot.
 */
export const siteImages = mysqlTable("site_images", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique key identifying the image slot, e.g. "home_3ddruck", "cnc_fraesen" */
  imageKey: varchar("imageKey", { length: 128 }).notNull().unique(),
  /** Human-readable label shown in the admin panel */
  labelDe: varchar("labelDe", { length: 256 }).notNull(),
  /** Current CDN URL of the image */
  url: text("url").notNull(),
  /** Original filename for reference */
  filename: varchar("filename", { length: 256 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type SiteImage = typeof siteImages.$inferSelect;
export type InsertSiteImage = typeof siteImages.$inferInsert;

/**
 * Kilometerabrechnung – persönliche Einstellungen pro Benutzer.
 * Speichert Stammdaten für die monatliche Fahrtkostenabrechnung an die Fabrica GmbH.
 */
export const mileageSettings = mysqlTable("mileage_settings", {
  id: int("id").autoincrement().primaryKey(),
  /** Verweis auf users.id – ein Datensatz pro Benutzer */
  userId: int("userId").notNull().unique(),
  /** Name des Fahrers/Mitarbeiters (erscheint auf der Abrechnung) */
  driverName: varchar("driverName", { length: 256 }),
  /** Kfz-Kennzeichen des genutzten Fahrzeugs */
  licensePlate: varchar("licensePlate", { length: 32 }),
  /** Personalnummer o. Ä. (optional) */
  personnelNumber: varchar("personnelNumber", { length: 64 }),
  /** Standard-Startadresse (z. B. Wohnort), wird für neue Fahrten vorbelegt */
  defaultStartAddress: text("defaultStartAddress"),
  /** Erstattungssatz in € pro km (Standard 0,30 €) */
  ratePerKm: decimal("ratePerKm", { precision: 6, scale: 2 }).default("0.30").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type MileageSettings = typeof mileageSettings.$inferSelect;
export type InsertMileageSettings = typeof mileageSettings.$inferInsert;

/**
 * Häufig angefahrene Adressen, die ein Benutzer speichert,
 * um sie beim Erfassen einer Fahrt schnell auswählen zu können.
 */
export const savedAddresses = mysqlTable("saved_addresses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  /** Kurzbezeichnung, z. B. "Büro", "Kunde Müller GmbH" */
  label: varchar("label", { length: 128 }).notNull(),
  /** Vollständige, von Google Maps formatierte Adresse */
  address: text("address").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type SavedAddress = typeof savedAddresses.$inferSelect;
export type InsertSavedAddress = typeof savedAddresses.$inferInsert;

/**
 * Einzelne dienstliche Fahrt für die monatliche Kilometerabrechnung.
 * Der erstattete Betrag wird aus distanceKm × ratePerKm berechnet
 * (× 2 bei Hin- und Rückfahrt).
 */
export const mileageTrips = mysqlTable("mileage_trips", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  /** Datum der Fahrt (ISO-String YYYY-MM-DD) */
  tripDate: date("tripDate", { mode: "string" }).notNull(),
  /** Grund/Zweck der Dienstfahrt */
  purpose: varchar("purpose", { length: 512 }).notNull(),
  /** Startadresse */
  startAddress: text("startAddress").notNull(),
  /** Zieladresse */
  endAddress: text("endAddress").notNull(),
  /** true = Hin- und Rückfahrt (Distanz zählt doppelt) */
  roundTrip: boolean("roundTrip").default(false).notNull(),
  /** Einfache Strecke in km (eine Richtung) */
  distanceKm: decimal("distanceKm", { precision: 8, scale: 2 }).notNull(),
  /** Erstattungssatz €/km zum Zeitpunkt der Erfassung */
  ratePerKm: decimal("ratePerKm", { precision: 6, scale: 2 }).default("0.30").notNull(),
  /** Optionale Notiz */
  note: text("note"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type MileageTrip = typeof mileageTrips.$inferSelect;
export type InsertMileageTrip = typeof mileageTrips.$inferInsert;