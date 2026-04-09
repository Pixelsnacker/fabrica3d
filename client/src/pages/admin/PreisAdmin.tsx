import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import { trpc } from '@/lib/trpc';
import { Save, RefreshCw, Lock, Euro, Percent, AlertCircle, CheckCircle } from 'lucide-react';

interface PricingRow {
  id: number;
  processKey: string;
  labelDe: string;
  labelEn: string;
  unit: 'cm3' | 'hour' | 'object';
  pricePerUnitMin: string;
  pricePerUnitMax: string;
  minimumPrice: string;
  discountFrom10: string;
  discountFrom50: string;
  noteDe: string | null;
  noteEn: string | null;
  sortOrder: number;
  updatedAt: Date;
}

interface EditState {
  [id: number]: {
    pricePerUnitMin: string;
    pricePerUnitMax: string;
    minimumPrice: string;
    discountFrom10: string;
    discountFrom50: string;
    noteDe: string;
    noteEn: string;
  };
}

const UNIT_LABELS: Record<string, { de: string; en: string }> = {
  cm3: { de: '€ / cm³', en: '€ / cm³' },
  hour: { de: '€ / Stunde', en: '€ / hour' },
  object: { de: '€ / Objekt', en: '€ / object' },
};

export default function PreisAdmin() {
  const { lang } = useLanguage();
  const isDe = lang === 'de';

  const { data: rows, isLoading, refetch } = trpc.pricing.list.useQuery();
  const updateMutation = trpc.pricing.update.useMutation();

  const [editState, setEditState] = useState<EditState>({});
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [errorIds, setErrorIds] = useState<Set<number>>(new Set());

  function getEditValue(row: PricingRow, field: keyof EditState[number]): string {
    return editState[row.id]?.[field] ?? String(row[field as keyof PricingRow] ?? '');
  }

  function handleChange(id: number, field: keyof EditState[number], value: string) {
    setEditState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
    // Clear saved/error state on edit
    setSavedIds(prev => { const s = new Set(prev); s.delete(id); return s; });
    setErrorIds(prev => { const s = new Set(prev); s.delete(id); return s; });
  }

  async function handleSave(row: PricingRow) {
    const edit = editState[row.id];
    if (!edit) return;
    try {
      await updateMutation.mutateAsync({
        id: row.id,
        pricePerUnitMin: parseFloat(edit.pricePerUnitMin),
        pricePerUnitMax: parseFloat(edit.pricePerUnitMax),
        minimumPrice: parseFloat(edit.minimumPrice),
        discountFrom10: parseFloat(edit.discountFrom10) / 100,
        discountFrom50: parseFloat(edit.discountFrom50) / 100,
        noteDe: edit.noteDe || null,
        noteEn: edit.noteEn || null,
      });
      setSavedIds(prev => { const s = new Set(prev); s.add(row.id); return s; });
      await refetch();
    } catch {
      setErrorIds(prev => { const s = new Set(prev); s.add(row.id); return s; });
    }
  }

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-400">{isDe ? 'Preise werden geladen…' : 'Loading prices…'}</p>
        </div>
      </PageLayout>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <Lock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">
            {isDe
              ? 'Keine Preisdaten gefunden. Bitte als Administrator anmelden.'
              : 'No pricing data found. Please log in as administrator.'}
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Euro className="w-7 h-7 text-red-500" />
            <h1 className="text-3xl font-bold text-white">
              {isDe ? 'Preiskonfiguration' : 'Price Configuration'}
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            {isDe
              ? 'Richtwertpreise für den F3 Kalkulator. Alle Preise netto in Euro.'
              : 'Reference prices for the F3 Calculator. All prices net in euros.'}
          </p>
          <div className="mt-3 p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-yellow-300 text-xs">
              {isDe
                ? 'Diese Preise sind Richtwerte für den Kalkulator. Verbindliche Angebote werden nach Erhalt der CAD-Daten erstellt.'
                : 'These prices are reference values for the calculator. Binding quotes are prepared after receiving CAD data.'}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="text-left px-4 py-3 text-gray-300 font-semibold min-w-[180px]">
                  {isDe ? 'Verfahren' : 'Process'}
                </th>
                <th className="text-left px-4 py-3 text-gray-300 font-semibold">
                  {isDe ? 'Einheit' : 'Unit'}
                </th>
                <th className="text-right px-4 py-3 text-gray-300 font-semibold min-w-[110px]">
                  {isDe ? 'Preis Min' : 'Price Min'}
                </th>
                <th className="text-right px-4 py-3 text-gray-300 font-semibold min-w-[110px]">
                  {isDe ? 'Preis Max' : 'Price Max'}
                </th>
                <th className="text-right px-4 py-3 text-gray-300 font-semibold min-w-[110px]">
                  {isDe ? 'Mindestpreis' : 'Min. Price'}
                </th>
                <th className="text-right px-4 py-3 text-gray-300 font-semibold min-w-[90px]">
                  <span className="flex items-center justify-end gap-1">
                    <Percent className="w-3 h-3" />
                    {isDe ? 'Rabatt 10+' : 'Disc. 10+'}
                  </span>
                </th>
                <th className="text-right px-4 py-3 text-gray-300 font-semibold min-w-[90px]">
                  <span className="flex items-center justify-end gap-1">
                    <Percent className="w-3 h-3" />
                    {isDe ? 'Rabatt 50+' : 'Disc. 50+'}
                  </span>
                </th>
                <th className="text-left px-4 py-3 text-gray-300 font-semibold min-w-[160px]">
                  {isDe ? 'Hinweis (DE)' : 'Note (DE)'}
                </th>
                <th className="px-4 py-3 text-gray-300 font-semibold w-[80px]">
                  {isDe ? 'Aktion' : 'Action'}
                </th>
              </tr>
            </thead>
            <tbody>
              {(rows as PricingRow[]).map((row, idx) => {
                const isSaved = savedIds.has(row.id);
                const isError = errorIds.has(row.id);
                const hasChanges = !!editState[row.id];
                const unitLabel = UNIT_LABELS[row.unit]?.[isDe ? 'de' : 'en'] ?? row.unit;

                return (
                  <tr
                    key={row.id}
                    className={`border-b border-white/5 transition-colors ${
                      idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                    } ${isSaved ? 'bg-green-900/10' : ''} ${isError ? 'bg-red-900/10' : ''}`}
                  >
                    {/* Process Name */}
                    <td className="px-4 py-3">
                      <div className="font-medium text-white text-xs">
                        {isDe ? row.labelDe : row.labelEn}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">{row.processKey}</div>
                    </td>

                    {/* Unit */}
                    <td className="px-4 py-3">
                      <span className="text-gray-400 text-xs bg-white/5 px-2 py-0.5 rounded">
                        {unitLabel}
                      </span>
                    </td>

                    {/* Price Min */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-gray-500 text-xs">€</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={getEditValue(row, 'pricePerUnitMin')}
                          onChange={e => handleChange(row.id, 'pricePerUnitMin', e.target.value)}
                          className="w-20 text-right bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-red-500/50 focus:bg-white/10"
                        />
                      </div>
                    </td>

                    {/* Price Max */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-gray-500 text-xs">€</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={getEditValue(row, 'pricePerUnitMax')}
                          onChange={e => handleChange(row.id, 'pricePerUnitMax', e.target.value)}
                          className="w-20 text-right bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-red-500/50 focus:bg-white/10"
                        />
                      </div>
                    </td>

                    {/* Minimum Price */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-gray-500 text-xs">€</span>
                        <input
                          type="number"
                          step="0.50"
                          min="0"
                          value={getEditValue(row, 'minimumPrice')}
                          onChange={e => handleChange(row.id, 'minimumPrice', e.target.value)}
                          className="w-20 text-right bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-red-500/50 focus:bg-white/10"
                        />
                      </div>
                    </td>

                    {/* Discount 10+ */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <input
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          value={
                            editState[row.id]?.discountFrom10 !== undefined
                              ? editState[row.id].discountFrom10
                              : String(Math.round(parseFloat(row.discountFrom10) * 100))
                          }
                          onChange={e => handleChange(row.id, 'discountFrom10', e.target.value)}
                          className="w-16 text-right bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-red-500/50 focus:bg-white/10"
                        />
                        <span className="text-gray-500 text-xs">%</span>
                      </div>
                    </td>

                    {/* Discount 50+ */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <input
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          value={
                            editState[row.id]?.discountFrom50 !== undefined
                              ? editState[row.id].discountFrom50
                              : String(Math.round(parseFloat(row.discountFrom50) * 100))
                          }
                          onChange={e => handleChange(row.id, 'discountFrom50', e.target.value)}
                          className="w-16 text-right bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-red-500/50 focus:bg-white/10"
                        />
                        <span className="text-gray-500 text-xs">%</span>
                      </div>
                    </td>

                    {/* Note DE */}
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder={isDe ? 'Hinweis…' : 'Note…'}
                        value={getEditValue(row, 'noteDe')}
                        onChange={e => handleChange(row.id, 'noteDe', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-red-500/50 focus:bg-white/10 placeholder-gray-600"
                      />
                    </td>

                    {/* Save Button */}
                    <td className="px-4 py-3 text-center">
                      {isSaved ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                      ) : isError ? (
                        <AlertCircle className="w-5 h-5 text-red-400 mx-auto" />
                      ) : (
                        <button
                          onClick={() => handleSave(row)}
                          disabled={!hasChanges || updateMutation.isPending}
                          className={`p-1.5 rounded transition-colors ${
                            hasChanges
                              ? 'bg-red-600 hover:bg-red-500 text-white cursor-pointer'
                              : 'bg-white/5 text-gray-600 cursor-not-allowed'
                          }`}
                          title={isDe ? 'Speichern' : 'Save'}
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
          <span>
            {isDe
              ? `${rows.length} Verfahren konfiguriert`
              : `${rows.length} processes configured`}
          </span>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1 hover:text-gray-300 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            {isDe ? 'Aktualisieren' : 'Refresh'}
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
