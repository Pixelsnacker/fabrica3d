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
- [ ] Upload-Formular: Server-seitige E-Mail-Benachrichtigung (tRPC, Erweiterung)
- [ ] Kontaktformular: Server-seitige E-Mail-Benachrichtigung (tRPC, Erweiterung)

## SEO
- [x] Meta-Tags (Title, Description) DE/EN auf allen Seiten
- [x] Semantisches HTML (H1/H2/H3)
- [x] sitemap.xml
- [x] robots.txt
- [x] Schema.org LocalBusiness + Service (inkl. Öffnungszeiten, Angebotskatalog)
- [x] Canonical Tags
- [x] Open Graph Meta-Tags

## Tests
- [ ] Vitest-Tests für Formulare und Routen
