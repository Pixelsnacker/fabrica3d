// Wendet ausstehende Drizzle-Migrationen an (idempotent, via _journal).
// Wird beim Start des Full-App-Deployments ausgeführt, damit z. B. die
// `datasheets`-Tabelle automatisch entsteht. Ohne DATABASE_URL: übersprungen.
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("[migrate] DATABASE_URL nicht gesetzt – Migrationen übersprungen.");
  process.exit(0);
}

try {
  const connection = await mysql.createConnection({ uri: url, multipleStatements: true });
  const db = drizzle(connection);
  await migrate(db, { migrationsFolder: "./drizzle" });
  await connection.end();
  console.log("[migrate] Migrationen erfolgreich angewendet.");
  process.exit(0);
} catch (err) {
  console.error("[migrate] Fehler beim Anwenden der Migrationen:", err);
  // Start nicht hart blockieren – Server läuft auch, falls Tabelle bereits existiert.
  process.exit(0);
}
