import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import { Mail, X, ChevronLeft, ChevronRight, SlidersHorizontal, RotateCcw } from 'lucide-react';

// ─── Typen ───────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  tech: string;
  material: string;
  materialEn: string;
  application: string;
  applicationEn: string;
  desc: string;
  descEn: string;
  image: string;
}

// ─── Projektdaten ─────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 1,
    title: 'Strukturbauteil Automotive',
    titleEn: 'Automotive Structural Part',
    category: '3D-Druck',
    categoryEn: '3D Printing',
    tech: 'Endlosfaser FDM',
    material: 'PA6 + Kohlefaser',
    materialEn: 'PA6 + Carbon Fiber',
    application: 'Automotive',
    applicationEn: 'Automotive',
    desc: 'Hochfeste Halterung für Fahrzeugchassis mit Endlosfaser-FDM. 65% Gewichtsreduktion gegenüber Aluminium bei gleicher Steifigkeit.',
    descEn: 'High-strength bracket for vehicle chassis with continuous fiber FDM. 65% weight reduction compared to aluminum at the same stiffness.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_fdm_black_lattice-8tq6nUhX9wXvBK7RWr3ATY.webp',
  },
  {
    id: 2,
    title: 'Reverse Engineering Ersatzteil',
    titleEn: 'Reverse Engineering Spare Part',
    category: 'CAD',
    categoryEn: 'CAD',
    tech: 'Reverse Engineering + FDM',
    material: 'PA12',
    materialEn: 'PA12',
    application: 'Maschinenbau',
    applicationEn: 'Mechanical Engineering',
    desc: 'Digitalisierung und Neukonstruktion eines veralteten Maschinenteils ohne vorhandene Zeichnung.',
    descEn: 'Digitization and reconstruction of an obsolete machine part without existing drawing.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj02_cad_reverse-nJgUqWy9BLUGZURCGLcq29.webp',
  },
  {
    id: 3,
    title: 'Maßprüfung Serienteil',
    titleEn: 'Series Part Inspection',
    category: '3D-Scan',
    categoryEn: '3D Scan',
    tech: 'GOM ATOS',
    material: 'Metall',
    materialEn: 'Metal',
    application: 'Qualitätssicherung',
    applicationEn: 'Quality Assurance',
    desc: 'Qualitätskontrolle von 500 Serienteilen mit GOM ATOS. Vollständige Prüfdokumentation mit Farbplot.',
    descEn: 'Quality control of 500 series parts with GOM ATOS. Complete inspection documentation with color plot.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj03_scan_turbine-mj5ThaoZrPBKCKZVC3zRkJ.webp',
  },
  {
    id: 4,
    title: 'Präzisionsfräsen Aluminium',
    titleEn: 'Precision Milling Aluminium',
    category: 'CNC',
    categoryEn: 'CNC',
    tech: '5-Achs-Fräsen',
    material: 'Aluminium 7075',
    materialEn: 'Aluminium 7075',
    application: 'Maschinenbau',
    applicationEn: 'Mechanical Engineering',
    desc: '5-Achs-Bearbeitung einer Maschinenbaukomponente mit Toleranz ±0,01 mm.',
    descEn: '5-axis machining of a mechanical engineering component with tolerance ±0.01 mm.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj08_cnc_aluminum-3E8NUciPpfpJgujgb9mvRf.webp',
  },
  {
    id: 5,
    title: 'Rekonstruktion Römerhelm',
    titleEn: 'Reconstruction Roman Helmet',
    category: 'Museum',
    categoryEn: 'Museum',
    tech: 'Polyjet + Handarbeit',
    material: 'Polyjet Rigid',
    materialEn: 'Polyjet Rigid',
    application: 'Museumsmodell',
    applicationEn: 'Museum Model',
    desc: 'Täuschend echte Reproduktion eines Römerhelms für Museumsausstellung. Besucher können das Modell anfassen.',
    descEn: 'Deceptively real reproduction of a Roman helmet for museum exhibition. Visitors can touch the model.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj05_museum_colosseum-nMtJBVidGgGPdtKevR4CFu.webp',
  },
  {
    id: 6,
    title: 'SLA Dental Anschauungsmodell',
    titleEn: 'SLA Dental Demonstration Model',
    category: '3D-Druck',
    categoryEn: '3D Printing',
    tech: 'SLA',
    material: 'Dental Resin',
    materialEn: 'Dental Resin',
    application: 'Medizin',
    applicationEn: 'Medical',
    desc: 'SLA-gedruckte Dental-Anschauungsmodelle aus biokompatiblem Dental Resin. Serienproduktion mit ±0,05 mm Schichtgenauigkeit für Kieferorthopädie, Implantatplanung und Patientenaufklärung.',
    descEn: 'SLA-printed dental demonstration models in biocompatible dental resin. Series production with ±0.05 mm layer accuracy for orthodontics, implant planning and patient education.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_dental_sla_anschauung_614f8b84.jpg',
  },
  {
    id: 7,
    title: 'Architekturmodell Stadtmuseum',
    titleEn: 'Architecture Model City Museum',
    category: 'Museum',
    categoryEn: 'Museum',
    tech: 'FDM',
    material: 'PLA',
    materialEn: 'PLA',
    application: 'Architektur',
    applicationEn: 'Architecture',
    desc: 'Maßstabsgetreues Modell eines historischen Gebäudes im Maßstab 1:100 für Stadtmuseum.',
    descEn: 'Scale model of a historical building at 1:100 scale for city museum.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj07_museum_tactile-iXkpC9iUYpF7xEDFmUs3iP.webp',
  },
  {
    id: 8,
    title: 'Wasserstrahlschneiden Titan-Platinen',
    titleEn: 'Waterjet Cutting Titanium Sheet Parts',
    category: 'Wasserstrahlschneiden',
    categoryEn: 'Waterjet Cutting',
    tech: 'Abrasives Wasserstrahlschneiden (AWJ)',
    material: 'Titan Grade 5 (Ti-6Al-4V), 2–8 mm Blechdicke',
    materialEn: 'Titanium Grade 5 (Ti-6Al-4V), 2–8 mm sheet thickness',
    application: 'Medizintechnik',
    applicationEn: 'Medical Engineering',
    desc: 'Konturschneiden von Titan-Grade-5-Platinen (Ti-6Al-4V) mittels Abrasiv-Wasserstrahlschneiden. Keine Wärmeeinflusszone, keine Gefügeveränderung, keine Oxidation. Maßhaltigkeit ±0,1 mm bei Blechdicken bis 8 mm. Geeignet für medizintechnische Rohlinge, die anschließend spanend weiterbearbeitet werden.',
    descEn: 'Contour cutting of Titanium Grade 5 (Ti-6Al-4V) sheet blanks using abrasive waterjet cutting (AWJ). No heat-affected zone, no microstructural change, no oxidation. Dimensional accuracy ±0.1 mm at sheet thicknesses up to 8 mm. Suitable for medical engineering blanks for subsequent machining.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj08_waterjet_titanium-6HpjSPbwDTdvWdRzZLoedf.webp',
  },
  {
    id: 9,
    title: 'MJF Serienteile Konsumgüter',
    titleEn: 'MJF Series Parts Consumer Goods',
    category: '3D-Druck',
    categoryEn: '3D Printing',
    tech: 'MJF',
    material: 'PA12',
    materialEn: 'PA12',
    application: 'Konsumgüter',
    applicationEn: 'Consumer Goods',
    desc: 'Serienfertigung von 1000 Funktionsteilen mit isotropen Eigenschaften in 5 Tagen.',
    descEn: 'Series production of 1000 functional parts with isotropic properties in 5 days.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj09_pa12_consumer-QhisCQqgxAxREUju8R56aZ.webp',
  },
  {
    id: 10,
    title: 'Fossilien-Digitalisierung',
    titleEn: 'Fossil Digitization',
    category: '3D-Scan',
    categoryEn: '3D Scan',
    tech: 'GOM ATOS + SLA',
    material: 'Standard Resin',
    materialEn: 'Standard Resin',
    application: 'Bildung & Forschung',
    applicationEn: 'Education & Research',
    desc: 'Digitalisierung seltener Fossilien und Reproduktion für Bildungszwecke.',
    descEn: 'Digitization of rare fossils and reproduction for educational purposes.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj10_scan_artifact-952uJHCZso6sfEXEcxk9Rj.webp',
  },
  {
    id: 11,
    title: 'CNC Kunststoffgehäuse',
    titleEn: 'CNC Plastic Housing',
    category: 'CNC',
    categoryEn: 'CNC',
    tech: '3-Achs-Fräsen',
    material: 'POM',
    materialEn: 'POM',
    application: 'Elektronik',
    applicationEn: 'Electronics',
    desc: 'Kleinserie von 50 Kunststoffgehäusen mit komplexer Innengeometrie. Kosten 60% unter Spritzguss.',
    descEn: 'Small series of 50 plastic housings with complex internal geometry. Costs 60% below injection molding.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj11_cnc_pom-NFPt8YNGWbHPMsZ8VYDpez.webp',
  },
  {
    id: 12,
    title: 'Hochfester 3D-Druck mit Endlosfaser',
    titleEn: 'Robot Arm Continuous Fiber',
    category: '3D-Druck',
    categoryEn: '3D Printing',
    tech: 'Endlosfaser FDM (Kevlar)',
    material: 'PA6 + Kevlar',
    materialEn: 'PA6 + Kevlar',
    application: 'Robotik & Automation',
    applicationEn: 'Robotics & Automation',
    desc: 'Leichtes Roboterarm-Segment mit Kevlar-Verstärkung. Zykluszeit um 30% verbessert.',
    descEn: 'Lightweight robot arm segment with Kevlar reinforcement. Cycle time improved by 30%.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/render_proj12_fdm_robot_arm-9GKkgyGca3v4cQcj9CTNw4.webp',
  },
  {
    id: 13,
    title: 'Heuschrecken-Tastmodell Naturkunde',
    titleEn: 'Grasshopper Tactile Model Natural History',
    category: 'Museum',
    categoryEn: 'Museum',
    tech: 'SLA 3D-Druck + TPU-Fühler + Strukturlack',
    material: 'SLA Resin + TPU',
    materialEn: 'SLA Resin + TPU',
    application: 'Museumsmodell',
    applicationEn: 'Museum Model',
    desc: 'Überlebensgroßes Heuschrecken-Tastmodell (522 × 430 × 280 mm) für eine Naturkundeausstellung. Korpus und Beine in SLA-Resin gedruckt und mit Strukturlack versiegelt für maximale Haptik und Langlebigkeit. Die langen Fühler wurden in flexiblem TPU gefertigt, um Bruchsicherheit im Ausstellungsbetrieb zu gewährleisten.',
    descEn: 'Oversized grasshopper tactile model (522 × 430 × 280 mm) for a natural history exhibition. Body and legs printed in SLA resin and sealed with textured lacquer for maximum haptic quality and durability. The long antennae were produced in flexible TPU to ensure break resistance in exhibition use.',
    image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_museum_heuschrecke_a1ec1f0a.jpg',
  },
];

// ─── Filterwerte ──────────────────────────────────────────────────────────────

const ALL_DE = 'Alle';
const ALL_EN = 'All';

const categories    = ['Alle', '3D-Druck', 'CAD', '3D-Scan', 'CNC', 'Museum'];
const categoriesEn  = ['All', '3D Printing', 'CAD', '3D Scan', 'CNC', 'Museum'];

const materials     = ['Alle', 'PA6 + Kohlefaser', 'PA12', 'Metall', 'Aluminium 7075', 'Polyjet Rigid', 'Dental Resin', 'PLA', 'Titan Grade 5', 'Standard Resin', 'POM', 'PA6 + Kevlar', 'SLA Resin + TPU'];
const materialsEn   = ['All', 'PA6 + Carbon Fiber', 'PA12', 'Metal', 'Aluminium 7075', 'Polyjet Rigid', 'Dental Resin', 'PLA', 'Titanium Grade 5', 'Standard Resin', 'POM', 'PA6 + Kevlar', 'SLA Resin + TPU'];

const applications  = ['Alle', 'Automotive', 'Maschinenbau', 'Qualitätssicherung', 'Museumsmodell', 'Medizin', 'Architektur', 'Konsumgüter', 'Bildung & Forschung', 'Elektronik', 'Robotik & Automation'];
const applicationsEn = ['All', 'Automotive', 'Mechanical Engineering', 'Quality Assurance', 'Museum Model', 'Medical', 'Architecture', 'Consumer Goods', 'Education & Research', 'Electronics', 'Robotics & Automation'];

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export default function Projekte() {
  const { lang, t } = useLanguage();

  const [filterCategory,    setFilterCategory]    = useState(ALL_DE);
  const [filterMaterial,    setFilterMaterial]    = useState(ALL_DE);
  const [filterApplication, setFilterApplication] = useState(ALL_DE);
  const [lightboxIndex,     setLightboxIndex]     = useState<number | null>(null);
  const [showFilters,       setShowFilters]        = useState(false);
  const [visible,           setVisible]            = useState<Set<number>>(new Set(projects.map(p => p.id)));

  // Gefilterte Liste berechnen
  const filtered = projects.filter(p => {
    const catMatch = filterCategory === ALL_DE || p.category === filterCategory;
    const matMatch = filterMaterial === ALL_DE || p.material === filterMaterial;
    const appMatch = filterApplication === ALL_DE || p.application === filterApplication;
    return catMatch && matMatch && appMatch;
  });

  // Animiertes Ein-/Ausblenden beim Filtern
  useEffect(() => {
    const ids = new Set(filtered.map(p => p.id));
    setVisible(ids);
  }, [filterCategory, filterMaterial, filterApplication]);

  // Aktive Filter zählen
  const activeFilterCount = [filterCategory, filterMaterial, filterApplication].filter(f => f !== ALL_DE).length;

  const resetFilters = () => {
    setFilterCategory(ALL_DE);
    setFilterMaterial(ALL_DE);
    setFilterApplication(ALL_DE);
  };

  // Lightbox Navigation
  const filteredIds = filtered.map(p => p.id);
  const lightboxProject = lightboxIndex !== null ? projects.find(p => p.id === lightboxIndex) ?? null : null;
  const lightboxPos = lightboxIndex !== null ? filteredIds.indexOf(lightboxIndex) : -1;

  const lightboxPrev = useCallback(() => {
    if (lightboxPos > 0) setLightboxIndex(filteredIds[lightboxPos - 1]);
  }, [lightboxPos, filteredIds]);

  const lightboxNext = useCallback(() => {
    if (lightboxPos < filteredIds.length - 1) setLightboxIndex(filteredIds[lightboxPos + 1]);
  }, [lightboxPos, filteredIds]);

  // Keyboard-Navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setLightboxIndex(null);
      if (e.key === 'ArrowLeft')   lightboxPrev();
      if (e.key === 'ArrowRight')  lightboxNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, lightboxPrev, lightboxNext]);

  // Body-Scroll sperren wenn Lightbox offen
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  // Hilfsfunktion: DE/EN-Label für Filter-Wert
  const labelFor = (value: string, deArr: string[], enArr: string[]) => {
    const idx = deArr.indexOf(value);
    return lang === 'en' && idx >= 0 ? enArr[idx] : value;
  };

  return (
    <PageLayout>
      {/* ── SEO Meta ── */}
      <title>Projekte – Fabrica GmbH | 3D-Druck, CAD, CNC, Museumsmodelle</title>

      <div className="container py-12">
        {/* ── Seitenkopf ── */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {t('Ausgewählte Projekte', 'Selected Projects')}
          </h1>
          <div className="h-1 w-14 rounded mb-4" style={{ backgroundColor: 'var(--fabrica-red)' }} />
          <p className="text-gray-500 max-w-2xl">
            {t(
              'Einblick in realisierte Projekte aus 3D-Druck, CAD, 3D-Scan, CNC-Bearbeitung und Museumsmodellen.',
              'Insights into completed projects from 3D printing, CAD, 3D scanning, CNC machining and museum models.'
            )}
          </p>
        </div>

        {/* ── Filter-Panel ── */}
        <div className="mb-8">
          {/* Filter-Toggle-Button (mobil) */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors"
              style={{
                borderColor: activeFilterCount > 0 ? 'var(--fabrica-red)' : '#d1d5db',
                color: activeFilterCount > 0 ? 'var(--fabrica-red)' : 'var(--fabrica-anthrazit)',
                backgroundColor: activeFilterCount > 0 ? 'oklch(97% 0.01 0.6)' : 'white',
              }}
            >
              <SlidersHorizontal size={16} />
              {t('Filter', 'Filter')}
              {activeFilterCount > 0 && (
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs text-white font-bold"
                  style={{ backgroundColor: 'var(--fabrica-red)' }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RotateCcw size={14} />
                {t('Zurücksetzen', 'Reset filters')}
              </button>
            )}
          </div>

          {/* Filter-Zeilen */}
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: showFilters ? '500px' : '0px' }}
          >
            <div className="space-y-4 pb-4">
              {/* Kategorie */}
              <FilterRow
                label={t('Kategorie', 'Category')}
                values={categories}
                valuesEn={categoriesEn}
                active={filterCategory}
                lang={lang}
                onChange={setFilterCategory}
              />
              {/* Material */}
              <FilterRow
                label={t('Material', 'Material')}
                values={materials}
                valuesEn={materialsEn}
                active={filterMaterial}
                lang={lang}
                onChange={setFilterMaterial}
              />
              {/* Anwendungsfall */}
              <FilterRow
                label={t('Anwendungsfall', 'Application')}
                values={applications}
                valuesEn={applicationsEn}
                active={filterApplication}
                lang={lang}
                onChange={setFilterApplication}
              />
            </div>
          </div>

          {/* Aktive Filter als Tags */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filterCategory !== ALL_DE && (
                <FilterTag
                  label={labelFor(filterCategory, categories, categoriesEn)}
                  onRemove={() => setFilterCategory(ALL_DE)}
                />
              )}
              {filterMaterial !== ALL_DE && (
                <FilterTag
                  label={labelFor(filterMaterial, materials, materialsEn)}
                  onRemove={() => setFilterMaterial(ALL_DE)}
                />
              )}
              {filterApplication !== ALL_DE && (
                <FilterTag
                  label={labelFor(filterApplication, applications, applicationsEn)}
                  onRemove={() => setFilterApplication(ALL_DE)}
                />
              )}
            </div>
          )}

          {/* Ergebnis-Zähler */}
          <p className="text-sm text-gray-400 mt-3">
            {filtered.length === projects.length
              ? t(`${projects.length} Projekte`, `${projects.length} projects`)
              : t(`${filtered.length} von ${projects.length} Projekten`, `${filtered.length} of ${projects.length} projects`)}
          </p>
        </div>

        {/* ── Galerie-Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg mb-4">
              {t('Keine Projekte für diese Filterauswahl.', 'No projects match your filter selection.')}
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--fabrica-red)' }}
            >
              {t('Filter zurücksetzen', 'Reset filters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => {
              const isVisible = visible.has(p.id);
              const isFiltered = filtered.some(f => f.id === p.id);
              if (!isFiltered && !isVisible) return null;
              return (
                <GalleryCard
                  key={p.id}
                  project={p}
                  lang={lang}
                  visible={isFiltered}
                  onClick={() => setLightboxIndex(p.id)}
                />
              );
            })}
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">
            {t('Haben Sie ein ähnliches Projekt?', 'Do you have a similar project?')}
          </p>
          <a
            href={`mailto:kontakt@fabrica3d.eu?subject=${encodeURIComponent('Projektanfrage')}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--fabrica-red)' }}
          >
            <Mail size={18} />
            {t('Projekt anfragen', 'Request a project')}
          </a>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxProject && (
        <Lightbox
          project={lightboxProject}
          lang={lang}
          t={t}
          pos={lightboxPos}
          total={filteredIds.length}
          onClose={() => setLightboxIndex(null)}
          onPrev={lightboxPos > 0 ? lightboxPrev : undefined}
          onNext={lightboxPos < filteredIds.length - 1 ? lightboxNext : undefined}
        />
      )}
    </PageLayout>
  );
}

// ─── FilterRow ────────────────────────────────────────────────────────────────

function FilterRow({
  label,
  values,
  valuesEn,
  active,
  lang,
  onChange,
}: {
  label: string;
  values: string[];
  valuesEn: string[];
  active: string;
  lang: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {values.map((v, i) => {
          const displayLabel = lang === 'en' ? valuesEn[i] : v;
          const isActive = active === v;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              className="px-3 py-1 rounded-full text-sm font-medium border transition-all duration-150"
              style={{
                backgroundColor: isActive ? 'var(--fabrica-red)' : 'white',
                borderColor: isActive ? 'var(--fabrica-red)' : '#e5e7eb',
                color: isActive ? 'white' : '#374151',
              }}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── FilterTag ────────────────────────────────────────────────────────────────

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: 'var(--fabrica-red)' }}
    >
      {label}
      <button onClick={onRemove} className="hover:opacity-75 transition-opacity" aria-label="Filter entfernen">
        <X size={12} />
      </button>
    </span>
  );
}

// ─── GalleryCard ──────────────────────────────────────────────────────────────

function GalleryCard({
  project: p,
  lang,
  visible,
  onClick,
}: {
  project: Project;
  lang: string;
  visible: boolean;
  onClick: () => void;
}) {
  const title = lang === 'en' ? p.titleEn : p.title;
  const category = lang === 'en' ? p.categoryEn : p.category;
  const material = lang === 'en' ? p.materialEn : p.material;
  const application = lang === 'en' ? p.applicationEn : p.application;

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl cursor-pointer border border-gray-100 shadow-sm hover:shadow-lg"
      style={{
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Bild */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '66.67%' }}>
        <img
          src={p.image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient-Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            opacity: 0.7,
          }}
        />
        {/* Hover-Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: 'rgba(122,14,63,0.55)' }}
        >
          <span className="text-white text-sm font-semibold tracking-wide border border-white/60 px-4 py-2 rounded-full">
            {lang === 'en' ? 'View details' : 'Details ansehen'}
          </span>
        </div>
        {/* Kategorie-Badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: 'var(--fabrica-red)' }}
        >
          {category}
        </span>
      </div>

      {/* Karten-Inhalt */}
      <div className="p-4 bg-white">
        <h3 className="font-bold text-sm mb-2 leading-snug" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          <MetaChip icon="⚙" label={p.tech} />
          <MetaChip icon="◈" label={material} />
          <MetaChip icon="◎" label={application} />
        </div>
      </div>
    </div>
  );
}

function MetaChip({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
      <span className="text-[10px]">{icon}</span>
      {label}
    </span>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  project: p,
  lang,
  t,
  pos,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project;
  lang: string;
  t: (de: string, en: string) => string;
  pos: number;
  total: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const title       = lang === 'en' ? p.titleEn       : p.title;
  const desc        = lang === 'en' ? p.descEn        : p.desc;
  const category    = lang === 'en' ? p.categoryEn    : p.category;
  const material    = lang === 'en' ? p.materialEn    : p.material;
  const application = lang === 'en' ? p.applicationEn : p.application;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Bild-Seite */}
        <div className="relative md:w-1/2 flex-shrink-0 bg-gray-900" style={{ minHeight: '260px' }}>
          <img
            src={p.image}
            alt={title}
            className="w-full h-full object-cover"
            style={{ maxHeight: '70vh' }}
          />
          {/* Navigations-Pfeile */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              aria-label="Nächstes Bild"
            >
              <ChevronRight size={22} />
            </button>
          )}
          {/* Zähler */}
          <span className="absolute bottom-3 right-3 text-xs text-white/70 bg-black/40 px-2 py-0.5 rounded-full">
            {pos + 1} / {total}
          </span>
        </div>

        {/* Info-Seite */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col">
          {/* Schließen */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Schließen"
          >
            <X size={22} />
          </button>

          {/* Kategorie-Badge */}
          <span
            className="inline-block self-start text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: 'var(--fabrica-red)' }}
          >
            {category}
          </span>

          <h2 className="text-xl font-bold mb-3 leading-snug" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {title}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>

          {/* Metadaten-Tabelle */}
          <div className="space-y-2 mb-6">
            <LightboxMeta label={t('Technologie', 'Technology')} value={p.tech} />
            <LightboxMeta label={t('Material', 'Material')} value={material} />
            <LightboxMeta label={t('Anwendungsfall', 'Application')} value={application} />
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <a
              href={`mailto:kontakt@fabrica3d.eu?subject=${encodeURIComponent(`Anfrage: ${p.title}`)}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90 w-full justify-center"
              style={{ backgroundColor: 'var(--fabrica-red)' }}
            >
              <Mail size={16} />
              {t('Ähnliches Projekt anfragen', 'Request a similar project')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function LightboxMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="text-gray-400 w-28 flex-shrink-0">{label}</span>
      <span className="font-medium" style={{ color: 'var(--fabrica-anthrazit)' }}>{value}</span>
    </div>
  );
}
