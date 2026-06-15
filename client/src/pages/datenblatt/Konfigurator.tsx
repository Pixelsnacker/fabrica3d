import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { usePageMeta } from '@/hooks/usePageMeta';
import {
  Search, Plus, Shield, FileText, Trash2, Pencil, X, Save,
} from 'lucide-react';
import {
  Datasheet, Status, STATUS_META, loadAll, remove, newDatasheet, upsert,
  loadCompany, saveCompany, CompanyConfig,
} from './data';

const BLUE = '#2563eb';

const STATUS_TABS: { key: Status | 'alle'; de: string; en: string }[] = [
  { key: 'alle', de: 'Alle', en: 'All' },
  { key: 'entwurf', de: 'Entwurf', en: 'Draft' },
  { key: 'pruefung', de: 'In Prüfung', en: 'In Review' },
  { key: 'freigegeben', de: 'Freigegeben', en: 'Approved' },
  { key: 'archiviert', de: 'Archiviert', en: 'Archived' },
];

function StatusBadge({ status }: { status: Status }) {
  const filled = status === 'freigegeben';
  const label = STATUS_META[status].de;
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
      style={
        filled
          ? { background: BLUE, color: '#fff' }
          : { background: '#fff', color: '#444', border: '1px solid #d6d6d6' }
      }
    >
      {label}
    </span>
  );
}

function fmtDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}, ${String(d.getHours()).padStart(2, '0')}:${String(
    d.getMinutes(),
  ).padStart(2, '0')}`;
}

export default function Konfigurator() {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState<Datasheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Status | 'alle'>('alle');
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    loadAll().then((list) => {
      setItems(list);
      setLoading(false);
    });
  }, []);

  usePageMeta({
    titleDe: 'Produktdatenblatt-Konfigurator',
    titleEn: 'Product Data Sheet Configurator',
    descriptionDe: 'Zentrale Pflege aller Produktdatenblätter – mit Permanentlink und PDF-Export.',
    descriptionEn: 'Central management of all product data sheets – with permanent link and PDF export.',
    canonical: '/datenblatt',
  });

  const counts = useMemo(() => {
    const c: Record<string, number> = { alle: items.length };
    for (const s of ['entwurf', 'pruefung', 'freigegeben', 'archiviert'] as Status[]) {
      c[s] = items.filter((d) => d.status === s).length;
    }
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((d) => (tab === 'alle' ? true : d.status === tab))
      .filter((d) =>
        !q
          ? true
          : d.headline.de.toLowerCase().includes(q) || d.prospektNr.toLowerCase().includes(q),
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [items, query, tab]);

  const handleNew = async () => {
    const d = newDatasheet();
    await upsert(d);
    setLocation(`/datenblatt/${d.id}`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Dieses Datenblatt wirklich löschen?')) return;
    await remove(id);
    setItems(await loadAll());
  };

  return (
    <PageLayout>
      <div className="container py-8 md:py-12">
        {/* Kopf */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--fabrica-anthrazit)' }}>
              Produktdatenblatt-Konfigurator
            </h1>
            <p className="text-gray-500 mt-2 max-w-md">
              Zentrale Pflege aller Datenblätter – mit Permanentlink und PDF-Export.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <Shield size={18} />
              Verwaltung
            </button>
            <button
              onClick={handleNew}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
              style={{ background: BLUE }}
            >
              <Plus size={18} />
              Neues Datenblatt
            </button>
          </div>
        </div>

        {/* Suche */}
        <div className="relative mb-5 max-w-2xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchen nach Produktname oder Prospektnummer …"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
            style={{ ['--tw-ring-color' as string]: BLUE }}
          />
        </div>

        {/* Status-Tabs */}
        <div className="flex flex-wrap gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
          {STATUS_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                tab === t.key ? 'text-white' : 'text-gray-600 hover:bg-white/60'
              }`}
              style={tab === t.key ? { background: BLUE } : {}}
            >
              {t.de}
              <span className={`text-xs ${tab === t.key ? 'text-white/80' : 'text-gray-400'}`}>
                {counts[t.key] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Tabelle */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-5 py-3 font-semibold">Produktname</th>
                <th className="px-5 py-3 font-semibold">Prospekt</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Zuletzt geändert</th>
                <th className="px-5 py-3 font-semibold text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-400">
                    {loading ? 'Lädt …' : 'Keine Datenblätter gefunden.'}
                  </td>
                </tr>
              )}
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setLocation(`/datenblatt/${d.id}`)}
                >
                  <td className="px-5 py-4 font-medium" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    {d.headline.de || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {d.prospektNr ? `Nr. ${d.prospektNr}` : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-5 py-4 text-gray-500">{fmtDate(d.updatedAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setLocation(`/datenblatt/${d.id}`)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        title="Bearbeiten"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setLocation(`/datenblatt/${d.id}?pdf=1`)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        title="PDF"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Löschen"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdmin && <AdminDialog onClose={() => setShowAdmin(false)} />}
    </PageLayout>
  );
}

// ── Verwaltung: zentrale Firmen-Stammdaten ──────────────────────────────────
function AdminDialog({ onClose }: { onClose: () => void }) {
  const [company, setCompany] = useState<CompanyConfig>(() => loadCompany());

  const save = () => {
    saveCompany(company);
    onClose();
  };

  const updWerk = (i: number, patch: Partial<CompanyConfig['werke'][number]>) =>
    setCompany((c) => ({ ...c, werke: c.werke.map((w, j) => (j === i ? { ...w, ...patch } : w)) }));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
            <Shield size={18} /> Verwaltung – zentrale Stammdaten
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <p className="text-sm text-gray-500">
            Firmenname, Webseite, E-Mail und Werke werden zentral gepflegt und erscheinen im Footer aller
            Datenblätter.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Firmenname" value={company.name} onChange={(v) => setCompany((c) => ({ ...c, name: v }))} />
            <Field label="Webseite" value={company.web} onChange={(v) => setCompany((c) => ({ ...c, web: v }))} />
            <Field label="E-Mail" value={company.email} onChange={(v) => setCompany((c) => ({ ...c, email: v }))} />
          </div>
          <div className="space-y-4">
            {company.werke.map((w, i) => (
              <div key={i} className="border rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Werk" value={w.name} onChange={(v) => updWerk(i, { name: v })} />
                <Field label="Telefon" value={w.tel ?? ''} onChange={(v) => updWerk(i, { tel: v })} />
                <Field label="Straße" value={w.street} onChange={(v) => updWerk(i, { street: v })} />
                <Field label="PLZ / Ort" value={w.city} onChange={(v) => updWerk(i, { city: v })} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50">
            Abbrechen
          </button>
          <button
            onClick={save}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
            style={{ background: BLUE }}
          >
            <Save size={16} /> Speichern
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-500 mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
        style={{ ['--tw-ring-color' as string]: BLUE }}
      />
    </label>
  );
}
