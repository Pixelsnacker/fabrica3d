# Fabrica GmbH – Digital Production Website TODO

## Design & Grundstruktur
- [x] Design-System: CSS-Variablen (Bordeaux #8B1A1A, Anthrazit #2D2D2D, Weiß, Hellgrau)
- [x] Google Fonts Inter einbinden
- [x] Globales Layout (index.css, App.tsx)
- [x] Sprachkontext (DE/EN) mit React Context
- [x] Cookie-Banner DSGVO-konform (DE/EN)

## Navigation
- [x] Hauptnavigation mit Dropdown-Untermenüs (Desktop)
- [x] Mobile Navigation (Hamburger-Menü)
- [x] Sprachwechsel-Button (DE/EN Flag)
- [x] Roter "Sofortangebot" Button im Menü (außer Museumsmodelle-Seite)
- [x] Fixierter mobiler CTA-Button unten

## Startseite
- [x] Hero-Bereich: 5 Panels (3D-Druck, CAD, 3D-Scan, CNC, Museumsmodelle) mit Hover-Effekt
- [x] Unternehmenskurzvorstellung mit 3 Highlight-Zahlen
- [x] Sektion "Warum Fabrica" mit Icon-Liste (6 Punkte)
- [x] Leistungsübersicht als Icon-Grid
- [x] Ausgewählte Projekte (visuelles Grid)
- [x] Basiswissen-Teaser
- [x] Upload-Sektion
- [x] Referenzen / Kundenlogos (Platzhalter)
- [x] Call-to-Action Sektion (roter Hintergrund)
- [x] Footer (Kontakt, Navigation, Impressum, Datenschutz, Social Media)

## 3D-Druck Unterseiten
- [x] FDM-Druck Seite
- [x] Endlosfaser FDM Seite (Spezialität, ausführlich)
- [x] SLA-Druck Seite
- [x] DLP-Druck Seite
- [x] SLS-Druck Seite
- [x] MJF-Druck Seite
- [x] Sanddruck Seite
- [x] Polyjet Seite
- [x] Materialien-Übersichtsseite (filterbar)

## CAD Unterseiten
- [x] Konstruktion / Engineering Seite
- [x] Reverse Engineering Seite

## 3D-Scan Unterseiten
- [x] GOM ATOS Systeme Seite
- [x] Anwendungen Seite

## CNC Unterseiten
- [x] Fräsen Seite
- [x] Drehen Seite
- [x] Wasserschneiden Seite
- [x] Laserschneiden Seite

## Weitere Seiten
- [x] Museumsmodelle Seite (kein Sofortangebot, nur Kontakt-Button)
- [x] Projekte Seite (visuelles Grid, filterbar)
- [x] Basiswissen Seite (6 Abschnitte + Glossar DE/EN)
- [x] Upload-Tool Seite (Formular, Datei-Upload bis 50MB, DSGVO, Honeypot)
- [x] Kontaktseite (Formular, Adresse, Öffnungszeiten)
- [x] Impressum Seite (Platzhalter)
- [x] Datenschutz Seite (Platzhalter)

## Formulare & E-Mail
- [x] Upload-Formular: mailto-Link mit Projektdetails an kontakt@fabrica3d.eu
- [x] Kontaktformular: mailto-Link an kontakt@fabrica3d.eu
- [x] Alle mailto-Links mit seitenspezifischen Betreffs
- [x] Upload-Formular: mailto-basierte E-Mail-Benachrichtigung implementiert (Server-seitige SMTP-Integration als Erweiterung dokumentiert)
- [x] Kontaktformular: mailto-basierte E-Mail-Benachrichtigung implementiert (Server-seitige SMTP-Integration als Erweiterung dokumentiert)

## SEO
- [x] Meta-Tags (Title, Description) DE/EN auf allen Seiten
- [x] Semantisches HTML (H1/H2/H3)
- [x] sitemap.xml
- [x] robots.txt
- [x] Schema.org LocalBusiness + Service (inkl. Öffnungszeiten, Angebotskatalog)
- [x] Canonical Tags
- [x] Open Graph Meta-Tags

## Tests
- [x] Vitest-Tests für Formulare und Routen (fabrica.routes.test.ts: 11 Tests, auth.logout.test.ts: 1 Test)

## KI-Kalkulator
- [x] tRPC-Procedure `calculator.estimate` mit LLM-Integration (invokeLLM, strukturierte JSON-Antwort)
- [x] Kalkulator-Seite `/kalkulator` mit Formular (Verfahren, Material, Volumen/Abmessungen, Menge, Qualität, Beschreibung)
- [x] KI-Schätzung mit Kostenbereich, Lieferzeit, Empfehlungen und Hinweisen (JSON-basiert, kein Streaming nötig)
- [x] Navigation: Kalkulator-Link in Hauptnavigation eingebunden
- [x] Kalkulator-CTA auf Startseite (prominenter Teaser-Block mit Beispiel-Schätzung)
- [x] Vitest-Tests für calculator.estimate: 17 Tests (15 Schema-Validierung + 2 Procedure-Tests), alle grün

## Icon-Redesign: Emoji → SVG-Strichzeichnungen
- [x] SVG-Icon-Komponenten-Bibliothek erstellt (FabricaIcons.tsx, 20 Icons)
- [x] Emoji-Icons in Home.tsx (Hero-Panels, Services-Grid) durch SVG-Strichzeichnungen ersetzt
- [x] Emoji-Icons in Navigation.tsx entfernt (keine Emoji-Icons vorhanden)
- [x] Icons in Technologie-Unterseiten: Lucide-Icons bleiben (bereits moderne Strichzeichnungen)

## Logo & Markenfarbe
- [x] Logo FabricaLogoneu.png als CDN-Asset hochladen
- [x] Markenfarbe #7a0e3f in allen CSS-Variablen und Tailwind-Klassen ersetzen (oklch(38.3% 0.144 0.6))
- [x] Logo in Navigation einbinden (statt Text-Fallback)
- [x] Logo im Footer einbinden (weiß invertiert per CSS filter)
- [x] TypeScript-Fehler in Home.tsx (icon → Icon) behoben

## Firmendaten von bestehender Website übernehmen
- [x] Impressum mit echten Firmendaten befüllt (beide Standorte Kerpen + Köln, HRB 81094, USt-ID DE295059929, GF Daniel Rincón)
- [x] Datenschutzerklärung mit echten Firmendaten befüllt
- [x] Kontaktseite: beide Büros (Kerpen Hüttenstraße 205 + Köln Gilabchstr. 205) mit Adressen und Telefonnummern
- [x] Footer: beide Standorte (Kerpen + Köln) mit Adressen und Telefonnummern eingebracht

## Navigation – Zweistufiges Layout (Option A)
- [x] Topbar (obere Leiste): Telefon Kerpen + Köln + E-Mail + DE/EN Sprachumschalter + Sofortangebot-Button
- [x] Hauptleiste: Logo links + alle Menüpunkte kompakt + Kontakt-Link
- [x] Sofortangebot-Button vollständig sichtbar in Topbar
- [x] Mobil: Topbar ausgeblendet, Hamburger-Menü in Hauptleiste, Kontaktdaten im mobilen Menü

## Hero-Panel Bilder (hochformatig, farblich harmonisch)
- [x] 3D-Druck: FDM-Drucker Makro-Aufnahme (blau, 800x1200)
- [x] CAD-Daten: CAD-Workspace mit 3D-Modell auf Bildschirm (blau, 800x1200)
- [x] 3D-Scan: Blaulicht-Strukturlicht-Scan auf schwarzem Hintergrund (800x1200)
- [x] CNC-Bearbeitung: CNC-Fräse mit Funkenflug (dunkel-orange, 800x1200)
- [x] Museumsmodelle: Bronzeskulptur auf schwarzem Hintergrund (800x1200)
- [x] Alle Bilder auf Hochformat 800x1200 zugeschnitten, Helligkeit/Sättigung harmonisiert
- [x] Als CDN-Assets hochgeladen und in Home.tsx eingebunden (Desktop + Mobile)
- [x] Gradient-Overlay von unten für Lesbarkeit der Texte

## Statistiken Startseite
- [x] Statistik-Bereich: "10+ Jahre Erfahrung in der digitalen Fertigung" als prominentes Badge, Platzhalter entfernt

## Hero-Bilder Update (3D-Druck + 3D-Scan)
- [x] 3D-Druck-Bild (SLA-Drucker mit transparentem Getriebe) auf Hochformat 800x1200 zugeschnitten und hochgeladen
- [x] 3D-Scan-Bild: KI-generiertes spektakuläres Bild (Strukturlicht auf Turbinenschaufel, Blau-Cyan auf Schwarz) erstellt und hochgeladen

## Museumsmodelle Hero-Bild
- [x] KI-generiertes Hochformat-Bild: modernes Museum mit Kolosseum-Tastmodell auf schwarzem Sockel, kühles Blau-Ambiente + warmes Spotlight
- [x] Bild in Home.tsx Museumsmodelle-Panel eingebunden

## Header & Farb-Anpassungen
- [x] Logo 25% größer (h-9 → h-[52px], maxWidth 170px → 210px)
- [x] Weißer Header-Bereich höher (h-14 → h-[68px])
- [x] Topbar höher (h-8 → h-10), PageLayout padding angepasst (108px desktop)
- [x] Anthrazit um 10% aufgehellt (oklch 22% → 32%)

## Projektbilder – KI-generiert (modern, zeitlos, harmonisch)
- [x] 12 Projektbilder generiert: FDM-Bracket, CAD-Reverse, 3D-Scan-Serie, CNC-Alu, Römerhelm, SLA-Dental, Architekturmodell, Wasserschneiden, MJF-Serienteile, Fossilien-Scan, CNC-Kunststoff, Roboterarm-Kevlar
- [x] Einheitliche dunkle Industrieästhetik: Stahl-Blau-Grau-Palette, farblich harmonisch
- [x] Alle 12 Bilder in Projekte.tsx eingebunden (CDN-URLs, background-image mit Gradient-Overlay)

## Museumsmodelle-Seite Update
- [x] Archäologische Funde-Sektion durch Tastmodelle-Sektion ersetzt (inkl. Beschreibung, Anwendungsfälle, Materialien)
- [x] Bronzemodelle als eigenes Thema/Sektion eingebracht (Bronzeguss-Repliken, Patinierung, Anwendungen)

## Adresskorrektur & Bildfix
- [x] Köln-Adresse korrigiert: "Gilabchstr. 29a" in Footer und Kontakt
- [x] Projektbilder: Express-Proxy /api/img mit Magic-Byte-Erkennung (image/webp) eingerichtet, alle 12 URLs aktualisiert

## Projektgalerie – Erweiterte Filter & Lightbox
- [x] Projektdaten um Felder "Anwendungsfall" (application) und erweiterte Materialien erweitert
- [x] Multi-Filter-Panel: Kategorie + Material + Anwendungsfall (kombinierbar, DE/EN)
- [x] Aktive Filter als Tags mit X-Button zum Entfernen angezeigt
- [x] Galerie-Grid: 3-spaltig, Hover-Overlay mit Titel/Kategorie/Material/Anwendungsfall
- [x] Lightbox-Detailansicht: Vollbild-Bild, Titel, Beschreibung, Tech, Material, Anwendungsfall, CTA
- [x] Keyboard-Navigation in Lightbox (ESC, Pfeil links/rechts)
- [x] Animierte Übergänge beim Filtern (fade/scale)
- [x] "Keine Ergebnisse"-Zustand mit Reset-Button
- [x] DE/EN vollständig für alle neuen Filter und Labels

## Projektbilder – Einheitlicher fotorealistischer 3D-Rendering-Stil
- [x] Alle 12 Projektbilder als fotorealistische 3D-Renderings generiert (dunkler Hintergrund, Studiobeleuchtung)
- [x] Neue CDN-URLs in Projekte.tsx eingebunden

## Fachliche Korrekturen
- [x] Projektkarte "Wasserschneiden Titanzuschnitte" fachlich korrekt auf AWJ-Verfahren korrigiert (Bild, Titel, Beschreibung, Kategorie)

## Header-Layout
- [x] Topbar (h-12, 48px) und Hauptnavigation (h-[82px]) um ca. 20 % vergrößert, Logo und PageLayout-Offset angepasst

## Panorama Hero-Banner
- [x] Alle Hero-Banner-Seiten inventarisiert und fotorealistische Panoramabilder generiert
- [x] Neue Bilder in alle betroffenen Seiten eingebunden
- [x] Dropdown-Menü leicht transparent gemacht (rgba(255,255,255,0.95) + backdrop-blur)

## F3-Branding – Navigation & Startseite
- [x] Navigationslink "Kalkulator" → "F3 Kalkulator" (DE + EN)
- [x] Startseite-Teaser: "KI-gestützt" → "System F3"

## Neue Projekte
- [x] Heuschrecken-Tastmodell zur Projektgalerie hinzugefügt (522x430x280 mm, SLA, Strukturlack, Fühler TPU)

## Startseite – Bildkorrekturen
- [x] CNC-Bild Startseite ersetzt: modernes CNC-Bearbeitungszentrum mit Fräskopf-Nahaufnahme und G-Code-Parametern auf Monitor

## F3 Kalkulator – Budgetorientierung & Admin-Preispanel
- [x] DB-Tabelle `pricing_config` erstellt (14 Verfahren, Min/Max-Preis, Einheit, Mindestpreis, Rabattstufen)
- [x] Standard-Preisdaten in DB eingetragen (Seed)
- [x] Server-Router: pricingRouter mit DB-Abfrage + null-Check, in routers.ts registriert
- [x] Admin-Preispanel: Seite /admin/preise mit editierbarer Tabelle (PreisAdmin.tsx)
- [x] Kalkulator-Frontend: "Budgetorientierung" Badge + "Grober Richtwert" Label im Ergebnis-Header
- [x] Disclaimer prominenter: amber-Box mit AlertTriangle-Icon nach Empfehlungen
- [x] Kalkulator-Text: Deutlich kommunizieren dass Preis ein grober Richtwert ist und verbindliches Angebot erst nach Erhalt der CAD-Daten erstellt wird

## Neue Projekte – Bildtausch
- [x] Projektkarte "Zahntechnisches Modell" → "SLA Dental Anschauungsmodell" umbenannt und Bild durch Dentalmodell.jpg ersetzt
