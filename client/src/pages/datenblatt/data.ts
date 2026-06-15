// ──────────────────────────────────────────────────────────────────────────
// Siepe Produktdatenblatt-Konfigurator – Datenmodell, Stammdaten & Store
// ──────────────────────────────────────────────────────────────────────────
import { nanoid } from 'nanoid';

export type DocLang = 'de' | 'en' | 'pl' | 'fr';
export const DOC_LANGS: DocLang[] = ['de', 'en', 'pl', 'fr'];
export const LANG_LABEL: Record<DocLang, string> = { de: 'DE', en: 'EN', pl: 'PL', fr: 'FR' };
export const LANG_FLAG: Record<DocLang, string> = { de: '🇩🇪', en: '🇬🇧', pl: '🇵🇱', fr: '🇫🇷' };

/** Mehrsprachiger Text – DE ist die Pflichtsprache (Quelle). */
export type LangText = Record<DocLang, string>;
export const emptyLangText = (): LangText => ({ de: '', en: '', pl: '', fr: '' });
export const langText = (de = '', en = '', pl = '', fr = ''): LangText => ({ de, en, pl, fr });

/** Liefert den Text in der gewünschten Sprache, mit DE als Fallback. */
export function tl(v: LangText | undefined, lang: DocLang): string {
  if (!v) return '';
  return (v[lang] && v[lang].trim()) || v.de || '';
}

// ── Status-Workflow ────────────────────────────────────────────────────────
export type Status = 'entwurf' | 'pruefung' | 'freigegeben' | 'archiviert';
export const STATUS_META: Record<Status, { de: string; en: string }> = {
  entwurf: { de: 'Entwurf', en: 'Draft' },
  pruefung: { de: 'In Prüfung', en: 'In Review' },
  freigegeben: { de: 'Freigegeben', en: 'Approved' },
  archiviert: { de: 'Archiviert', en: 'Archived' },
};

// ── Produktgruppen (bestimmen Sortierung/Ordnerstruktur) ───────────────────
export const PRODUCT_GROUPS = [
  'Deckelfässer',
  'Spundfässer',
  'Hobbocks',
  'Kanister',
  'Eimer',
  'Weithalsfässer',
  'Sonderbehälter',
] as const;

// ── Bausteine ──────────────────────────────────────────────────────────────
export interface FeatureGroup {
  id: string;
  title: LangText; // z. B. MATERIAL, FARBE, AUSFÜHRUNG …
  points: LangText[]; // Bullet-Punkte
}

export interface TechRow {
  id: string;
  type: LangText; // z. B. "Nennvolumen [l]"
  value: LangText; // z. B. "220"
}

export interface Datasheet {
  id: string;
  status: Status;
  createdAt: number;
  updatedAt: number;

  productGroup: string; // Pflicht für Freigabe
  prospektNr: string; // am Datenblatt änderbar
  datum: string; // MM/JJJJ – am Datenblatt änderbar

  headline: LangText; // Produktname (Headline)
  subline: LangText; // Unterzeile / Kurzbeschreibung

  image: string; // Data-URL des Produktbilds
  imageZoom: number; // %
  imageX: number; // % Verschiebung
  imageY: number; // % Verschiebung
  imageDescription: LangText; // optionale Bildunterschrift

  features: FeatureGroup[];
  techData: TechRow[];
  note: LangText; // Hinweistext
}

// ── Zentrale Firmen-Stammdaten (Footer) ────────────────────────────────────
// Werden zentral gepflegt; am einzelnen Datenblatt sind nur Prospekt-Nr. & Datum änderbar.
export interface Werk {
  name: string;
  street: string;
  city: string;
  tel?: string;
}
export interface CompanyConfig {
  name: string;
  web: string;
  email: string;
  werke: Werk[];
}
export const DEFAULT_COMPANY: CompanyConfig = {
  name: 'Siepe GmbH',
  web: 'www.siepe.net',
  email: 'verkauf@siepe.net',
  werke: [
    { name: 'Werk Sindorf', street: 'Hüttenstraße 185', city: '50170 Kerpen', tel: 'Tel. +49 2273 569-21' },
    { name: 'Werk Staßfurt', street: 'Industriestraße 25', city: '39418 Staßfurt', tel: 'Tel. +49 3925 8011-20' },
    { name: 'Werk Eisenberg', street: 'Siemensstraße 2A', city: '67304 Eisenberg', tel: 'Tel. +49 6351 1312-20' },
  ],
};

export const DEFAULT_NOTE: LangText = langText(
  'Die Angaben in mm, g und ml sind Circaangaben. Weitere Produktinformationen erhalten Sie auf Anfrage. Dieses Datenblatt stellt nicht alle Variationsmöglichkeiten dar, sondern gibt Ihnen eine erste Übersicht der möglichen Varianten.',
  'Dimensions in mm, g and ml are approximate values. Further product information is available on request. This data sheet does not show all possible variations, but provides an initial overview of the possible variants.',
  'Wymiary w mm, g i ml są wartościami przybliżonymi. Dalsze informacje o produkcie dostępne na życzenie. Niniejsza karta nie przedstawia wszystkich możliwych wariantów, lecz stanowi pierwszy przegląd możliwych wersji.',
  'Les dimensions en mm, g et ml sont des valeurs approximatives. De plus amples informations sur le produit sont disponibles sur demande. Cette fiche technique ne présente pas toutes les variantes possibles, mais donne un premier aperçu des variantes disponibles.',
);

// ── Helfer ──────────────────────────────────────────────────────────────────
export function newFeatureGroup(title = ''): FeatureGroup {
  return { id: nanoid(8), title: langText(title), points: [emptyLangText()] };
}
export function newTechRow(): TechRow {
  return { id: nanoid(8), type: emptyLangText(), value: emptyLangText() };
}

export function newDatasheet(): Datasheet {
  const now = Date.now();
  return {
    id: nanoid(10),
    status: 'entwurf',
    createdAt: now,
    updatedAt: now,
    productGroup: '',
    prospektNr: '',
    datum: currentMonthYear(),
    headline: emptyLangText(),
    subline: emptyLangText(),
    image: '',
    imageZoom: 100,
    imageX: 0,
    imageY: 0,
    imageDescription: emptyLangText(),
    features: [
      newFeatureGroup('MATERIAL'),
      newFeatureGroup('FARBE'),
      newFeatureGroup('AUSFÜHRUNG'),
    ],
    techData: [newTechRow()],
    note: { ...DEFAULT_NOTE },
  };
}

export function currentMonthYear(): string {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

/** Prüft, ob alle nicht-DE-Sprachen für die Pflichtfelder vorhanden sind. */
export function missingLangs(d: Datasheet): DocLang[] {
  const check = (v: LangText) => DOC_LANGS.filter((l) => l !== 'de' && !v[l].trim() && v.de.trim());
  const langs = new Set<DocLang>();
  [d.headline, d.subline].forEach((v) => check(v).forEach((l) => langs.add(l)));
  d.features.forEach((g) => {
    check(g.title).forEach((l) => langs.add(l));
    g.points.forEach((p) => check(p).forEach((l) => langs.add(l)));
  });
  d.techData.forEach((r) => {
    check(r.type).forEach((l) => langs.add(l));
    check(r.value).forEach((l) => langs.add(l));
  });
  return DOC_LANGS.filter((l) => langs.has(l));
}

export function canApprove(d: Datasheet): boolean {
  return !!d.headline.de.trim() && !!d.productGroup;
}

// ── Store: Server (Single Source of Truth) + LocalStorage-Spiegel ────────────
// Der Server ist maßgeblich, damit der Permalink überall (Webseite, ERP/Lotus
// Notes) synchron bleibt. LocalStorage dient als Cache & Offline-Fallback.
import { api } from '@/lib/trpcVanilla';

const STORE_KEY = 'siepe-datasheets-v1';
const COMPANY_KEY = 'siepe-company-v1';
const SEED_KEY = 'siepe-seeded-v1';

function loadLocal(): Datasheet[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Datasheet[];
  } catch {
    return [];
  }
}
function saveLocal(list: Datasheet[]): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(list));
  } catch {
    /* Quota – Bilder liegen ohnehin als URL vor */
  }
}
function upsertLocal(d: Datasheet): void {
  const list = loadLocal();
  const i = list.findIndex((x) => x.id === d.id);
  if (i >= 0) list[i] = d;
  else list.unshift(d);
  saveLocal(list);
}

export async function loadAll(): Promise<Datasheet[]> {
  try {
    let rows = await api.datasheets.list.query();
    // Erststart: leeren Server mit Beispiel-Datenblatt befüllen
    if (rows.length === 0 && !localStorage.getItem(SEED_KEY)) {
      localStorage.setItem(SEED_KEY, '1');
      await upsert(seedDeckelfass());
      rows = await api.datasheets.list.query();
    }
    if (rows.length > 0) saveLocal(rows as Datasheet[]);
    return (rows.length > 0 ? rows : loadLocal()) as Datasheet[];
  } catch {
    // Offline/kein Server → lokaler Spiegel (ggf. einmalig seeden)
    let local = loadLocal();
    if (local.length === 0 && !localStorage.getItem(SEED_KEY)) {
      localStorage.setItem(SEED_KEY, '1');
      upsertLocal(seedDeckelfass());
      local = loadLocal();
    }
    return local;
  }
}

export async function loadOne(id: string): Promise<Datasheet | undefined> {
  try {
    const row = await api.datasheets.get.query({ id });
    if (row) {
      upsertLocal(row as Datasheet);
      return row as Datasheet;
    }
  } catch {
    /* Fallback unten */
  }
  return loadLocal().find((d) => d.id === id);
}

export async function upsert(d: Datasheet): Promise<void> {
  d.updatedAt = Date.now();
  upsertLocal(d); // sofort lokal spiegeln
  try {
    await api.datasheets.upsert.mutate(d);
  } catch {
    /* offline → bleibt im lokalen Spiegel */
  }
}

export async function remove(id: string): Promise<void> {
  saveLocal(loadLocal().filter((d) => d.id !== id));
  try {
    await api.datasheets.remove.mutate({ id });
  } catch {
    /* offline */
  }
}

export async function setStatusRemote(id: string, status: Status): Promise<void> {
  try {
    await api.datasheets.setStatus.mutate({ id, status });
  } catch {
    /* offline → lokaler Spiegel wird vom Aufrufer aktualisiert */
  }
}

/** Bild-Upload nach S3; liefert stabile URL. Fallback: Data-URL (nur lokal). */
export async function uploadImage(id: string, file: File): Promise<string> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
  try {
    const base64 = dataUrl.split(',')[1] ?? '';
    const { url } = await api.datasheets.uploadImage.mutate({
      id,
      filename: file.name,
      dataBase64: base64,
      mimeType: file.type || 'image/jpeg',
    });
    return url;
  } catch {
    return dataUrl; // ohne Server/Storage: lokale Vorschau
  }
}

export function loadCompany(): CompanyConfig {
  try {
    const raw = localStorage.getItem(COMPANY_KEY);
    return raw ? (JSON.parse(raw) as CompanyConfig) : DEFAULT_COMPANY;
  } catch {
    return DEFAULT_COMPANY;
  }
}
export function saveCompany(c: CompanyConfig): void {
  localStorage.setItem(COMPANY_KEY, JSON.stringify(c));
}

// ── Seed: Deckelfass 220 L RST (entspricht der Referenz-Vorlage) ─────────────
function seedDeckelfass(): Datasheet {
  const now = Date.now();
  return {
    id: 'deckelfass-220-rst',
    status: 'freigegeben',
    createdAt: now,
    updatedAt: now,
    productGroup: 'Deckelfässer',
    prospektNr: '524',
    datum: '05/2020',
    headline: langText('Deckelfass 220 L RST', 'Lidded Drum 220 L RST'),
    subline: langText(
      'Zulassung für gefährliche Flüssigkeiten',
      'Approval for hazardous liquids',
    ),
    image: '',
    imageZoom: 100,
    imageX: 0,
    imageY: 0,
    imageDescription: emptyLangText(),
    features: [
      { id: nanoid(8), title: langText('MATERIAL', 'MATERIAL'), points: [
        langText('Polyethylen mit hoher Dichte (HDPE)', 'High-density polyethylene (HDPE)'),
      ]},
      { id: nanoid(8), title: langText('FARBE', 'COLOUR'), points: [
        langText('individuelle Einfärbung', 'individual colouring'),
      ]},
      { id: nanoid(8), title: langText('AUSFÜHRUNG', 'DESIGN'), points: [
        langText('runde, bauchige Form (R)', 'round, bulbous shape (R)'),
        langText('Standarddeckel mit Moosgummidichtung (ST)', 'standard lid with sponge rubber seal (ST)'),
        langText('verzinkter Spannring mit Außenhebelverschluss', 'galvanised clamping ring with external lever closure'),
        langText('Zulassung für gefährliche Flüssigkeiten: UN 1H2/Z/100/...', 'approval for hazardous liquids: UN 1H2/Z/100/...'),
      ]},
      { id: nanoid(8), title: langText('VARIANTEN', 'VARIANTS'), points: [
        langText('Banderole', 'banderole'),
        langText('Etikett', 'label'),
      ]},
      { id: nanoid(8), title: langText('PACKWEISE', 'PACKAGING'), points: [
        langText('auf Paletten (Anzahl nach Vereinbarung)', 'on pallets (quantity by agreement)'),
        langText('lose', 'loose'),
      ]},
    ],
    techData: [
      { id: nanoid(8), type: langText('Typ'), value: langText('934, 935') },
      { id: nanoid(8), type: langText('Nennvolumen [l]', 'Nominal volume [l]'), value: langText('220') },
      { id: nanoid(8), type: langText('Durchmesser [mm]', 'Diameter [mm]'), value: langText('590') },
      { id: nanoid(8), type: langText('Gesamthöhe [mm]', 'Overall height [mm]'), value: langText('975') },
      { id: nanoid(8), type: langText('Einfüllöffnung [mm]', 'Filling opening [mm]'), value: langText('465') },
      { id: nanoid(8), type: langText('UN-Gefahrgutzulassung für Feststoffe', 'UN approval for solids'), value: langText('nein', 'no') },
      { id: nanoid(8), type: langText('UN-Gefahrgutzulassung für Flüssigkeiten', 'UN approval for liquids'), value: langText('ja', 'yes') },
    ],
    note: { ...DEFAULT_NOTE },
  };
}
