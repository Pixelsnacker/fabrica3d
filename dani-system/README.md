# dani-system 🧠

Ein persönliches KI-Gedächtnis. Es speichert wichtige Informationen dauerhaft
als **Markdown-Dateien** und kann sie später wieder durchsuchen und
beantworten. Schlank, günstig, unter deiner Kontrolle.

Version: **0.1 (MVP)**

---

## Was kann Version 0.1?

- **Weboberfläche** (deutsch) mit einem Eingabefeld für Notizen, Aufgaben und Fragen.
- **Markdown-Speicher**: jede wichtige Information landet als Datei auf der Festplatte.
- **Aufgabenlogik**:
  - „Beruflich: Frau Gruner wegen Argos-Zeichnung anrufen" → Aufgabe in `data/aufgaben/offen.md`
  - „Frau Gruner erledigt" → verschiebt die Aufgabe nach `data/aufgaben/erledigt.md`
- **Personen & Projekte** bekommen jeweils eine eigene Datei.
- **Suche**: Fragen wie „Was weißt du über Frau Gruner?" durchsuchen alle Notizen.
- **Optionale KI-Antwort**: Liegt ein Claude-API-Schlüssel in der `.env`, formuliert
  das System eine kurze Antwort aus deinen Notizen. **Ohne Schlüssel** funktioniert
  alles trotzdem – dann werden die passenden Notizen direkt angezeigt.
- **Passwortschutz** für die Weboberfläche.

---

## Technik (bewusst einfach gehalten)

| Baustein        | Wahl                                  |
|-----------------|---------------------------------------|
| Sprache         | Python 3                              |
| Web-Framework   | FastAPI + Uvicorn                     |
| Oberfläche      | Eine HTML-Seite (Jinja2), kein Build  |
| Speicher        | Einfache Markdown-Dateien             |
| Login           | HTTP-Basic-Auth (Passwort aus `.env`) |
| KI (optional)   | Claude API (`anthropic`)              |

Kein Docker-Zwang, keine Datenbank, kein Kubernetes.

---

## Ordnerstruktur

```
dani-system/
├── app/                  # der Programmcode
│   ├── main.py           # Web-App + Login + Routen
│   ├── config.py         # Einstellungen aus .env
│   ├── storage.py        # schreibt/liest Markdown-Dateien
│   ├── classify.py       # erkennt Frage / Aufgabe / Erledigung / Notiz
│   ├── search.py         # Suche + optionale KI-Antwort
│   └── templates/
│       └── index.html    # die Weboberfläche
├── data/                 # alle gespeicherten Informationen (Markdown)
│   ├── privat/
│   ├── beruflich/
│   ├── fabrica/
│   ├── projekte/         # eine Datei pro Projekt
│   ├── personen/         # eine Datei pro Person
│   ├── aufgaben/         # offen.md + erledigt.md
│   └── memory/
├── backups/
├── deploy/
│   └── dani-system.service   # Beispiel-Autostart für den VPS
├── requirements.txt
├── run.sh                # lokaler Start
├── .env.example          # Vorlage für Zugangsdaten
└── README.md
```

> **Datenschutz:** Der Ordner `data/` und die `.env` werden **nicht** in Git
> gespeichert (siehe `.gitignore`). Nur Code und die leere Ordnerstruktur landen
> im Repository – deine persönlichen Notizen bleiben privat auf dem Server.

---

## Wie „spricht" man mit dem System?

Einfach in das Eingabefeld schreiben. Das System erkennt automatisch:

| Eingabe (Beispiel)                                       | Was passiert                              |
|----------------------------------------------------------|-------------------------------------------|
| `Beruflich: Frau Gruner wegen Zeichnung anrufen`         | → offene Aufgabe (enthält „anrufen")      |
| `Frau Gruner erledigt`                                   | → Aufgabe wird auf erledigt gesetzt       |
| `Person: Frau Gruner: Kundin bei Argos, Tel 0123`        | → Datei `personen/frau-gruner.md`         |
| `Projekt: Argos: Zeichnung bis Ende Juni fertig`         | → Datei `projekte/argos.md`               |
| `Fabrica: Neuer Filament-Lieferant, 10% günstiger`       | → `fabrica/notizen.md`                     |
| `Privat: Zahnarzttermin am 15. Juli`                     | → offene Aufgabe (enthält „Termin")       |
| `Was weißt du über Frau Gruner?`                         | → Suche / Antwort                          |

**Bereichs-Präfixe** (optional am Anfang): `Privat:`, `Beruflich:`, `Fabrica:`,
`Projekt:`, `Person:`, `Aufgabe:`, `Memory:`.

Eine Eingabe gilt als **Frage**, wenn sie mit `?` endet oder mit einem Fragewort
beginnt (Was, Wer, Wie, Welche, Wann, …). Eine Eingabe gilt als **Erledigung**,
wenn sie auf „erledigt", „fertig", „gemacht" oder „abgeschlossen" endet.

---

## Lokal starten (zum Ausprobieren)

```bash
cd dani-system
cp .env.example .env          # dann .env öffnen und ein Passwort eintragen
./run.sh                      # legt beim 1. Mal automatisch alles an
```

Danach im Browser öffnen: **http://127.0.0.1:8000**
(Benutzer/Passwort = das, was du in der `.env` eingetragen hast.)

---

## Auf dem Hostinger-VPS installieren

> Vorab eine **Bestandsaufnahme** des Servers machen (siehe unten). Dann:

**1. Dateien auf den Server bringen** (z.B. per Git oder Hochladen) und hineinwechseln:
```bash
cd ~/dani-system
```

**2. `.env` anlegen** und ein sicheres Passwort setzen:
```bash
cp .env.example .env
nano .env        # DANI_PASSWORD setzen; optional ANTHROPIC_API_KEY
```

**3. Starten (Test):**
```bash
./run.sh
```
Läuft dann lokal auf dem Server (Port 8000), aber **noch nicht** aus dem Internet
erreichbar – das ist Absicht.

**4. Dauerhaft laufen lassen (Autostart):**
Datei `deploy/dani-system.service` anpassen (Benutzer/Pfade), dann:
```bash
sudo cp deploy/dani-system.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now dani-system
```

**5. Sicher aus dem Internet erreichbar machen (empfohlen):**
Über einen Reverse-Proxy (nginx) mit HTTPS-Zertifikat (Let's Encrypt), z.B. auf
einer Subdomain wie `gedaechtnis.deine-domain.de`. Den genauen nginx-Block
richten wir im nächsten Schritt gemeinsam ein.

---

## Sicherheit

- 🔑 Zugangsdaten und API-Schlüssel stehen **nur** in der `.env` (nie im Code).
- 🙈 `data/` und `.env` sind in `.gitignore` – persönliche Daten bleiben privat.
- 🔒 Die App lauscht standardmäßig nur auf `127.0.0.1` (nicht offen im Netz).
  Der Internet-Zugriff läuft kontrolliert über nginx + HTTPS.
- 🛡️ Weboberfläche ist passwortgeschützt (HTTP Basic Auth).

---

## Bestandsaufnahme des VPS (vor der Installation auszuführen)

Diesen Befehl auf dem VPS ausführen und das Ergebnis prüfen (verändert nichts):

```bash
echo "=== System ===" && cat /etc/os-release | head -3
echo "=== Docker ===" && (docker --version || echo "nicht installiert")
echo "=== Git ===" && (git --version || echo "nicht installiert")
echo "=== Python ===" && (python3 --version || echo "nicht installiert")
echo "=== Node ===" && (node --version || echo "nicht installiert")
echo "=== Offene Ports ===" && (sudo ss -tlnp || ss -tlnp)
```

Benötigt wird im Wesentlichen nur **Python 3** (meist schon vorhanden).

---

## Ausgeführte Schritte (Entwicklungs-Log)

Diese Version 0.1 wurde in einer Cloud-Entwicklungsumgebung (Ubuntu 24.04)
gebaut und getestet – **nicht** direkt auf dem VPS, damit dort nichts kaputtgeht.

1. Ordnerstruktur `dani-system/` mit `data/`, `app/`, `backups/`, `deploy/` angelegt.
2. Startdateien `data/aufgaben/offen.md` und `erledigt.md` erstellt.
3. Python-App gebaut: Konfiguration, Markdown-Speicher, Regel-Erkennung,
   Suche (+ optionale KI-Antwort) und FastAPI-Weboberfläche mit Passwortschutz.
4. `.env.example`, `requirements.txt`, `run.sh` und ein systemd-Service erstellt.
5. `.gitignore` so eingerichtet, dass `.env` und persönliche Daten nicht ins
   Repository gelangen.
6. Lokal getestet:
   - Passwortschutz: ohne Login `401`, mit Login `200` ✅
   - Aufgabe anlegen / als erledigt verschieben ✅
   - Personen-, Projekt-, Bereichs-Notizen gespeichert ✅
   - Suche liefert passende Notizen ✅
   - Fehler behoben: „…fertig sein" wurde fälschlich als Erledigung erkannt –
     Erledigung erfordert jetzt das Auslösewort am Satzende.

---

## Nächste sinnvolle Schritte (Vorschläge für v0.2)

- Reverse-Proxy (nginx) + HTTPS auf einer Subdomain einrichten.
- Automatisches tägliches Backup von `data/` (z.B. nach Google Drive).
- Bessere Suche für Aufgaben-Übersichten („alle offenen beruflichen Aufgaben").
- Optionale Bestätigung vor dem Speichern, um Smalltalk auszufiltern.
