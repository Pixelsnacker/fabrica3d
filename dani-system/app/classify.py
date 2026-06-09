"""Erkennt, was mit einer Eingabe passieren soll.

Regelbasiert (ohne KI), damit alles nachvollziehbar und kostenlos bleibt:
- Frage        -> durchsuchen und antworten
- Erledigung   -> Aufgabe von offen.md nach erledigt.md verschieben
- Aufgabe      -> in offen.md eintragen
- Notiz        -> im passenden Bereich ablegen (Person/Projekt = eigene Datei)
"""

from __future__ import annotations

import re

# Bereichs-Präfixe, die man am Anfang schreiben kann ("Beruflich: ...")
PRAEFIXE = {
    "privat": "privat",
    "beruflich": "beruflich",
    "fabrica": "fabrica",
    "projekt": "projekte",
    "projekte": "projekte",
    "person": "personen",
    "personen": "personen",
    "aufgabe": "aufgaben",
    "aufgaben": "aufgaben",
    "memory": "memory",
    "notiz": "memory",
}

# Fragewörter am Satzanfang
FRAGEWOERTER = (
    "was", "wer", "wie", "welche", "welcher", "welches", "wann", "wo",
    "warum", "wieso", "weshalb", "zeig", "zeige", "liste", "gibt es",
    "habe ich", "hast du", "weißt du", "weisst du",
)

# Wörter, die auf eine Aufgabe hindeuten
AUFGABEN_VERBEN = (
    "anrufen", "zurückrufen", "zurueckrufen", "mailen", "schreiben", "senden",
    "schicken", "kaufen", "bestellen", "prüfen", "pruefen", "klären", "klaeren",
    "vorbereiten", "erstellen", "fertigstellen", "abgeben", "termin", "treffen",
    "einladen", "nachfragen", "kontaktieren", "organisieren", "planen", "buchen",
    "zahlen", "bezahlen", "überweisen", "ueberweisen", "melden", "erinnern",
    "abholen", "liefern", "angebot", "rechnung",
)

# Auslöser für "Aufgabe erledigt" — das Auslösewort muss am ENDE stehen,
# damit "...fertig sein" mitten im Satz nicht fälschlich als Erledigung gilt.
ERLEDIGT_MUSTER = re.compile(
    r"^(?P<stichwort>.+?)\s+(ist\s+)?(erledigt|fertig|gemacht|abgeschlossen)\s*$",
    re.IGNORECASE,
)

# Stoppwörter, die bei der Suche ignoriert werden
STOPPWOERTER = set(FRAGEWOERTER) | {
    "ist", "sind", "der", "die", "das", "den", "dem", "ein", "eine", "einen",
    "und", "oder", "zu", "zum", "zur", "über", "ueber", "von", "vom", "bei",
    "im", "in", "an", "am", "mit", "noch", "offen", "anstehen", "ansteht",
    "steht", "weißt", "weisst", "du", "ich", "es", "ein", "für", "fuer",
}


def _bereich_aus_praefix(text: str) -> tuple[str | None, str]:
    """Trennt ein optionales 'Bereich:'-Präfix ab.

    Gibt (bereich oder None, restlicher_text) zurück.
    """
    if ":" in text:
        kopf, rest = text.split(":", 1)
        bereich = PRAEFIXE.get(kopf.strip().lower())
        if bereich:
            return bereich, rest.strip()
    return None, text.strip()


def _ist_frage(text: str) -> bool:
    t = text.strip().lower()
    if t.endswith("?"):
        return True
    return any(t.startswith(w) for w in FRAGEWOERTER)


def _ist_aufgabe(text: str) -> bool:
    t = text.lower()
    return any(v in t for v in AUFGABEN_VERBEN)


def suchbegriffe(text: str) -> list[str]:
    """Zerlegt eine Frage in sinnvolle Suchbegriffe."""
    text = text.rstrip("?").lower()
    roh = re.findall(r"[\wäöüß-]+", text, flags=re.UNICODE)
    return [w for w in roh if w not in STOPPWOERTER and len(w) > 2]


def analysiere(text: str) -> dict:
    """Hauptfunktion: entscheidet die Aktion für eine Eingabe.

    Rückgabe-Beispiele:
      {"aktion": "frage", "begriffe": [...]}
      {"aktion": "erledigt", "stichwort": "Frau Gruner"}
      {"aktion": "aufgabe", "bereich": "beruflich", "text": "..."}
      {"aktion": "notiz", "bereich": "personen", "name": "Frau Gruner", "text": "..."}
    """
    text = text.strip()

    # 1) Erledigung? (aber keine Frage)
    if not text.endswith("?"):
        m = ERLEDIGT_MUSTER.match(text)
        if m:
            return {"aktion": "erledigt", "stichwort": m.group("stichwort").strip()}

    # 2) Frage?
    if _ist_frage(text):
        return {"aktion": "frage", "begriffe": suchbegriffe(text)}

    # 3) Notiz / Aufgabe — optionales Bereichs-Präfix abtrennen
    bereich, rest = _bereich_aus_praefix(text)

    # Person bzw. Projekt -> eigene Datei
    if bereich in ("personen", "projekte"):
        name, _, beschreibung = rest.partition(":")
        if beschreibung.strip():
            name = name.strip()
            inhalt = beschreibung.strip()
        else:
            # Kein zweiter Doppelpunkt: ersten 4 Wörter als Name nehmen
            woerter = rest.split()
            name = " ".join(woerter[:4]) if woerter else rest
            inhalt = rest
        return {"aktion": "notiz", "bereich": bereich, "name": name, "text": inhalt}

    # Aufgabe? (explizit "Aufgabe:" oder enthält ein Aufgaben-Verb)
    if bereich == "aufgaben" or _ist_aufgabe(rest):
        aufgaben_bereich = None if bereich == "aufgaben" else bereich
        return {"aktion": "aufgabe", "bereich": aufgaben_bereich, "text": rest}

    # Sonst: normale Notiz im Bereich (Standard: memory)
    return {"aktion": "notiz", "bereich": bereich or "memory", "text": rest}
