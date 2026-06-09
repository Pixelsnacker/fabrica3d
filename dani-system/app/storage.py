"""Speicher-Logik: schreibt und liest Markdown-Dateien.

Alle Informationen landen als einfache Markdown-Dateien auf der Festplatte.
So bleibt alles dauerhaft, lesbar und ohne Datenbank.
"""

from __future__ import annotations

import datetime as _dt
import re
import unicodedata
from pathlib import Path

from . import config

# Bereich -> Unterordner in data/
BEREICHE = {
    "privat": "privat",
    "beruflich": "beruflich",
    "fabrica": "fabrica",
    "projekte": "projekte",
    "personen": "personen",
    "aufgaben": "aufgaben",
    "memory": "memory",
}


def _jetzt() -> str:
    return _dt.datetime.now().strftime("%Y-%m-%d %H:%M")


def _heute() -> str:
    return _dt.date.today().strftime("%Y-%m-%d")


def slug(text: str) -> str:
    """Macht aus 'Frau Gruner' einen Dateinamen wie 'frau-gruner'."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or "eintrag"


def _ordner(bereich: str) -> Path:
    pfad = config.DATA_DIR / BEREICHE.get(bereich, "memory")
    pfad.mkdir(parents=True, exist_ok=True)
    return pfad


# ---------------------------------------------------------------------------
# Notizen (Privat / Beruflich / Fabrica / Memory)
# ---------------------------------------------------------------------------

def notiz_speichern(bereich: str, text: str) -> str:
    """Hängt eine Notiz an die Sammeldatei eines Bereichs an."""
    datei = _ordner(bereich) / "notizen.md"
    neu = not datei.exists()
    with datei.open("a", encoding="utf-8") as f:
        if neu:
            f.write(f"# Notizen: {bereich.capitalize()}\n\n")
        f.write(f"## {_jetzt()}\n{text.strip()}\n\n")
    return str(datei.relative_to(config.DATA_DIR))


# ---------------------------------------------------------------------------
# Personen / Projekte (jeweils eigene Datei)
# ---------------------------------------------------------------------------

def eintrag_speichern(bereich: str, name: str, text: str) -> str:
    """Speichert in eine eigene Datei pro Person bzw. Projekt."""
    datei = _ordner(bereich) / f"{slug(name)}.md"
    neu = not datei.exists()
    with datei.open("a", encoding="utf-8") as f:
        if neu:
            f.write(f"# {name.strip()}\n\n")
        f.write(f"## {_jetzt()}\n{text.strip()}\n\n")
    return str(datei.relative_to(config.DATA_DIR))


# ---------------------------------------------------------------------------
# Aufgaben (offen.md / erledigt.md)
# ---------------------------------------------------------------------------

def _aufgaben_datei(name: str) -> Path:
    ordner = _ordner("aufgaben")
    return ordner / name


def aufgabe_hinzufuegen(text: str, bereich: str | None = None) -> str:
    """Trägt eine neue offene Aufgabe in offen.md ein."""
    datei = _aufgaben_datei("offen.md")
    tag = f"[{bereich.capitalize()}] " if bereich else ""
    zeile = f"- [ ] {_heute()} {tag}{text.strip()}\n"
    with datei.open("a", encoding="utf-8") as f:
        f.write(zeile)
    return zeile.strip()


def offene_aufgaben() -> list[str]:
    """Gibt alle offenen Aufgaben als Liste von Zeilen zurück."""
    datei = _aufgaben_datei("offen.md")
    if not datei.exists():
        return []
    zeilen = datei.read_text(encoding="utf-8").splitlines()
    return [z for z in zeilen if z.strip().startswith("- [ ]")]


def aufgabe_erledigen(stichwort: str) -> str | None:
    """Verschiebt die erste passende offene Aufgabe nach erledigt.md.

    'passend' = die Aufgaben-Zeile enthält alle Wörter aus `stichwort`.
    Gibt den Text der verschobenen Aufgabe zurück oder None, wenn nichts passt.
    """
    offen = _aufgaben_datei("offen.md")
    erledigt = _aufgaben_datei("erledigt.md")
    if not offen.exists():
        return None

    woerter = [w.lower() for w in stichwort.split() if w]
    zeilen = offen.read_text(encoding="utf-8").splitlines(keepends=True)

    treffer_index = None
    for i, zeile in enumerate(zeilen):
        if not zeile.strip().startswith("- [ ]"):
            continue
        klein = zeile.lower()
        if all(w in klein for w in woerter):
            treffer_index = i
            break

    if treffer_index is None:
        return None

    aufgabe = zeilen.pop(treffer_index)
    # aus offen.md entfernen
    offen.write_text("".join(zeilen), encoding="utf-8")

    # in erledigt.md eintragen
    if not erledigt.exists():
        erledigt.write_text("# Erledigte Aufgaben\n\n", encoding="utf-8")
    rest = aufgabe.strip()
    if rest.startswith("- [ ]"):
        rest = rest[len("- [ ]"):].strip()
    with erledigt.open("a", encoding="utf-8") as f:
        f.write(f"- [x] erledigt {_heute()} — {rest}\n")
    return rest


# ---------------------------------------------------------------------------
# Suche (über alle Markdown-Dateien)
# ---------------------------------------------------------------------------

def alle_dateien() -> list[Path]:
    return sorted(config.DATA_DIR.rglob("*.md"))


def suchen(begriffe: list[str], max_treffer: int = 8) -> list[dict]:
    """Durchsucht alle Markdown-Dateien nach den Begriffen.

    Rückgabe: Liste von Treffern, je {datei, score, ausschnitt}.
    """
    begriffe = [b.lower() for b in begriffe if b]
    if not begriffe:
        return []

    treffer: list[dict] = []
    for datei in alle_dateien():
        try:
            inhalt = datei.read_text(encoding="utf-8")
        except OSError:
            continue
        klein = inhalt.lower()
        score = sum(klein.count(b) for b in begriffe)
        if score == 0:
            continue

        # Passende Zeilen als Ausschnitt sammeln
        zeilen = inhalt.splitlines()
        passende = [z for z in zeilen if any(b in z.lower() for b in begriffe)]
        ausschnitt = "\n".join(passende[:6]) if passende else inhalt[:300]

        treffer.append({
            "datei": str(datei.relative_to(config.DATA_DIR)),
            "score": score,
            "ausschnitt": ausschnitt.strip(),
            "volltext": inhalt,
        })

    treffer.sort(key=lambda t: t["score"], reverse=True)
    return treffer[:max_treffer]
