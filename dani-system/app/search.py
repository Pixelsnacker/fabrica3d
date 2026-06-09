"""Suche in den Markdown-Dateien + optionale KI-Antwort.

- Ohne API-Schlüssel: zeigt die passenden Markdown-Ausschnitte direkt an.
- Mit API-Schlüssel (.env): formuliert Claude eine kurze Antwort aus den
  gefundenen Notizen. Die Quellen werden trotzdem immer mit angezeigt.
"""

from __future__ import annotations

from . import classify, config, storage


def _ki_antwort(frage: str, treffer: list[dict]) -> str | None:
    """Formuliert mit Claude eine Antwort aus den Treffern. None bei Fehler."""
    if not config.KI_AKTIV or not treffer:
        return None

    # Kontext aus den besten Treffern zusammenbauen (begrenzt)
    teile = []
    for t in treffer[:5]:
        teile.append(f"### Quelle: {t['datei']}\n{t['volltext'][:1500]}")
    kontext = "\n\n".join(teile)

    system = (
        "Du bist das persönliche Gedächtnis von Dani. Beantworte die Frage NUR "
        "auf Basis der bereitgestellten Notizen. Antworte kurz und auf Deutsch. "
        "Wenn die Notizen die Antwort nicht enthalten, sage das ehrlich."
    )
    nachricht = f"Notizen:\n{kontext}\n\nFrage: {frage}"

    try:
        import anthropic

        client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY)
        antwort = client.messages.create(
            model=config.ANTHROPIC_MODEL,
            max_tokens=600,
            system=system,
            messages=[{"role": "user", "content": nachricht}],
        )
        return "".join(b.text for b in antwort.content if b.type == "text").strip()
    except Exception as e:  # noqa: BLE001 - bewusst tolerant: Suche soll nie crashen
        return f"(KI-Antwort nicht verfügbar: {e})"


def frage_beantworten(frage: str, begriffe: list[str] | None = None) -> dict:
    """Sucht und liefert Antwort + Quellen.

    Rückgabe: {"antwort": str, "treffer": [...], "ki": bool}
    """
    if begriffe is None:
        begriffe = classify.suchbegriffe(frage)

    treffer = storage.suchen(begriffe)

    if not treffer:
        return {
            "antwort": "Dazu habe ich noch nichts gespeichert.",
            "treffer": [],
            "ki": False,
        }

    ki_text = _ki_antwort(frage, treffer)
    if ki_text:
        return {"antwort": ki_text, "treffer": treffer, "ki": True}

    # Ohne KI: kurze Zusammenfassung der Fundstellen
    zeilen = [f"Ich habe {len(treffer)} passende Notiz(en) gefunden:"]
    for t in treffer:
        zeilen.append(f"\n**{t['datei']}**\n{t['ausschnitt']}")
    return {"antwort": "\n".join(zeilen), "treffer": treffer, "ki": False}
