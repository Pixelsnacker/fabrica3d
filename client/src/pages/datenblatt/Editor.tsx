import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useRoute } from 'wouter';
import {
  ArrowLeft, Save, Download, Eye, Send, Plus, Trash2, Upload, X, Link as LinkIcon, Archive,
} from 'lucide-react';
import {
  Datasheet, DocLang, DOC_LANGS, LANG_LABEL, LANG_FLAG, LangText,
  loadOne, upsert, loadCompany, newFeatureGroup, newTechRow, emptyLangText,
  STATUS_META, missingLangs, canApprove, PRODUCT_GROUPS, Status, uploadImage,
} from './data';
import DatenblattDocument from './DatenblattDocument';

const BLUE = '#2563eb';
const A4_W = 793.7; // px @96dpi
const A4_H = 1122.5;

export default function Editor() {
  const [, params] = useRoute('/datenblatt/:id');
  const [, setLocation] = useLocation();
  const id = params?.id ?? '';

  const [doc, setDoc] = useState<Datasheet | null>(null);
  const [lang, setLang] = useState<DocLang>('de');
  const [dirty, setDirty] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const company = loadCompany();

  useEffect(() => {
    let active = true;
    loadOne(id).then((d) => {
      if (!active) return;
      if (!d) setLocation('/datenblatt');
      else setDoc(d);
    });
    return () => {
      active = false;
    };
  }, [id, setLocation]);

  // Patch-Helfer
  const patch = (p: Partial<Datasheet>) => {
    setDoc((d) => (d ? { ...d, ...p } : d));
    setDirty(true);
  };

  const save = async () => {
    if (!doc) return;
    await upsert(doc);
    setDirty(false);
  };

  const print = () => {
    document.body.classList.add('ds-printing');
    window.print();
  };

  useEffect(() => {
    const after = () => document.body.classList.remove('ds-printing');
    window.addEventListener('afterprint', after);
    return () => window.removeEventListener('afterprint', after);
  }, []);

  // Auto-PDF über ?pdf=1
  useEffect(() => {
    if (doc && new URLSearchParams(window.location.search).get('pdf') === '1') {
      const t = setTimeout(print, 400);
      return () => clearTimeout(t);
    }
  }, [doc]);

  if (!doc) return null;

  const missing = missingLangs(doc);

  const setStatus = async (status: Status) => {
    const next = { ...doc, status };
    setDoc(next);
    await upsert(next);
    setDirty(false);
  };

  const copyPermalink = () => {
    const url = `${window.location.origin}/datenblatt/${doc.id}`;
    navigator.clipboard?.writeText(url);
    window.alert('Permanentlink kopiert:\n' + url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Topbar ── */}
      <div className="ds-no-print sticky top-0 z-40 bg-white border-b">
        <div className="container flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2 md:h-16 md:py-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setLocation('/datenblatt')}
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium"
            >
              <ArrowLeft size={18} /> <span className="hidden sm:inline">Übersicht</span>
            </button>
            <div className="hidden md:block font-bold text-gray-800 truncate">Datenblatt bearbeiten</div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
              {STATUS_META[doc.status].de}
            </span>
            {dirty && <span className="text-xs text-amber-600">• ungespeichert</span>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={copyPermalink}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg border text-gray-600 hover:bg-gray-50 text-sm"
              title="Permanentlink kopieren"
            >
              <LinkIcon size={15} /> Link
            </button>
            {doc.status === 'entwurf' && (
              <button
                onClick={() => setStatus('pruefung')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 text-sm"
              >
                <Send size={15} /> Zur Prüfung
              </button>
            )}
            {doc.status === 'pruefung' && (
              <button
                onClick={() => setStatus('freigegeben')}
                disabled={!canApprove(doc)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 text-sm disabled:opacity-40"
                title={canApprove(doc) ? '' : 'Headline (DE) und Produktgruppe erforderlich'}
              >
                <Send size={15} /> Freigeben
              </button>
            )}
            {doc.status === 'freigegeben' && (
              <button
                onClick={() => setStatus('archiviert')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 text-sm"
              >
                <Archive size={15} /> Archivieren
              </button>
            )}
            <button
              onClick={save}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-sm"
              style={{ background: BLUE }}
            >
              <Save size={15} /> Speichern
            </button>
            <button
              onClick={print}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 text-sm"
            >
              <Download size={15} /> PDF
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 text-sm"
            >
              <Eye size={15} /> Vorschau
            </button>
          </div>
        </div>
        {/* Sprache */}
        <div className="container flex items-center gap-3 py-2 border-t">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Sprache</span>
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            {DOC_LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  lang === l ? 'text-white' : 'text-gray-600 hover:bg-white/60'
                }`}
                style={lang === l ? { background: BLUE } : {}}
              >
                <span>{LANG_FLAG[l]}</span> {LANG_LABEL[l]}
                {l !== 'de' && missing.includes(l) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Übersetzung fehlt" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Inhalt: Formular + Vorschau ── */}
      <div className="container py-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Formular */}
        <div className="space-y-5 ds-no-print">
          {/* Header */}
          <Card title="Header" step={1} hint="Produktname, Unterzeile, Prospekt-Nr. & Datum">
            <LangInput
              label="Produktname (Headline)"
              placeholder="z.B. Deckelfass 220 L RST"
              value={doc.headline}
              lang={lang}
              onChange={(v) => patch({ headline: v })}
            />
            <LangInput
              label="Unterzeile / Kurzbeschreibung"
              placeholder="z.B. Zulassung für gefährliche Flüssigkeiten"
              value={doc.subline}
              lang={lang}
              onChange={(v) => patch({ subline: v })}
            />
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="Prospekt-Nr."
                value={doc.prospektNr}
                onChange={(v) => patch({ prospektNr: v })}
                placeholder="523"
              />
              <TextField
                label="Datum"
                value={doc.datum}
                onChange={(v) => patch({ datum: v })}
                placeholder="06/2026"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Produktgruppe <span className="text-amber-600 text-xs font-normal">(Pflicht für Freigabe)</span>
              </label>
              <select
                value={doc.productGroup}
                onChange={(e) => patch({ productGroup: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2"
                style={{ ['--tw-ring-color' as string]: BLUE }}
              >
                <option value="">Bitte Produktgruppe wählen …</option>
                {PRODUCT_GROUPS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Bestimmt die Ordnerstruktur im Backup und die Sortierung in Übersichten.
              </p>
            </div>
          </Card>

          {/* Produktbild */}
          <Card title="Produktbild" step={2} hint="Bild hochladen, ausrichten & beschriften">
            <ImageUpload
              value={doc.image}
              onUpload={async (file) => {
                const url = await uploadImage(doc.id, file);
                patch({ image: url });
              }}
              onClear={() => patch({ image: '' })}
            />
            <Slider label={`Zoom: ${doc.imageZoom}%`} min={50} max={250} value={doc.imageZoom} onChange={(v) => patch({ imageZoom: v })} />
            <div className="grid grid-cols-2 gap-4">
              <Slider label={`Verschieben X: ${doc.imageX}%`} min={-50} max={50} value={doc.imageX} onChange={(v) => patch({ imageX: v })} />
              <Slider label={`Verschieben Y: ${doc.imageY}%`} min={-50} max={50} value={doc.imageY} onChange={(v) => patch({ imageY: v })} />
            </div>
            <LangTextarea
              label="Beschreibung (optional)"
              value={doc.imageDescription}
              lang={lang}
              onChange={(v) => patch({ imageDescription: v })}
            />
          </Card>

          {/* Produktmerkmale */}
          <Card title="Produktmerkmale" step={3} hint="Gruppen wie MATERIAL, FARBE, AUSFÜHRUNG …">
            <div className="space-y-4">
              {doc.features.map((g, gi) => (
                <div key={g.id} className="border rounded-xl p-4 bg-gray-50/50">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      value={g.title[lang]}
                      onChange={(e) =>
                        patch({
                          features: doc.features.map((x, i) =>
                            i === gi ? { ...x, title: { ...x.title, [lang]: e.target.value } } : x,
                          ),
                        })
                      }
                      placeholder="ÜBERSCHRIFT (z.B. MATERIAL)"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm font-semibold uppercase focus:outline-none focus:ring-2"
                      style={{ ['--tw-ring-color' as string]: BLUE }}
                    />
                    <button
                      onClick={() => patch({ features: doc.features.filter((_, i) => i !== gi) })}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Gruppe löschen"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {g.points.map((p, pi) => (
                      <div key={pi} className="flex items-center gap-2">
                        <span className="text-gray-400">•</span>
                        <input
                          value={p[lang]}
                          onChange={(e) =>
                            patch({
                              features: doc.features.map((x, i) =>
                                i === gi
                                  ? {
                                      ...x,
                                      points: x.points.map((y, j) =>
                                        j === pi ? { ...y, [lang]: e.target.value } : y,
                                      ),
                                    }
                                  : x,
                              ),
                            })
                          }
                          placeholder="Punkt"
                          className="flex-1 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2"
                          style={{ ['--tw-ring-color' as string]: BLUE }}
                        />
                        <button
                          onClick={() =>
                            patch({
                              features: doc.features.map((x, i) =>
                                i === gi ? { ...x, points: x.points.filter((_, j) => j !== pi) } : x,
                              ),
                            })
                          }
                          className="p-1.5 text-gray-300 hover:text-red-600 rounded"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        patch({
                          features: doc.features.map((x, i) =>
                            i === gi ? { ...x, points: [...x.points, emptyLangText()] } : x,
                          ),
                        })
                      }
                      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 pl-5"
                    >
                      <Plus size={14} /> Punkt
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => patch({ features: [...doc.features, newFeatureGroup()] })}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-dashed w-full justify-center text-gray-600 hover:bg-gray-50"
              >
                <Plus size={16} /> Merkmalsgruppe hinzufügen
              </button>
            </div>
          </Card>

          {/* Technische Daten */}
          <Card title="Technische Daten" step={4} hint="Typ / Wert – z. B. Nennvolumen [l] · 220">
            <div className="space-y-2">
              {doc.techData.map((r, ri) => (
                <div key={r.id} className="flex items-center gap-2">
                  <input
                    value={r.type[lang]}
                    onChange={(e) =>
                      patch({
                        techData: doc.techData.map((x, i) =>
                          i === ri ? { ...x, type: { ...x.type, [lang]: e.target.value } } : x,
                        ),
                      })
                    }
                    placeholder="Typ"
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                    style={{ ['--tw-ring-color' as string]: BLUE }}
                  />
                  <input
                    value={r.value[lang]}
                    onChange={(e) =>
                      patch({
                        techData: doc.techData.map((x, i) =>
                          i === ri ? { ...x, value: { ...x.value, [lang]: e.target.value } } : x,
                        ),
                      })
                    }
                    placeholder="Wert"
                    className="w-32 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                    style={{ ['--tw-ring-color' as string]: BLUE }}
                  />
                  <button
                    onClick={() => patch({ techData: doc.techData.filter((_, i) => i !== ri) })}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => patch({ techData: [...doc.techData, newTechRow()] })}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-dashed w-full justify-center text-gray-600 hover:bg-gray-50"
              >
                <Plus size={16} /> Zeile hinzufügen
              </button>
            </div>
          </Card>

          {/* Hinweistext */}
          <Card title="Hinweistext" step={5} hint="Kleingedrucktes unter der Tabelle">
            <LangTextarea label="" value={doc.note} lang={lang} onChange={(v) => patch({ note: v })} rows={4} />
          </Card>

          {/* Footer-Hinweis */}
          <Card title="Footer" step={6} hint="Zentrale Firmendaten (Verwaltung)">
            <p className="text-sm text-gray-500">
              Firmenname, Webseite, E-Mail und Werke werden zentral gepflegt (siehe „Verwaltung" in der Übersicht). Am
              einzelnen Datenblatt änderbar sind nur Prospekt-Nr. und Datum.
            </p>
          </Card>
        </div>

        {/* Live-Vorschau */}
        <div className="hidden lg:block ds-no-print sticky top-32">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Live-Vorschau</div>
          <div className="bg-gray-200 rounded-xl p-4 shadow-inner">
            <ScaledDoc>
              <DatenblattDocument doc={doc} company={company} lang={lang} />
            </ScaledDoc>
          </div>
        </div>
      </div>

      {/* ── Vollbild-Vorschau ── */}
      {showPreview && (
        <div
          className="ds-no-print fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4 overflow-auto"
          onClick={() => setShowPreview(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-3 -right-3 z-10 p-2 bg-white rounded-full shadow"
            >
              <X size={18} />
            </button>
            <div className="shadow-2xl">
              <DatenblattDocument doc={doc} company={company} lang={lang} />
            </div>
          </div>
        </div>
      )}

      {/* ── Versteckter Druck-Container (nur beim Drucken sichtbar) ── */}
      {createPortal(
        <div id="dsPrintRoot">
          <DatenblattDocument doc={doc} company={company} lang={lang} />
        </div>,
        document.body,
      )}
    </div>
  );
}

// ── Vorschau-Skalierung ──────────────────────────────────────────────────────
function ScaledDoc({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / A4_W));
    ro.observe(el);
    setScale(el.clientWidth / A4_W);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: '100%', height: A4_H * scale, overflow: 'hidden' }}>
      <div style={{ width: A4_W, height: A4_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  );
}

// ── Bausteine ────────────────────────────────────────────────────────────────
function Card({ title, step, hint, children }: { title: string; step?: number; hint?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm space-y-4">
      <div className="flex items-start gap-3">
        {step != null && (
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full text-white text-sm font-bold flex items-center justify-center"
            style={{ background: BLUE }}
          >
            {step}
          </span>
        )}
        <div>
          <h2 className="font-bold text-base leading-tight" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {title}
          </h2>
          {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
        style={{ ['--tw-ring-color' as string]: BLUE }}
      />
    </label>
  );
}

function LangInput({ label, value, lang, onChange, placeholder }: { label: string; value: LangText; lang: DocLang; onChange: (v: LangText) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <input
        value={value[lang]}
        onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
        placeholder={lang === 'de' ? placeholder : `${placeholder ?? ''} (${LANG_LABEL[lang]})`}
        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
        style={{ ['--tw-ring-color' as string]: BLUE }}
      />
    </label>
  );
}

function LangTextarea({ label, value, lang, onChange, rows = 3 }: { label: string; value: LangText; lang: DocLang; onChange: (v: LangText) => void; rows?: number }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>}
      <textarea
        value={value[lang]}
        onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
        rows={rows}
        className="w-full px-3 py-2 border rounded-lg text-sm resize-y focus:outline-none focus:ring-2"
        style={{ ['--tw-ring-color' as string]: BLUE }}
      />
    </label>
  );
}

function Slider({ label, min, max, value, onChange }: { label: string; min: number; max: number; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-600 mb-1">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
    </label>
  );
}

function ImageUpload({ value, onUpload, onClear }: { value: string; onUpload: (f: File) => Promise<void>; onClear: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const onFile = async (f?: File) => {
    if (!f) return;
    setBusy(true);
    try {
      await onUpload(f);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 text-sm font-medium disabled:opacity-50"
      >
        <Upload size={16} /> {busy ? 'Lädt …' : 'Bild hochladen'}
      </button>
      {value && (
        <>
          <img src={value} alt="" className="h-12 w-12 object-contain border rounded" />
          <button onClick={onClear} className="text-sm text-gray-400 hover:text-red-600">
            Entfernen
          </button>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
    </div>
  );
}
