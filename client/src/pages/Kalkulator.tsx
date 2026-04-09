import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageMeta } from '@/hooks/usePageMeta';
import PageLayout from '@/components/PageLayout';
import { trpc } from '@/lib/trpc';
import {
  Calculator, ChevronRight, AlertTriangle, CheckCircle,
  Clock, Euro, Zap, Info, Mail, RotateCcw, TrendingUp
} from 'lucide-react';

const PROCESSES_DE = [
  { group: '3D-Druck', options: [
    'FDM-Druck (Standard)',
    'FDM-Druck mit Endlosfaser (Carbon/Glasfaser/Kevlar)',
    'SLA-Druck (Stereolithografie)',
    'DLP-Druck (Digital Light Processing)',
    'SLS-Druck (Selektives Lasersintern)',
    'MJF-Druck (Multi Jet Fusion)',
    'Sanddruck (Binder Jetting)',
    'Polyjet-Druck',
  ]},
  { group: 'CNC-Bearbeitung', options: [
    'CNC-Fräsen',
    'CNC-Drehen',
    'Wasserschneiden',
    'Laserschneiden',
  ]},
  { group: 'CAD & Scan', options: [
    'CAD-Konstruktion',
    '3D-Scan (GOM ATOS)',
    'Reverse Engineering',
  ]},
];

const PROCESSES_EN = [
  { group: '3D Printing', options: [
    'FDM Printing (Standard)',
    'FDM Printing with Continuous Fiber (Carbon/Fiberglass/Kevlar)',
    'SLA Printing (Stereolithography)',
    'DLP Printing (Digital Light Processing)',
    'SLS Printing (Selective Laser Sintering)',
    'MJF Printing (Multi Jet Fusion)',
    'Sand Printing (Binder Jetting)',
    'Polyjet Printing',
  ]},
  { group: 'CNC Machining', options: [
    'CNC Milling',
    'CNC Turning',
    'Water Jet Cutting',
    'Laser Cutting',
  ]},
  { group: 'CAD & Scan', options: [
    'CAD Engineering',
    '3D Scan (GOM ATOS)',
    'Reverse Engineering',
  ]},
];

const MATERIALS_BY_PROCESS: Record<string, string[]> = {
  'FDM-Druck (Standard)': ['PLA', 'PETG', 'ABS', 'ASA', 'TPU (flexibel)', 'Nylon (PA12)', 'PC (Polycarbonat)', 'PLA-CF (Carbon)', 'PETG-CF (Carbon)'],
  'FDM Printing (Standard)': ['PLA', 'PETG', 'ABS', 'ASA', 'TPU (flexible)', 'Nylon (PA12)', 'PC (Polycarbonate)', 'PLA-CF (Carbon)', 'PETG-CF (Carbon)'],
  'FDM-Druck mit Endlosfaser (Carbon/Glasfaser/Kevlar)': ['Nylon + Endlos-Carbon', 'Nylon + Endlos-Glasfaser', 'Nylon + Endlos-Kevlar', 'PETG + Endlos-Carbon'],
  'FDM Printing with Continuous Fiber (Carbon/Fiberglass/Kevlar)': ['Nylon + Continuous Carbon', 'Nylon + Continuous Fiberglass', 'Nylon + Continuous Kevlar', 'PETG + Continuous Carbon'],
  'SLA-Druck (Stereolithografie)': ['Standard Resin', 'Tough Resin', 'Flexible Resin', 'Castable Resin', 'High-Temp Resin', 'Dental Resin'],
  'SLA Printing (Stereolithography)': ['Standard Resin', 'Tough Resin', 'Flexible Resin', 'Castable Resin', 'High-Temp Resin', 'Dental Resin'],
  'DLP-Druck (Digital Light Processing)': ['Standard Resin', 'Engineering Resin', 'Flexible Resin', 'High-Detail Resin'],
  'DLP Printing (Digital Light Processing)': ['Standard Resin', 'Engineering Resin', 'Flexible Resin', 'High-Detail Resin'],
  'SLS-Druck (Selektives Lasersintern)': ['PA12 (Nylon)', 'PA11', 'PA12-GF (Glasfaser)', 'TPU', 'PP (Polypropylen)'],
  'SLS Printing (Selective Laser Sintering)': ['PA12 (Nylon)', 'PA11', 'PA12-GF (Fiberglass)', 'TPU', 'PP (Polypropylene)'],
  'MJF-Druck (Multi Jet Fusion)': ['PA12 (Nylon)', 'PA12-CB (Carbon Black)', 'TPU', 'PA11'],
  'MJF Printing (Multi Jet Fusion)': ['PA12 (Nylon)', 'PA12-CB (Carbon Black)', 'TPU', 'PA11'],
  'Sanddruck (Binder Jetting)': ['Quarzsand (unbeschichtet)', 'Quarzsand (infiltriert)', 'Chromsand'],
  'Sand Printing (Binder Jetting)': ['Quartz Sand (uncoated)', 'Quartz Sand (infiltrated)', 'Chrome Sand'],
  'Polyjet-Druck': ['VeroWhite', 'VeroBlack', 'VeroClear (transparent)', 'Agilus (flexibel)', 'Digital ABS', 'Mehrfarbig'],
  'Polyjet Printing': ['VeroWhite', 'VeroBlack', 'VeroClear (transparent)', 'Agilus (flexible)', 'Digital ABS', 'Multi-color'],
  'CNC-Fräsen': ['Aluminium', 'Stahl', 'Edelstahl', 'Messing', 'Kupfer', 'POM', 'HDPE', 'PP', 'Acrylglas (PMMA)', 'Holz/MDF'],
  'CNC Milling': ['Aluminium', 'Steel', 'Stainless Steel', 'Brass', 'Copper', 'POM', 'HDPE', 'PP', 'Acrylic (PMMA)', 'Wood/MDF'],
  'CNC-Drehen': ['Aluminium', 'Stahl', 'Edelstahl', 'Messing', 'Kupfer', 'Titan', 'POM', 'HDPE'],
  'CNC Turning': ['Aluminium', 'Steel', 'Stainless Steel', 'Brass', 'Copper', 'Titanium', 'POM', 'HDPE'],
  'Wasserschneiden': ['Stahl bis 200mm', 'Aluminium bis 200mm', 'Edelstahl bis 150mm', 'Glas', 'Stein/Marmor', 'Kunststoff', 'Verbundwerkstoffe'],
  'Water Jet Cutting': ['Steel up to 200mm', 'Aluminium up to 200mm', 'Stainless Steel up to 150mm', 'Glass', 'Stone/Marble', 'Plastic', 'Composites'],
  'Laserschneiden': ['Stahl bis 25mm', 'Edelstahl bis 20mm', 'Aluminium bis 15mm', 'Acrylglas', 'Holz/MDF', 'Karton/Pappe'],
  'Laser Cutting': ['Steel up to 25mm', 'Stainless Steel up to 20mm', 'Aluminium up to 15mm', 'Acrylic', 'Wood/MDF', 'Cardboard'],
  'CAD-Konstruktion': ['Nicht zutreffend (Dienstleistung)'],
  'CAD Engineering': ['Not applicable (service)'],
  '3D-Scan (GOM ATOS)': ['Nicht zutreffend (Dienstleistung)'],
  '3D Scan (GOM ATOS)': ['Not applicable (service)'],
  'Reverse Engineering': ['Nicht zutreffend (Dienstleistung)'],
};

const POST_PROCESSING_DE = ['Sandstrahlen', 'Lackieren', 'Einfärben', 'Polieren', 'Gewindeschneiden', 'Wärmebehandlung', 'Grundierung'];
const POST_PROCESSING_EN = ['Sandblasting', 'Painting', 'Dyeing', 'Polishing', 'Thread cutting', 'Heat treatment', 'Priming'];

interface FormState {
  process: string;
  material: string;
  quantity: number;
  sizeX: string;
  sizeY: string;
  sizeZ: string;
  volumeCm3: string;
  quality: 'draft' | 'standard' | 'fine' | 'ultra';
  infillPercent: string;
  postProcessing: string[];
  description: string;
  inputMode: 'dimensions' | 'volume';
}

const defaultForm: FormState = {
  process: '',
  material: '',
  quantity: 1,
  sizeX: '',
  sizeY: '',
  sizeZ: '',
  volumeCm3: '',
  quality: 'standard',
  infillPercent: '20',
  postProcessing: [],
  description: '',
  inputMode: 'dimensions',
};

function ConfidenceBadge({ level, lang }: { level: 'low' | 'medium' | 'high'; lang: string }) {
  const labels: Record<string, Record<string, string>> = {
    low: { de: 'Geringe Genauigkeit', en: 'Low Confidence' },
    medium: { de: 'Mittlere Genauigkeit', en: 'Medium Confidence' },
    high: { de: 'Hohe Genauigkeit', en: 'High Confidence' },
  };
  const colors = {
    low: 'bg-amber-100 text-amber-800 border-amber-200',
    medium: 'bg-blue-100 text-blue-800 border-blue-200',
    high: 'bg-green-100 text-green-800 border-green-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border ${colors[level]}`}>
      <TrendingUp size={12} />
      {labels[level][lang] ?? labels[level]['de']}
    </span>
  );
}

export default function Kalkulator() {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState<FormState>(defaultForm);
  const [result, setResult] = useState<null | {
    costMin: number; costMax: number; currency: string;
    deliveryDays: number; deliveryDaysMax: number;
    confidence: 'low' | 'medium' | 'high';
    summary: string;
    breakdown: Array<{ label: string; value: string }>;
    recommendations: string[];
    warnings: string[];
    disclaimer: string;
  }>(null);

  usePageMeta({
    titleDe: 'F3 Kalkulator – Kostenabschätzung für 3D-Druck & CNC',
    titleEn: 'F3 Calculator – Cost Estimate for 3D Printing & CNC',
    descriptionDe: 'Erhalten Sie sofort eine präzise Kostenschätzung durch System F3 für Ihr 3D-Druck- oder CNC-Projekt. Geben Sie Verfahren, Material und Abmessungen ein.',
    descriptionEn: 'Get an instant precise cost estimate via F3 system for your 3D printing or CNC project. Enter process, material and dimensions.',
    canonical: '/kalkulator',
  });

  const estimateMutation = trpc.calculator.estimate.useMutation({
    onSuccess: (data) => setResult(data),
  });

  const processes = lang === 'en' ? PROCESSES_EN : PROCESSES_DE;
  const postProcessingOptions = lang === 'en' ? POST_PROCESSING_EN : POST_PROCESSING_DE;
  const materials = form.process ? (MATERIALS_BY_PROCESS[form.process] ?? []) : [];

  const isFDM = form.process.toLowerCase().includes('fdm');
  const isService = form.process.includes('CAD') || form.process.includes('Scan') || form.process.includes('Reverse');

  const handleProcessChange = (value: string) => {
    setForm(f => ({ ...f, process: value, material: '' }));
    setResult(null);
  };

  const togglePostProcessing = (item: string) => {
    setForm(f => ({
      ...f,
      postProcessing: f.postProcessing.includes(item)
        ? f.postProcessing.filter(p => p !== item)
        : [...f.postProcessing, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.process || !form.material) return;

    const input: Parameters<typeof estimateMutation.mutate>[0] = {
      process: form.process,
      material: form.material,
      quantity: form.quantity,
      quality: form.quality,
      lang: lang as 'de' | 'en',
      postProcessing: form.postProcessing,
      description: form.description || undefined,
    };

    if (form.inputMode === 'volume' && form.volumeCm3) {
      input.volumeCm3 = parseFloat(form.volumeCm3);
    } else if (form.sizeX && form.sizeY && form.sizeZ) {
      input.sizeX = parseFloat(form.sizeX);
      input.sizeY = parseFloat(form.sizeY);
      input.sizeZ = parseFloat(form.sizeZ);
    }

    if (isFDM && form.infillPercent) {
      input.infillPercent = parseInt(form.infillPercent);
    }

    estimateMutation.mutate(input);
  };

  const reset = () => {
    setForm(defaultForm);
    setResult(null);
    estimateMutation.reset();
  };

  const mailtoLink = result
    ? `mailto:kontakt@fabrica3d.eu?subject=${encodeURIComponent(
        t('Verbindliches Angebot: ', 'Binding Quote: ') + form.process
      )}&body=${encodeURIComponent(
        t(
          `Guten Tag,\n\nbitte erstellen Sie mir ein verbindliches Angebot für:\n\nVerfahren: ${form.process}\nMaterial: ${form.material}\nMenge: ${form.quantity} Stück\nGeschätzte Kosten: ${result.costMin}–${result.costMax} €\n\nMit freundlichen Grüßen`,
          `Dear Fabrica team,\n\nPlease provide a binding quote for:\n\nProcess: ${form.process}\nMaterial: ${form.material}\nQuantity: ${form.quantity} pcs\nEstimated cost: €${result.costMin}–${result.costMax}\n\nKind regards`
        )
      )}`
    : 'mailto:kontakt@fabrica3d.eu';

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="py-14 md:py-20 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, var(--fabrica-anthrazit) 100%)' }}
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }} />
        <div className="container relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--fabrica-red)' }}>
              <Calculator size={24} className="text-white" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-white/60">
              {t('System F3', 'System F3')}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t('Projekt-Kalkulator', 'Project Calculator')}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            {t(
              'Erhalten Sie in Sekunden eine präzise Kostenschätzung für Ihr 3D-Druck- oder CNC-Projekt. Geben Sie Ihre Parameter ein – unser System F3 kalkuliert einen realistischen Preisrahmen.',
              'Get a precise cost estimate for your 3D printing or CNC project in seconds. Enter your parameters – our F3 system calculates a realistic price range.'
            )}
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-yellow-400" /> {t('Sofortige Schätzung', 'Instant estimate')}</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> {t('Alle Verfahren', 'All processes')}</span>
            <span className="flex items-center gap-1.5"><Info size={14} className="text-blue-400" /> {t('Unverbindlich', 'Non-binding')}</span>
          </div>
        </div>
      </section>

      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Process Selection */}
              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  1. {t('Fertigungsverfahren', 'Manufacturing Process')}
                </h2>
                <div className="space-y-3">
                  {processes.map(group => (
                    <div key={group.group}>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{group.group}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.options.map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleProcessChange(opt)}
                            className={`text-left px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                              form.process === opt
                                ? 'border-transparent text-white'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            style={form.process === opt ? { backgroundColor: 'var(--fabrica-red)', borderColor: 'var(--fabrica-red)' } : {}}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material */}
              {form.process && (
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    2. {t('Material', 'Material')}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {materials.map(mat => (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => { setForm(f => ({ ...f, material: mat })); setResult(null); }}
                        className={`text-left px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                          form.material === mat
                            ? 'border-transparent text-white'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        style={form.material === mat ? { backgroundColor: 'var(--fabrica-anthrazit)' } : {}}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions / Volume */}
              {form.process && !isService && (
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    3. {t('Abmessungen & Menge', 'Dimensions & Quantity')}
                  </h2>

                  {/* Input mode toggle */}
                  <div className="flex gap-2 mb-5">
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, inputMode: 'dimensions' }))}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition-colors ${
                        form.inputMode === 'dimensions' ? 'text-white border-transparent' : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                      style={form.inputMode === 'dimensions' ? { backgroundColor: 'var(--fabrica-anthrazit)' } : {}}
                    >
                      {t('Abmessungen (mm)', 'Dimensions (mm)')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, inputMode: 'volume' }))}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition-colors ${
                        form.inputMode === 'volume' ? 'text-white border-transparent' : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                      style={form.inputMode === 'volume' ? { backgroundColor: 'var(--fabrica-anthrazit)' } : {}}
                    >
                      {t('Volumen (cm³)', 'Volume (cm³)')}
                    </button>
                  </div>

                  {form.inputMode === 'dimensions' ? (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {(['sizeX', 'sizeY', 'sizeZ'] as const).map((dim, i) => (
                        <div key={dim}>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            {['X', 'Y', 'Z'][i]} {t('(mm)', '(mm)')}
                          </label>
                          <input
                            type="number"
                            min="0.1"
                            max="2000"
                            step="0.1"
                            value={form[dim]}
                            onChange={e => setForm(f => ({ ...f, [dim]: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                            style={{ '--tw-ring-color': 'var(--fabrica-red)' } as React.CSSProperties}
                            placeholder="0"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">
                        {t('Bauteilvolumen (cm³)', 'Part volume (cm³)')}
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        max="100000"
                        step="0.1"
                        value={form.volumeCm3}
                        onChange={e => setForm(f => ({ ...f, volumeCm3: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                        placeholder="z.B. 25.5"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        {t('Tipp: In CAD-Software unter Eigenschaften/Massenträgheit ablesbar', 'Tip: Readable in CAD software under Properties/Mass Properties')}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">
                        {t('Menge (Stück)', 'Quantity (pcs)')}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10000"
                        value={form.quantity}
                        onChange={e => setForm(f => ({ ...f, quantity: parseInt(e.target.value) || 1 }))}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                      />
                    </div>
                    {isFDM && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">
                          {t('Infill (%)', 'Infill (%)')}
                        </label>
                        <input
                          type="number"
                          min="5"
                          max="100"
                          step="5"
                          value={form.infillPercent}
                          onChange={e => setForm(f => ({ ...f, infillPercent: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quality */}
              {form.process && (
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    {isService ? '3.' : '4.'} {t('Qualität / Auflösung', 'Quality / Resolution')}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {([
                      { key: 'draft', de: 'Entwurf', en: 'Draft', sub: '±0.5mm' },
                      { key: 'standard', de: 'Standard', en: 'Standard', sub: '±0.2mm' },
                      { key: 'fine', de: 'Fein', en: 'Fine', sub: '±0.1mm' },
                      { key: 'ultra', de: 'Ultra-fein', en: 'Ultra-fine', sub: '±0.05mm' },
                    ] as const).map(q => (
                      <button
                        key={q.key}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, quality: q.key }))}
                        className={`text-center px-3 py-3 rounded-lg border transition-all ${
                          form.quality === q.key
                            ? 'border-transparent text-white'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        style={form.quality === q.key ? { backgroundColor: 'var(--fabrica-red)' } : {}}
                      >
                        <div className="font-semibold text-sm">{lang === 'en' ? q.en : q.de}</div>
                        <div className={`text-xs mt-0.5 ${form.quality === q.key ? 'text-white/70' : 'text-gray-400'}`}>{q.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Post-processing */}
              {form.process && !isService && (
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    5. {t('Nachbearbeitung (optional)', 'Post-processing (optional)')}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {postProcessingOptions.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => togglePostProcessing(opt)}
                        className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                          form.postProcessing.includes(opt)
                            ? 'border-transparent text-white'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                        style={form.postProcessing.includes(opt) ? { backgroundColor: 'var(--fabrica-red)' } : {}}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {form.process && (
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    {isService ? '4.' : '6.'} {t('Projektbeschreibung (optional)', 'Project description (optional)')}
                  </h2>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    maxLength={1000}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 resize-none"
                    placeholder={t(
                      'Beschreiben Sie Ihr Projekt, besondere Anforderungen, Toleranzen, Einsatzbereich...',
                      'Describe your project, special requirements, tolerances, application area...'
                    )}
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{form.description.length}/1000</p>
                </div>
              )}

              {/* Submit */}
              {form.process && form.material && (
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={estimateMutation.isPending}
                    className="flex-1 flex items-center justify-center gap-2 py-4 text-base font-bold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: 'var(--fabrica-red)' }}
                  >
                    {estimateMutation.isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('F3 kalkuliert gerade für Sie…', 'F3 is calculating for you…')}
                      </>
                    ) : (
                      <>
                        <Calculator size={20} />
                        {t('Kosten schätzen', 'Estimate Costs')}
                      </>
                    )}
                  </button>
                  {(result || estimateMutation.isError) && (
                    <button
                      type="button"
                      onClick={reset}
                      className="px-4 py-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                      title={t('Zurücksetzen', 'Reset')}
                    >
                      <RotateCcw size={20} />
                    </button>
                  )}
                </div>
              )}

              {estimateMutation.isError && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{t('Fehler bei der Berechnung', 'Calculation error')}</p>
                    <p className="text-red-600 mt-0.5">{t('Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.', 'Please try again or contact us directly.')}</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              {!result && !estimateMutation.isPending && (
                <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
                  <Calculator size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="font-semibold text-gray-500 mb-2">
                    {t('Ihre Schätzung erscheint hier', 'Your estimate will appear here')}
                  </p>
                  <p className="text-sm text-gray-400">
                    {t('Wählen Sie Verfahren, Material und Abmessungen aus, um eine Schätzung durch System F3 zu erhalten.', 'Select process, material and dimensions to get an F3 system estimate.')}
                  </p>
                </div>
              )}

              {estimateMutation.isPending && (
                <div className="bg-white rounded-xl border p-8 text-center shadow-sm">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--fabrica-gray)' }}>
                    <div className="w-8 h-8 border-3 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: 'var(--fabrica-red)', borderWidth: '3px' }} />
                  </div>
                  <p className="font-semibold text-gray-700 mb-1">{t('System F3 analysiert Ihr Projekt…', 'System F3 is analysing your project…')}</p>
                  <p className="text-sm text-gray-400">{t('Das dauert nur wenige Sekunden.', 'This only takes a few seconds.')}</p>
                </div>
              )}

              {result && (
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                  {/* Cost header */}
                  <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg, var(--fabrica-anthrazit) 0%, #1a1a2e 100%)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-white/70 uppercase tracking-wide">
                        {t('Geschätzte Kosten (Netto)', 'Estimated Cost (Net)')}
                      </span>
                      <ConfidenceBadge level={result.confidence} lang={lang} />
                    </div>
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-4xl font-bold">
                        {result.costMin.toLocaleString('de-DE')} – {result.costMax.toLocaleString('de-DE')}
                      </span>
                      <span className="text-2xl font-bold text-white/80 mb-0.5">€</span>
                    </div>
                    <p className="text-sm text-white/60">
                      {t('zzgl. 19% MwSt.', 'excl. 19% VAT')}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-white/70">
                      <Clock size={14} />
                      <span>
                        {t('Lieferzeit: ', 'Delivery: ')}
                        <strong className="text-white">{result.deliveryDays}–{result.deliveryDaysMax} {t('Werktage', 'business days')}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Summary */}
                    <p className="text-sm text-gray-600 leading-relaxed">{result.summary}</p>

                    {/* Breakdown */}
                    {result.breakdown.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          {t('Kostenaufschlüsselung', 'Cost Breakdown')}
                        </h3>
                        <div className="space-y-1.5">
                          {result.breakdown.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-100 last:border-0">
                              <span className="text-gray-600">{item.label}</span>
                              <span className="font-semibold text-gray-800">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          {t('Empfehlungen', 'Recommendations')}
                        </h3>
                        <ul className="space-y-1.5">
                          {result.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--fabrica-red)' }} />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Warnings */}
                    {result.warnings.length > 0 && (
                      <div className="bg-amber-50 rounded-lg p-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1">
                          <AlertTriangle size={12} /> {t('Hinweise', 'Notes')}
                        </h3>
                        <ul className="space-y-1">
                          {result.warnings.map((w, i) => (
                            <li key={i} className="text-sm text-amber-700">{w}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <p className="text-xs text-gray-400 leading-relaxed border-t pt-4">{result.disclaimer}</p>

                    {/* CTA */}
                    <a
                      href={mailtoLink}
                      className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90"
                      style={{ backgroundColor: 'var(--fabrica-red)' }}
                    >
                      <Mail size={16} />
                      {t('Verbindliches Angebot anfordern', 'Request Binding Quote')}
                    </a>
                    <a
                      href="/upload"
                      className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronRight size={16} />
                      {t('CAD-Datei hochladen', 'Upload CAD File')}
                    </a>
                  </div>
                </div>
              )}

              {/* Info box */}
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-2">
                  <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-700 leading-relaxed">
                    <strong>{t('Hinweis: ', 'Note: ')}</strong>
                    {t(
                      'Diese Schätzung basiert auf typischen Marktpreisen und dient nur zur Orientierung. Für ein verbindliches Angebot laden Sie bitte Ihre CAD-Daten hoch oder kontaktieren Sie uns.',
                      'This estimate is based on typical market prices and is for guidance only. For a binding quote, please upload your CAD data or contact us.'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
