"""dani-system — persönliches KI-Gedächtnis (Version 0.1).

Eine schlanke Weboberfläche: ein Eingabefeld für Notizen, Aufgaben und Fragen.
Geschützt per Passwort (HTTP Basic Auth). Zugangsdaten kommen aus der .env.
"""

from __future__ import annotations

import secrets
from pathlib import Path

from fastapi import Depends, FastAPI, Form, HTTPException, Request, status
from fastapi.responses import HTMLResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.templating import Jinja2Templates

from . import classify, config, search, storage

app = FastAPI(title="dani-system")
templates = Jinja2Templates(directory=str(Path(__file__).parent / "templates"))
security = HTTPBasic()


# ---------------------------------------------------------------------------
# Passwortschutz
# ---------------------------------------------------------------------------

def pruefe_login(credentials: HTTPBasicCredentials = Depends(security)) -> str:
    user_ok = secrets.compare_digest(credentials.username, config.LOGIN_USER)
    pass_ok = bool(config.LOGIN_PASSWORD) and secrets.compare_digest(
        credentials.password, config.LOGIN_PASSWORD
    )
    if not (user_ok and pass_ok):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Falsche Zugangsdaten",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


# ---------------------------------------------------------------------------
# Verarbeitung einer Eingabe
# ---------------------------------------------------------------------------

def verarbeite(text: str) -> dict:
    """Wendet die Regeln an und führt die passende Aktion aus."""
    text = (text or "").strip()
    if not text:
        return {"typ": "hinweis", "antwort": "Bitte etwas eingeben."}

    plan = classify.analysiere(text)
    aktion = plan["aktion"]

    if aktion == "frage":
        ergebnis = search.frage_beantworten(text, plan.get("begriffe"))
        return {
            "typ": "frage",
            "antwort": ergebnis["antwort"],
            "treffer": ergebnis["treffer"],
            "ki": ergebnis["ki"],
        }

    if aktion == "erledigt":
        verschoben = storage.aufgabe_erledigen(plan["stichwort"])
        if verschoben:
            return {"typ": "erledigt",
                    "antwort": f"✅ Als erledigt markiert: {verschoben}"}
        return {"typ": "hinweis",
                "antwort": f"Keine offene Aufgabe zu „{plan['stichwort']}“ gefunden."}

    if aktion == "aufgabe":
        zeile = storage.aufgabe_hinzufuegen(plan["text"], plan.get("bereich"))
        return {"typ": "aufgabe",
                "antwort": f"📝 Aufgabe gespeichert: {zeile}"}

    if aktion == "notiz":
        if plan["bereich"] in ("personen", "projekte"):
            datei = storage.eintrag_speichern(
                plan["bereich"], plan["name"], plan["text"]
            )
        else:
            datei = storage.notiz_speichern(plan["bereich"], plan["text"])
        return {"typ": "notiz",
                "antwort": f"💾 Gespeichert in {datei}"}

    return {"typ": "hinweis", "antwort": "Unbekannte Aktion."}


# ---------------------------------------------------------------------------
# Routen
# ---------------------------------------------------------------------------

@app.get("/", response_class=HTMLResponse)
def startseite(request: Request, user: str = Depends(pruefe_login)):
    return templates.TemplateResponse(request, "index.html", {
        "ergebnis": None,
        "eingabe": "",
        "offene_aufgaben": storage.offene_aufgaben(),
        "ki_aktiv": config.KI_AKTIV,
    })


@app.post("/", response_class=HTMLResponse)
def eingabe_verarbeiten(
    request: Request,
    eingabe: str = Form(""),
    user: str = Depends(pruefe_login),
):
    ergebnis = verarbeite(eingabe)
    return templates.TemplateResponse(request, "index.html", {
        "ergebnis": ergebnis,
        "eingabe": eingabe,
        "offene_aufgaben": storage.offene_aufgaben(),
        "ki_aktiv": config.KI_AKTIV,
    })


@app.get("/status")
def status_check():
    """Einfacher Gesundheits-Check (ohne Login)."""
    return {"status": "ok", "ki_aktiv": config.KI_AKTIV}
