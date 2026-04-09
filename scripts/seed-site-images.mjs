/**
 * Seed script: insert all site_images rows into the database.
 * Run with: node scripts/seed-site-images.mjs
 */
import { drizzle } from 'drizzle-orm/mysql2';
import { sql } from 'drizzle-orm';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[seed] No DATABASE_URL – skipping seed (will use fallback URLs in frontend)');
  process.exit(0);
}

const db = drizzle(DATABASE_URL);

// Create table if not exists
await db.execute(sql`
  CREATE TABLE IF NOT EXISTS \`site_images\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`imageKey\` varchar(128) NOT NULL,
    \`labelDe\` varchar(256) NOT NULL,
    \`url\` text NOT NULL,
    \`filename\` varchar(256),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`site_images_id\` PRIMARY KEY(\`id\`),
    CONSTRAINT \`site_images_imageKey_unique\` UNIQUE(\`imageKey\`)
  )
`);
console.log('[seed] Table site_images ensured');

const rows = [
  ['home_3ddruck', 'Startseite – 3D-Druck Panel', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sla_druck_c80e68cf.jpg', 'SLA_Druck.jpg'],
  ['home_cad', 'Startseite – CAD-Daten Panel', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cad_panorama-LL85c2KDLjQk6uJYDQhbBK.webp', 'hero_cad_panorama.webp'],
  ['home_scan', 'Startseite – 3D-Scan Panel', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_3dscan_panorama-enR5FWV3DmycJ8anGV2ZYL.webp', 'hero_3dscan_panorama.webp'],
  ['home_cnc', 'Startseite – CNC-Bearbeitung Panel', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cnc_v5_closeup-ZwAmagSVwA4UkN4VoXTksW.png', 'hero_cnc_v5_closeup.png'],
  ['home_museum', 'Startseite – Museumsmodelle Panel', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_museum_panorama-2VZGD7iT3RNDmFFs4auDDZ.webp', 'hero_museum_panorama.webp'],
  ['cnc_fraesen', 'CNC-Fräsen – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/cnc_fraesen_hero_e57ad838.jpg', 'cnc_fraesen_hero.jpg'],
  ['cnc_drehen', 'CNC-Drehen – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/cnc_drehen_hero_88d657f7.jpg', 'cnc_drehen_hero.jpg'],
  ['cnc_wasserschneiden', 'Wasserschneiden – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/cnc_wasserschneiden_hero_58adb5f7.jpg', 'cnc_wasserschneiden_hero.jpg'],
  ['cnc_laserschneiden', 'Laserschneiden – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/cnc_laserschneiden_hero_33866744.jpg', 'cnc_laserschneiden_hero.jpg'],
  ['print_fdm', '3D-Druck FDM – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_fdm_panorama-XjUkNA3AYA9xFmbaiRBi3y.webp', 'hero_fdm_panorama.webp'],
  ['print_sla', '3D-Druck SLA – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sla_panorama-XGVXRKSsM2Tz8j8vCESQwj.webp', 'hero_sla_panorama.webp'],
  ['print_sls', '3D-Druck SLS – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sls_panorama-2LJpJBGnxfFBu7udib4N4b.webp', 'hero_sls_panorama.webp'],
  ['print_mjf', '3D-Druck MJF – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_mjf_panorama-9SsUkwhULkNZXS2AmwkEUJ.webp', 'hero_mjf_panorama.webp'],
  ['print_dlp', '3D-Druck DLP – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_dlp_panorama-GHpNGLESRvqpyCrq2JPZQB.webp', 'hero_dlp_panorama.webp'],
  ['print_polyjet', '3D-Druck Polyjet – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_polyjet_panorama-bJC78HVkCv4DXftzyir9Xi.webp', 'hero_polyjet_panorama.webp'],
  ['print_endlosfaser', '3D-Druck Endlosfaser – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_endlosfaser_panorama-RYDpxAcwVpo3HiGRMocvPJ.webp', 'hero_endlosfaser_panorama.webp'],
  ['print_sanddruck', '3D-Druck Sanddruck – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sanddruck_panorama-mxobzZdxCqzGFANvCCWUrr.webp', 'hero_sanddruck_panorama.webp'],
  ['cad_konstruktion', 'CAD Konstruktion – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cad_panorama-LL85c2KDLjQk6uJYDQhbBK.webp', 'hero_cad_panorama.webp'],
  ['cad_reverse', 'CAD Reverse Engineering – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cad_panorama-LL85c2KDLjQk6uJYDQhbBK.webp', 'hero_cad_panorama.webp'],
  ['scan_gomatos', '3D-Scan GOM ATOS – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_3dscan_panorama-enR5FWV3DmycJ8anGV2ZYL.webp', 'hero_3dscan_panorama.webp'],
  ['scan_anwendungen', '3D-Scan Anwendungen – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_3dscan_panorama-enR5FWV3DmycJ8anGV2ZYL.webp', 'hero_3dscan_panorama.webp'],
  ['museumsmodelle', 'Museumsmodelle – Hero-Bild', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_museum_panorama-2VZGD7iT3RNDmFFs4auDDZ.webp', 'hero_museum_panorama.webp'],
];

let inserted = 0;
let skipped = 0;
for (const [imageKey, labelDe, url, filename] of rows) {
  try {
    await db.execute(sql`
      INSERT IGNORE INTO \`site_images\` (\`imageKey\`, \`labelDe\`, \`url\`, \`filename\`)
      VALUES (${imageKey}, ${labelDe}, ${url}, ${filename})
    `);
    inserted++;
  } catch (err) {
    console.warn('[seed] Skip', imageKey, err.message);
    skipped++;
  }
}

console.log(`[seed] Done: ${inserted} inserted, ${skipped} skipped`);
process.exit(0);
