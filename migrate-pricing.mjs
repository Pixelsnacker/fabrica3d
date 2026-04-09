import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const db = await mysql.createConnection(process.env.DATABASE_URL);

// Create table
await db.execute(`
CREATE TABLE IF NOT EXISTS \`pricing_config\` (
  \`id\` int AUTO_INCREMENT NOT NULL,
  \`processKey\` varchar(64) NOT NULL,
  \`labelDe\` varchar(128) NOT NULL,
  \`labelEn\` varchar(128) NOT NULL,
  \`unit\` enum('cm3','hour','object') NOT NULL,
  \`pricePerUnitMin\` decimal(10,4) NOT NULL,
  \`pricePerUnitMax\` decimal(10,4) NOT NULL,
  \`minimumPrice\` decimal(10,2) NOT NULL,
  \`discountFrom10\` decimal(5,4) NOT NULL DEFAULT '0.1500',
  \`discountFrom50\` decimal(5,4) NOT NULL DEFAULT '0.2500',
  \`noteDe\` text,
  \`noteEn\` text,
  \`sortOrder\` int NOT NULL DEFAULT 0,
  \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT \`pricing_config_id\` PRIMARY KEY(\`id\`),
  CONSTRAINT \`pricing_config_processKey_unique\` UNIQUE(\`processKey\`)
);
`);
console.log("✓ Table pricing_config created (or already exists)");

// Seed default prices
const defaultPrices = [
  { processKey: "fdm",          labelDe: "FDM-Druck",              labelEn: "FDM Printing",           unit: "cm3",   min: 0.05, max: 0.30, minPrice: 15.00, sort: 1 },
  { processKey: "fdm_fiber",    labelDe: "Endlosfaser FDM",        labelEn: "Continuous Fiber FDM",   unit: "cm3",   min: 0.20, max: 0.80, minPrice: 40.00, sort: 2 },
  { processKey: "sla",          labelDe: "SLA-Druck",              labelEn: "SLA Printing",           unit: "cm3",   min: 0.15, max: 0.60, minPrice: 20.00, sort: 3 },
  { processKey: "dlp",          labelDe: "DLP-Druck",              labelEn: "DLP Printing",           unit: "cm3",   min: 0.15, max: 0.55, minPrice: 20.00, sort: 4 },
  { processKey: "sls",          labelDe: "SLS-Druck",              labelEn: "SLS Printing",           unit: "cm3",   min: 0.08, max: 0.25, minPrice: 30.00, sort: 5 },
  { processKey: "mjf",          labelDe: "MJF-Druck",              labelEn: "MJF Printing",           unit: "cm3",   min: 0.08, max: 0.22, minPrice: 30.00, sort: 6 },
  { processKey: "polyjet",      labelDe: "Polyjet",                labelEn: "Polyjet",                unit: "cm3",   min: 0.30, max: 1.50, minPrice: 50.00, sort: 7 },
  { processKey: "sanddruck",    labelDe: "Sanddruck",              labelEn: "Sand Printing",          unit: "cm3",   min: 0.10, max: 0.40, minPrice: 80.00, sort: 8 },
  { processKey: "cnc_fraesen",  labelDe: "CNC-Fräsen",             labelEn: "CNC Milling",            unit: "hour",  min: 60,   max: 150,  minPrice: 80.00, sort: 9 },
  { processKey: "cnc_drehen",   labelDe: "CNC-Drehen",             labelEn: "CNC Turning",            unit: "hour",  min: 50,   max: 120,  minPrice: 60.00, sort: 10 },
  { processKey: "wasserstrahl", labelDe: "Wasserstrahlschneiden",  labelEn: "Waterjet Cutting",       unit: "hour",  min: 80,   max: 200,  minPrice: 50.00, sort: 11 },
  { processKey: "laser",        labelDe: "Laserschneiden",         labelEn: "Laser Cutting",          unit: "hour",  min: 60,   max: 150,  minPrice: 40.00, sort: 12 },
  { processKey: "cad",          labelDe: "CAD-Konstruktion",       labelEn: "CAD Engineering",        unit: "hour",  min: 80,   max: 120,  minPrice: 80.00, sort: 13 },
  { processKey: "scan_3d",      labelDe: "3D-Scan",                labelEn: "3D Scanning",            unit: "object",min: 150,  max: 500,  minPrice: 150.00, sort: 14 },
];

for (const p of defaultPrices) {
  await db.execute(
    `INSERT INTO pricing_config (processKey, labelDe, labelEn, unit, pricePerUnitMin, pricePerUnitMax, minimumPrice, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE labelDe=VALUES(labelDe), labelEn=VALUES(labelEn)`,
    [p.processKey, p.labelDe, p.labelEn, p.unit, p.min, p.max, p.minPrice, p.sort]
  );
}
console.log(`✓ Seeded ${defaultPrices.length} pricing entries`);

await db.end();
console.log("✓ Migration complete");
