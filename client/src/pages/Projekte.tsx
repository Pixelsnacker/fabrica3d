import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import { Mail } from 'lucide-react';

const projects = [
  { id: 1, title: 'Strukturbauteil Automotive', titleEn: 'Automotive Structural Part', category: '3D-Druck', categoryEn: '3D Printing', tech: 'Endlosfaser FDM', material: 'PA6 + Kohlefaser', desc: 'Hochfeste Halterung für Fahrzeugchassis mit Endlosfaser-FDM. 65% Gewichtsreduktion gegenüber Aluminium bei gleicher Steifigkeit.', descEn: 'High-strength bracket for vehicle chassis with continuous fiber FDM. 65% weight reduction compared to aluminum at the same stiffness.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_fdm_architektur_ebf503d3.webp' },
  { id: 2, title: 'Reverse Engineering Ersatzteil', titleEn: 'Reverse Engineering Spare Part', category: 'CAD', categoryEn: 'CAD', tech: 'Reverse Engineering + FDM', material: 'PA12', desc: 'Digitalisierung und Neukonstruktion eines veralteten Maschinenteils ohne vorhandene Zeichnung.', descEn: 'Digitization and reconstruction of an obsolete machine part without existing drawing.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_cad_reverse_bd0eb21d.webp' },
  { id: 3, title: 'Maßprüfung Serienteil', titleEn: 'Series Part Inspection', category: '3D-Scan', categoryEn: '3D Scan', tech: 'GOM ATOS', material: '–', desc: 'Qualitätskontrolle von 500 Serienteilen mit GOM ATOS. Vollständige Prüfdokumentation mit Farbplot.', descEn: 'Quality control of 500 series parts with GOM ATOS. Complete inspection documentation with color plot.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_scan_series_7c4ffbf4.webp' },
  { id: 4, title: 'Präzisionsfräsen Aluminium', titleEn: 'Precision Milling Aluminium', category: 'CNC', categoryEn: 'CNC', tech: '5-Achs-Fräsen', material: 'Aluminium 7075', desc: '5-Achs-Bearbeitung einer Maschinenbaukomponente mit Toleranz ±0,01 mm.', descEn: '5-axis machining of a mechanical engineering component with tolerance ±0.01 mm.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_cnc_alu_f4951a7f.webp' },
  { id: 5, title: 'Rekonstruktion Römerhelm', titleEn: 'Reconstruction Roman Helmet', category: 'Museum', categoryEn: 'Museum', tech: 'Polyjet + Handarbeit', material: 'Polyjet Rigid', desc: 'Täuschend echte Reproduktion eines Römerhelms für Museumsausstellung. Besucher können das Modell anfassen.', descEn: 'Deceptively real reproduction of a Roman helmet for museum exhibition. Visitors can touch the model.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_museum_helm_20ce157e.webp' },
  { id: 6, title: 'SLA Zahntechnisches Modell', titleEn: 'SLA Dental Model', category: '3D-Druck', categoryEn: '3D Printing', tech: 'SLA', material: 'Dental Resin', desc: 'Präzise Zahnmodelle für Kieferorthopädie mit ±0,01 mm Toleranz. Produktionszeit 80% kürzer als konventionell.', descEn: 'Precise dental models for orthodontics with ±0.01 mm tolerance. Production time 80% shorter than conventional.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_sla_dental_a02d9290.webp' },
  { id: 7, title: 'Architekturmodell Stadtmuseum', titleEn: 'Architecture Model City Museum', category: 'Museum', categoryEn: 'Museum', tech: 'FDM', material: 'PLA', desc: 'Maßstabsgetreues Modell eines historischen Gebäudes im Maßstab 1:100 für Stadtmuseum.', descEn: 'Scale model of a historical building at 1:100 scale for city museum.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_museum_arch_eb983340.webp' },
  { id: 8, title: 'Wasserschneiden Titanzuschnitte', titleEn: 'Water Jet Titanium Cuts', category: 'CNC', categoryEn: 'CNC', tech: 'Wasserschneiden', material: 'Titan Grade 5', desc: 'Präzise Titanzuschnitte für medizinische Implantate ohne Wärmeeinflusszone.', descEn: 'Precise titanium cuts for medical implants without heat-affected zone.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_cnc_titan_4c15ddff.webp' },
  { id: 9, title: 'MJF Serienteile Konsumgüter', titleEn: 'MJF Series Parts Consumer Goods', category: '3D-Druck', categoryEn: '3D Printing', tech: 'MJF', material: 'PA12', desc: 'Serienfertigung von 1000 Funktionsteilen mit isotropen Eigenschaften in 5 Tagen.', descEn: 'Series production of 1000 functional parts with isotropic properties in 5 days.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_mjf_series_c5a3cc5a.webp' },
  { id: 10, title: 'Fossilien-Digitalisierung', titleEn: 'Fossil Digitization', category: '3D-Scan', categoryEn: '3D Scan', tech: 'GOM ATOS + SLA', material: 'Standard Resin', desc: 'Digitalisierung seltener Fossilien und Reproduktion für Bildungszwecke.', descEn: 'Digitization of rare fossils and reproduction for educational purposes.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_scan_fossil_5c7b4546.webp' },
  { id: 11, title: 'CNC Kunststoffgehäuse', titleEn: 'CNC Plastic Housing', category: 'CNC', categoryEn: 'CNC', tech: '3-Achs-Fräsen', material: 'POM', desc: 'Kleinserie von 50 Kunststoffgehäusen mit komplexer Innengeometrie. Kosten 60% unter Spritzguss.', descEn: 'Small series of 50 plastic housings with complex internal geometry. Costs 60% below injection molding.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_cnc_pom_abfd1771.webp' },
  { id: 12, title: 'Roboterarm Endlosfaser', titleEn: 'Robot Arm Continuous Fiber', category: '3D-Druck', categoryEn: '3D Printing', tech: 'Endlosfaser FDM (Kevlar)', material: 'PA6 + Kevlar', desc: 'Leichtes Roboterarm-Segment mit Kevlar-Verstärkung. Zykluszeit um 30% verbessert.', descEn: 'Lightweight robot arm segment with Kevlar reinforcement. Cycle time improved by 30%.', image: '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/proj_fdm_roboter_1206c028.webp' },
];

const categories = ['Alle', '3D-Druck', 'CAD', '3D-Scan', 'CNC', 'Museum'];
const categoriesEn = ['All', '3D Printing', 'CAD', '3D Scan', 'CNC', 'Museum'];

export default function Projekte() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState('Alle');

  const filtered = filter === 'Alle'
    ? projects
    : projects.filter((p) => p.category === filter);

  const cats = lang === 'en' ? categoriesEn : categories;
  const filterValues = ['Alle', '3D-Druck', 'CAD', '3D-Scan', 'CNC', 'Museum'];

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="py-16 md:py-24 text-white"
        style={{ background: 'linear-gradient(135deg, var(--fabrica-anthrazit) 0%, oklch(25% 0.05 260) 100%)' }}
      >
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t('Unsere Projekte', 'Our Projects')}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {t('Ausgewählte Referenzprojekte aus allen Leistungsbereichen – von der Idee bis zum fertigen Bauteil.', 'Selected reference projects from all service areas – from idea to finished component.')}
          </p>
        </div>
      </section>

      <div className="container py-12">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setFilter(filterValues[i])}
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${filter === filterValues[i] ? 'text-white border-transparent' : 'text-gray-600 hover:border-gray-400'}`}
              style={filter === filterValues[i] ? { backgroundColor: 'var(--fabrica-red)', borderColor: 'var(--fabrica-red)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border">
              <div className="h-56 relative overflow-hidden bg-gray-900">
                <img
                  src={p.image}
                  alt={lang === 'en' ? p.titleEn : p.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
                    }
                  }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded text-white"
                    style={{ backgroundColor: 'var(--fabrica-red)' }}
                  >
                    {lang === 'en' ? p.categoryEn : p.category}
                  </span>
                </div>
              </div>
              <div className="p-5 bg-white">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-sm leading-snug" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    {lang === 'en' ? p.titleEn : p.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--fabrica-gray)', color: 'var(--fabrica-anthrazit)' }}>{p.tech}</span>
                  {p.material !== '–' && (
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{p.material}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {lang === 'en' ? p.descEn : p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-xl text-white text-center" style={{ backgroundColor: 'var(--fabrica-red)' }}>
          <h2 className="text-xl font-bold mb-2">{t('Ihr Projekt fehlt hier?', 'Your project is missing here?')}</h2>
          <p className="text-white/80 mb-4 text-sm">{t('Wir realisieren auch Ihr Projekt. Kontaktieren Sie uns für ein kostenloses Erstgespräch.', 'We also realize your project. Contact us for a free initial consultation.')}</p>
          <a href="mailto:kontakt@fabrica3d.eu?subject=Projektanfrage" className="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded" style={{ color: 'var(--fabrica-red)' }}>
            <Mail size={16} />
            {t('Projekt besprechen', 'Discuss Project')}
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
