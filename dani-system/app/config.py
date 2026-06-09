"""Zentrale Konfiguration für dani-system.

Alle Zugangsdaten und Einstellungen kommen aus Umgebungsvariablen bzw. der
Datei `.env` (siehe `.env.example`). Es werden bewusst KEINE Geheimnisse fest
im Code gespeichert.
"""

from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

# Projektwurzel = der Ordner "dani-system" (eine Ebene über "app")
BASE_DIR = Path(__file__).resolve().parent.parent

# .env laden (falls vorhanden)
load_dotenv(BASE_DIR / ".env")


def _get(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


# --- Zugangsdaten für die Weboberfläche (Passwortschutz) ---
LOGIN_USER = _get("DANI_USER", "dani")
LOGIN_PASSWORD = _get("DANI_PASSWORD", "")  # MUSS in der .env gesetzt werden

# --- Ablageort der Markdown-Dateien ---
DATA_DIR = Path(_get("DANI_DATA_DIR", str(BASE_DIR / "data")))

# --- Optionale KI-Antworten über die Claude-API ---
# Ohne Schlüssel funktioniert das System trotzdem (reine Stichwortsuche).
ANTHROPIC_API_KEY = _get("ANTHROPIC_API_KEY", "")
# Modell für die KI-Antwort. Günstig: claude-haiku-4-5. Stärker: claude-sonnet-4-6 / claude-opus-4-8.
ANTHROPIC_MODEL = _get("ANTHROPIC_MODEL", "claude-haiku-4-5")

# KI nur nutzen, wenn ein Schlüssel hinterlegt ist
KI_AKTIV = bool(ANTHROPIC_API_KEY)
