import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import { Mail } from 'lucide-react';

const materials = [
  { name: 'PLA', process: 'FDM', props: ['Biologisch abbaubar', 'Einfach zu drucken', 'Für Prototypen'], propsEn: ['Biodegradable', 'Easy to print', 'For prototypes'], temp: '60°C', density: '1,24 g/cm³', color: '#4CAF50' },
  { name: 'PETG', process: 'FDM', props: ['Chemikalienbeständig', 'Zäh', 'Lebensmittelecht möglich'], propsEn: ['Chemical resistant', 'Tough', 'Food-safe possible'], temp: '80°C', density: '1,27 g/cm³', color: '#2196F3' },
  { name: 'ABS', process: 'FDM', props: ['Hitzebeständig', 'Schlagzäh', 'Nachbearbeitbar'], propsEn: ['Heat resistant', 'Impact resistant', 'Post-processable'], temp: '100°C', density: '1,05 g/cm³', color: '#FF9800' },
  { name: 'ASA', process: 'FDM', props: ['UV-beständig', 'Witterungsfest', 'Außenanwendungen'], propsEn: ['UV resistant', 'Weatherproof', 'Outdoor applications'], temp: '95°C', density: '1,07 g/cm³', color: '#9C27B0' },
  { name: 'TPU', process: 'FDM', props: ['Flexibel', 'Gummiartig', 'Dichtungen'], propsEn: ['Flexible', 'Rubber-like', 'Seals'], temp: '80°C', density: '1,21 g/cm³', color: '#F44336' },
  { name: 'PA6 + Kohlefaser', process: 'Endlosfaser FDM', props: ['Höchste Festigkeit', 'Leichtbau', 'Strukturbauteile'], propsEn: ['Highest strength', 'Lightweight', 'Structural components'], temp: '150°C', density: '1,4 g/cm³', color: '#1a1a1a' },
  { name: 'PA6 + Glasfaser', process: 'Endlosfaser FDM', props: ['Elektrisch isolierend', 'Chemikalienbeständig', 'Preis-Leistung'], propsEn: ['Electrically insulating', 'Chemical resistant', 'Price-performance'], temp: '130°C', density: '1,6 g/cm³', color: '#4a90d9' },
  { name: 'PA6 + Kevlar', process: 'Endlosfaser FDM', props: ['Schlagzäh', 'Flexibel', 'Schnittfest'], propsEn: ['Impact resistant', 'Flexible', 'Cut-resistant'], temp: '130°C', density: '1,3 g/cm³', color: '#f5a623' },
  { name: 'Standard Resin', process: 'SLA', props: ['Glatte Oberfläche', 'Hohe Detailgenauigkeit', 'Prototypen'], propsEn: ['Smooth surface', 'High detail accuracy', 'Prototypes'], temp: '60°C', density: '1,18 g/cm³', color: '#607D8B' },
  { name: 'ABS-like Resin', process: 'SLA', props: ['Schlagzäh', 'Funktionsteile', 'Gute Mechanik'], propsEn: ['Impact resistant', 'Functional parts', 'Good mechanics'], temp: '70°C', density: '1,17 g/cm³', color: '#795548' },
  { name: 'Castable Resin', process: 'SLA/DLP', props: ['Ausbrennbar', 'Schmuckguss', 'Metallguss'], propsEn: ['Burnout', 'Jewelry casting', 'Metal casting'], temp: '–', density: '1,15 g/cm³', color: '#FFD700' },
  { name: 'Dental Resin', process: 'SLA/DLP', props: ['Biokompatibel', 'Zahntechnik', 'Präzise'], propsEn: ['Biocompatible', 'Dental', 'Precise'], temp: '–', density: '1,17 g/cm³', color: '#E0E0E0' },
  { name: 'PA12', process: 'SLS/MJF', props: ['Serientauglich', 'Chemikalienbeständig', 'Keine Stützen'], propsEn: ['Series suitable', 'Chemical resistant', 'No supports'], temp: '150°C', density: '1,01 g/cm³', color: '#78909C' },
  { name: 'PA11', process: 'SLS/MJF', props: ['Biobasiert', 'Schlagzäh', 'Flexibel'], propsEn: ['Bio-based', 'Impact resistant', 'Flexible'], temp: '140°C', density: '1,03 g/cm³', color: '#26A69A' },
  { name: 'PA12 GB', process: 'MJF', props: ['Glasgefüllt', 'Steif', 'Wärmebeständig'], propsEn: ['Glass-filled', 'Stiff', 'Heat resistant'], temp: '175°C', density: '1,22 g/cm³', color: '#546E7A' },
  { name: 'TPU (MJF)', process: 'MJF', props: ['Flexibel', 'Elastisch', 'Dichtungen'], propsEn: ['Flexible', 'Elastic', 'Seals'], temp: '90°C', density: '1,2 g/cm³', color: '#EF5350' },
  { name: 'Quarzsand', process: 'Sanddruck', props: ['Für Gießformen', 'Keine Werkzeugkosten', 'Hinterschneidungen'], propsEn: ['For casting molds', 'No tooling costs', 'Undercuts'], temp: '–', density: '–', color: '#D4A017' },
  { name: 'Rigid (Polyjet)', process: 'Polyjet', props: ['Hart', 'Detailreich', 'Mehrfarbig'], propsEn: ['Hard', 'Detailed', 'Multi-color'], temp: '50°C', density: '1,17 g/cm³', color: '#42A5F5' },
  { name: 'Flexible (Polyjet)', process: 'Polyjet', props: ['Gummiartig', 'Shore A 27–95', 'Dichtungen'], propsEn: ['Rubber-like', 'Shore A 27–95', 'Seals'], temp: '–', density: '1,12 g/cm³', color: '#66BB6A' },
];

const processes = ['Alle', 'FDM', 'Endlosfaser FDM', 'SLA', 'SLA/DLP', 'DLP', 'SLS', 'SLS/MJF', 'MJF', 'Sanddruck', 'Polyjet'];

export default function Materialien() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState('Alle');
  const [search, setSearch] = useState('');

  const filtered = materials.filter((m) => {
    const matchProcess = filter === 'Alle' || m.process === filter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.process.toLowerCase().includes(search.toLowerCase());
    return matchProcess && matchSearch;
  });

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="py-16 md:py-24 text-white"
        style={{ background: 'linear-gradient(135deg, var(--fabrica-anthrazit) 0%, oklch(30% 0.05 260) 100%)' }}
      >
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t('Materialien', 'Materials')}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {t('Alle verfügbaren Materialien aller Technologien im Überblick – filterbar nach Verfahren und Eigenschaften.', 'All available materials for all technologies at a glance – filterable by process and properties.')}
          </p>
        </div>
      </section>

      <div className="container py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder={t('Material suchen...', 'Search material...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': 'var(--fabrica-red)' } as React.CSSProperties}
          />
          <div className="flex flex-wrap gap-2">
            {processes.map((p) => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${filter === p ? 'text-white border-transparent' : 'text-gray-600 hover:border-gray-400'}`}
                style={filter === p ? { backgroundColor: 'var(--fabrica-red)', borderColor: 'var(--fabrica-red)' } : {}}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead>
              <tr>
                <th>{t('Material', 'Material')}</th>
                <th>{t('Verfahren', 'Process')}</th>
                <th>{t('Eigenschaften', 'Properties')}</th>
                <th>{t('Wärmeform.', 'Heat Defl.')}</th>
                <th>{t('Dichte', 'Density')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.name + m.process}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                      <span className="font-semibold text-sm">{m.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ backgroundColor: 'var(--fabrica-gray)', color: 'var(--fabrica-anthrazit)' }}>
                      {m.process}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {(lang === 'en' ? m.propsEn : m.props).map((p) => (
                        <span key={p} className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="text-sm text-gray-600">{m.temp}</td>
                  <td className="text-sm text-gray-600">{m.density}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            {t('Keine Materialien gefunden.', 'No materials found.')}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 p-8 rounded-xl text-white text-center" style={{ backgroundColor: 'var(--fabrica-red)' }}>
          <h2 className="text-xl font-bold mb-2">{t('Unsicher welches Material passt?', 'Unsure which material fits?')}</h2>
          <p className="text-white/80 mb-4 text-sm">{t('Wir beraten Sie kostenlos und empfehlen das optimale Material für Ihre Anforderungen.', 'We advise you free of charge and recommend the optimal material for your requirements.')}</p>
          <a href="mailto:kontakt@fabrica3d.eu?subject=Materialberatung" className="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded" style={{ color: 'var(--fabrica-red)' }}>
            <Mail size={16} />
            {t('Materialberatung anfragen', 'Request Material Advice')}
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
