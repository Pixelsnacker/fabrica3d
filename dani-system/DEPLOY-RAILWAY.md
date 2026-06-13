# dani-system auf Railway veröffentlichen (Schritt für Schritt)

Diese Anleitung bringt dein dani-system live ins Internet – mit HTTPS, ohne
Server-Verwaltung, ohne Terminal. Du brauchst nur einen Browser.

Ungefähre Dauer: 15 Minuten.

---

## Voraussetzung: dein Code ist auf GitHub

Das ist schon erledigt ✅ – der Code liegt im Repo `fabrica3d` im Branch
`claude/dani-system-setup-in7d96`.

---

## Schritt 1 — Bei Railway anmelden

1. Gehe auf **https://railway.app**
2. Klicke **„Login"** und wähle **„Login with GitHub"**
3. GitHub fragt, ob Railway auf deine Repos zugreifen darf → **erlauben**

> So muss Railway nie ein Passwort kennen, und Updates kommen automatisch von GitHub.

---

## Schritt 2 — Projekt aus GitHub erstellen

1. Klicke **„New Project"**
2. Wähle **„Deploy from GitHub repo"**
3. Wähle das Repo **`fabrica3d`** aus

Railway fängt an zu bauen – das schlägt zunächst fehl oder baut das falsche
Projekt. Das ist normal, weil unser dani-system in einem **Unterordner** liegt.
Das stellen wir im nächsten Schritt richtig.

---

## Schritt 3 — Den richtigen Ordner und Branch einstellen

Öffne den erstellten Service → Reiter **„Settings"**:

1. **Root Directory** auf `dani-system` setzen
   *(damit Railway weiß: die App liegt im Unterordner, nicht im Hauptordner)*
2. **Branch** auf `claude/dani-system-setup-in7d96` setzen
   *(später, wenn alles in `main` liegt, kannst du `main` nehmen)*

Railway erkennt jetzt automatisch Python und unseren Startbefehl (aus der
Datei `Procfile`).

---

## Schritt 4 — Zugangsdaten als Variablen eintragen

Reiter **„Variables"** → für jede Zeile **„New Variable"**:

| Name              | Wert                                   |
|-------------------|----------------------------------------|
| `DANI_USER`       | z.B. `dani`                            |
| `DANI_PASSWORD`   | ein **sicheres** Passwort              |
| `DANI_DATA_DIR`   | `/data`                                |

Optional (nur wenn du KI-Antworten willst):

| Name                | Wert                          |
|---------------------|-------------------------------|
| `ANTHROPIC_API_KEY` | dein Schlüssel `sk-ant-...`   |
| `ANTHROPIC_MODEL`   | `claude-haiku-4-5`            |

> ⚠️ Wichtig: `DANI_PASSWORD` nie leer lassen – sonst ist die Seite ungeschützt.

---

## Schritt 5 — Dauerhaften Speicher (Volume) anlegen

Damit deine Notizen **nicht** bei jedem Update verschwinden, braucht die App
eine dauerhafte Festplatte:

1. Im Service auf **„+ "** / **„Add Volume"** (oder Settings → Volumes)
2. **Mount Path** auf `/data` setzen *(genau wie `DANI_DATA_DIR` oben)*
3. Speichern

> Jetzt liegen alle Markdown-Dateien dauerhaft auf diesem Volume.

---

## Schritt 6 — Internet-Adresse erzeugen (mit HTTPS)

1. Reiter **„Settings"** → Abschnitt **„Networking"**
2. **„Generate Domain"** klicken
3. Du bekommst eine Adresse wie `dani-system-production.up.railway.app`

Diese Adresse hat automatisch **HTTPS** (das Schloss-Symbol im Browser).

---

## Schritt 7 — Öffnen und einloggen

1. Auf die erzeugte Adresse klicken
2. Browser fragt nach Benutzer/Passwort → die Werte aus Schritt 4 eingeben
3. Fertig – dein dani-system läuft live! 🎉

Test: Tippe „Test: Erste Notiz" ein, dann frage „Was weißt du über Test?".

---

## Wie geht es bei Änderungen weiter?

Immer wenn wir den Code verbessern und auf GitHub pushen, **baut und
veröffentlicht Railway automatisch** die neue Version. Du musst nichts tun.

## Kosten

Railway hat eine kleine kostenlose Stufe zum Ausprobieren. Für dauerhaften
Betrieb fällt ein geringer monatlicher Betrag an (oft ~5 $). Du siehst den
Verbrauch jederzeit im Railway-Dashboard.
