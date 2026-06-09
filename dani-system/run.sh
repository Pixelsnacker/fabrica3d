#!/usr/bin/env bash
# Startet dani-system lokal. Erwartet eine eingerichtete .env im selben Ordner.
set -e
cd "$(dirname "$0")"

# Virtuelle Umgebung anlegen (einmalig) und Pakete installieren
if [ ! -d ".venv" ]; then
  echo "Erstelle virtuelle Python-Umgebung…"
  python3 -m venv .venv
  ./.venv/bin/pip install --upgrade pip
  ./.venv/bin/pip install -r requirements.txt
fi

# Server starten (erreichbar nur lokal auf Port 8000)
exec ./.venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000
