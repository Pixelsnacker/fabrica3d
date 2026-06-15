# Online-Vorschau / Deployment – Produktdatenblatt-Konfigurator

Der Konfigurator inkl. **synchronisierendem Permanentlink** (`/datenblatt/p/:id`)
braucht die **volle App** (Express + tRPC + MySQL). Das bestehende Railway-
Deployment ist nur die Kilometerabrechnung-PWA (`Dockerfile` / `pnpm start:pwa`)
und bleibt unverändert.

## Variante A – Neuer Railway-Service für die volle App (empfohlen, nicht-destruktiv)

1. **Railway → New Service → Deploy from Repo** `Pixelsnacker/fabrica3d`,
   Branch `claude/product-datasheet-config-1cm1j7` (oder `main` nach Merge).
2. **Service Settings → Build:** Dockerfile-Pfad auf **`Dockerfile.app`** setzen
   (oder Config-as-Code auf `railway.app.json`).
3. **MySQL-Datenbank** im selben Projekt anlegen (Railway → Add → Database → MySQL).
4. **Variablen** im Service setzen:
   - `DATABASE_URL` → Connection-String der MySQL-DB
   - `JWT_SECRET` → beliebiges Secret
   - optional: `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` (für Bild-Upload nach S3),
     `OAUTH_SERVER_URL`, `OWNER_OPEN_ID`
5. **Deploy.** Beim Start werden die Migrationen automatisch angewendet
   (`scripts/migrate.mjs`), die Tabelle `datasheets` entsteht von selbst.
6. Aufrufen: `https://<service>.up.railway.app/datenblatt`

## Variante B – Bestehendes Railway-Deployment umstellen (ersetzt die PWA dort)

`railway.json` auf `Dockerfile.app` + `pnpm start` umstellen. **Achtung:** Dann
läuft dort die volle App statt der Kilometerabrechnung-PWA.

## Datenbank-Migration manuell (falls nicht automatisch)

```bash
DATABASE_URL=mysql://… node scripts/migrate.mjs
# oder
pnpm db:push
```

## Schnelle reine Optik-Vorschau (ohne Server)

`docs/datenblatt-preview.html` im Browser öffnen → zeigt das fertige A4-PDF-Layout.
