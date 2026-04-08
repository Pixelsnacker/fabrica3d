import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import {
  Mail, ChevronRight, Upload, BookOpen, Shield, Clock, Users, Award, Layers,
  Cpu, Scan, Wrench, Building2, CheckCircle, ArrowRight
} from 'lucide-react';

const heroPanels = [
  {
    id: '3d-druck',
    label: '3D-Druck',
    labelEn: '3D Printing',
    href: '/3d-druck/fdm',
    desc: 'FDM, SLA, SLS, MJF, Polyjet und Endlosfaser – alle Verfahren aus einer Hand.',
    descEn: 'FDM, SLA, SLS, MJF, Polyjet and Continuous Fiber – all processes from one source.',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    icon: '🖨️',
  },
  {
    id: 'cad',
    label: 'CAD-Daten',
    labelEn: 'CAD Data',
    href: '/cad/konstruktion',
    desc: 'Konstruktion, Reverse Engineering und Datenaufbereitung für alle Fertigungsverfahren.',
    descEn: 'Engineering, reverse engineering and data preparation for all manufacturing processes.',
    bg: 'linear-gradient(135deg, #0f3460 0%, #533483 100%)',
    icon: '📐',
  },
  {
    id: '3d-scan',
    label: '3D-Scan',
    labelEn: '3D Scan',
    href: '/3d-scan/gom-atos',
    desc: 'GOM ATOS Präzisionsmessung mit Toleranzen bis ±0,01 mm.',
    descEn: 'GOM ATOS precision measurement with tolerances down to ±0.01 mm.',
    bg: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
    icon: '🔬',
  },
  {
    id: 'cnc',
    label: 'CNC-Bearbeitung',
    labelEn: 'CNC Machining',
    href: '/cnc/fraesen',
    desc: 'Fräsen, Drehen, Wasserschneiden und Laserschneiden in Kunststoff und Metall.',
    descEn: 'Milling, turning, water jet and laser cutting in plastic and metal.',
    bg: 'linear-gradient(135deg, #3d0000 0%, #6b0000 100%)',
    icon: '⚙️',
  },
  {
    id: 'museum',
    label: 'Museumsmodelle',
    labelEn: 'Museum Models',
    href: '/museumsmodelle',
    desc: 'Rekonstruktion historischer Objekte und Artefakte in höchster Detailtreue.',
    descEn: 'Reconstruction of historical objects and artifacts with highest detail accuracy.',
    bg: 'linear-gradient(135deg, #2c1810 0%, #5c3317 100%)',
    icon: '🏛️',
  },
];

const whyFabrica = [
  {
    icon: <Users size={22} />,
    de: 'Ein Ansprechpartner für alle Technologien',
    en: 'One contact for all technologies',
  },
  {
    icon: <Shield size={22} />,
    de: 'Vertrauliche Projektabwicklung mit NDA auf Anfrage',
    en: 'Confidential project handling with NDA on request',
  },
  {
    icon: <CheckCircle size={22} />,
    de: 'Ihre Daten und Projekte sind bei uns sicher',
    en: 'Your data and projects are safe with us',
  },
  {
    icon: <Clock size={22} />,
    de: 'Schnelle Umsetzung und kurze Lieferzeiten',
    en: 'Fast implementation and short delivery times',
  },
  {
    icon: <Award size={22} />,
    de: 'Qualitätskontrolle vor jeder Auslieferung',
    en: 'Quality control before every delivery',
  },
  {
    icon: <Layers size={22} />,
    de: 'Vom Prototyp bis zur Serie',
    en: 'From prototype to series production',
  },
];

const services = [
  { icon: <span className="text-2xl">🖨️</span>, label: '3D-Druck', labelEn: '3D Printing', href: '/3d-druck/fdm', desc: 'FDM, SLA, SLS, MJF, Polyjet, Endlosfaser', descEn: 'FDM, SLA, SLS, MJF, Polyjet, Continuous Fiber' },
  { icon: <Cpu size={24} />, label: 'CAD-Daten', labelEn: 'CAD Data', href: '/cad/konstruktion', desc: 'Konstruktion & Reverse Engineering', descEn: 'Engineering & Reverse Engineering' },
  { icon: <Scan size={24} />, label: '3D-Scan', labelEn: '3D Scan', href: '/3d-scan/gom-atos', desc: 'GOM ATOS Präzisionsmessung', descEn: 'GOM ATOS Precision Measurement' },
  { icon: <Wrench size={24} />, label: 'CNC-Bearbeitung', labelEn: 'CNC Machining', href: '/cnc/fraesen', desc: 'Fräsen, Drehen, Schneiden', descEn: 'Milling, Turning, Cutting' },
  { icon: <Building2 size={24} />, label: 'Museumsmodelle', labelEn: 'Museum Models', href: '/museumsmodelle', desc: 'Historische Rekonstruktionen', descEn: 'Historical Reconstructions' },
];

const projects = [
  { title: 'Strukturbauteil Automotive', titleEn: 'Automotive Structural Part', category: '3D-Druck', categoryEn: '3D Printing', desc: 'Endlosfaser-FDM Halterung für Fahrzeugchassis', descEn: 'Continuous fiber FDM bracket for vehicle chassis', color: '#1a1a2e' },
  { title: 'Reverse Engineering Ersatzteil', titleEn: 'Reverse Engineering Spare Part', category: 'CAD', categoryEn: 'CAD', desc: 'Digitalisierung und Neukonstruktion eines Maschinenteils', descEn: 'Digitization and reconstruction of a machine part', color: '#0f3460' },
  { title: 'Maßprüfung Serienteil', titleEn: 'Series Part Inspection', category: '3D-Scan', categoryEn: '3D Scan', desc: 'GOM ATOS Qualitätskontrolle mit ±0,01 mm Toleranz', descEn: 'GOM ATOS quality control with ±0.01 mm tolerance', color: '#1b4332' },
  { title: 'Präzisionsfräsen Aluminium', titleEn: 'Precision Milling Aluminium', category: 'CNC', categoryEn: 'CNC', desc: '5-Achs-Bearbeitung für Maschinenbaukomponente', descEn: '5-axis machining for mechanical engineering component', color: '#3d0000' },
];

export default function Home() {
  const { lang, t } = useLanguage();

  return (
    <PageLayout>
      {/* Hero: 5 Panels */}
      <section className="relative" style={{ height: 'clamp(400px, 60vh, 600px)' }}>
        {/* Desktop: side-by-side panels */}
        <div className="hidden md:flex h-full">
          {heroPanels.map((panel) => (
            <Link href={panel.href} key={panel.id} className="hero-panel" style={{ background: panel.bg }}>
              <div className="panel-overlay" />
              <div className="panel-content">
                <div className="text-3xl mb-2">{panel.icon}</div>
                <h2 className="font-bold text-lg leading-tight">
                  {lang === 'en' ? panel.labelEn : panel.label}
                </h2>
                <div className="panel-desc">
                  {lang === 'en' ? panel.descEn : panel.desc}
                  <div className="mt-2 flex items-center gap-1 text-xs font-semibold opacity-80">
                    {t('Mehr erfahren', 'Learn more')} <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: vertical cards */}
        <div className="md:hidden flex flex-col gap-3 p-4">
          {heroPanels.map((panel) => (
            <Link
              href={panel.href}
              key={panel.id}
              className="flex items-center gap-4 p-4 rounded-lg text-white"
              style={{ background: panel.bg }}
            >
              <span className="text-2xl">{panel.icon}</span>
              <div>
                <div className="font-bold text-sm">{lang === 'en' ? panel.labelEn : panel.label}</div>
                <div className="text-xs text-white/70 mt-0.5">{lang === 'en' ? panel.descEn : panel.desc}</div>
              </div>
              <ChevronRight size={16} className="ml-auto flex-shrink-0 text-white/60" />
            </Link>
          ))}
        </div>
      </section>

      {/* Company intro + stats */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Fabrica GmbH – Ihr Partner für digitale Fertigung', 'Fabrica GmbH – Your Partner for Digital Manufacturing')}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t(
                'Fabrica GmbH ist nicht nur ein Produzent – wir sind Ihr spezialisierter Beschaffungsmanager und Problemlöser für komplexe Fertigungsanfragen. Wir beherrschen alle Technologien und produzieren alles aus einer Hand.',
                'Fabrica GmbH is not just a manufacturer – we are your specialized procurement manager and problem solver for complex manufacturing requests. We master all technologies and produce everything from a single source.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { num: 'XX', label: t('Jahre Erfahrung', 'Years Experience') },
              { num: 'XX', label: t('Zufriedene Kunden', 'Satisfied Clients') },
              { num: 'XX', label: t('Projekte realisiert', 'Projects Completed') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold mb-1" style={{ color: 'var(--fabrica-red)' }}>
                  {stat.num}+
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Fabrica */}
      <section className="py-14 md:py-20" style={{ backgroundColor: 'var(--fabrica-gray)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Warum Fabrica?', 'Why Fabrica?')}
            </h2>
            <div className="h-1 w-12 rounded mx-auto mb-4" style={{ backgroundColor: 'var(--fabrica-red)' }} />
            <p className="text-gray-600 max-w-xl mx-auto">
              {t(
                'Was uns von anderen Anbietern unterscheidet – und warum unsere Kunden immer wiederkommen.',
                'What sets us apart from other providers – and why our clients keep coming back.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {whyFabrica.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                  style={{ backgroundColor: 'var(--fabrica-red)' }}
                >
                  {item.icon}
                </div>
                <p className="font-medium text-sm leading-snug" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {lang === 'en' ? item.en : item.de}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Unsere Leistungen', 'Our Services')}
            </h2>
            <div className="h-1 w-12 rounded mx-auto mb-4" style={{ backgroundColor: 'var(--fabrica-red)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((svc) => (
              <Link
                href={svc.href}
                key={svc.label}
                className="group border rounded-xl p-5 text-center hover:border-red-200 hover:shadow-md transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'var(--fabrica-anthrazit)' }}
                >
                  {svc.icon}
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {lang === 'en' ? svc.labelEn : svc.label}
                </h3>
                <p className="text-xs text-gray-500">{lang === 'en' ? svc.descEn : svc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="py-14 md:py-20" style={{ backgroundColor: 'var(--fabrica-gray)' }}>
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
                {t('Ausgewählte Projekte', 'Selected Projects')}
              </h2>
              <div className="h-1 w-12 rounded" style={{ backgroundColor: 'var(--fabrica-red)' }} />
            </div>
            <Link
              href="/projekte"
              className="hidden md:flex items-center gap-1 text-sm font-semibold hover:underline"
              style={{ color: 'var(--fabrica-red)' }}
            >
              {t('Alle Projekte', 'All Projects')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((p) => (
              <div
                key={p.title}
                className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div
                  className="h-40 flex items-center justify-center text-white/20 text-5xl font-bold"
                  style={{ background: p.color }}
                >
                  <span className="opacity-20 text-6xl">F</span>
                </div>
                <div className="p-4 bg-white">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'var(--fabrica-gray)', color: 'var(--fabrica-anthrazit)' }}
                  >
                    {lang === 'en' ? p.categoryEn : p.category}
                  </span>
                  <h3 className="font-bold text-sm mt-2 mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    {lang === 'en' ? p.titleEn : p.title}
                  </h3>
                  <p className="text-xs text-gray-500">{lang === 'en' ? p.descEn : p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/projekte"
              className="inline-flex items-center gap-1 text-sm font-semibold"
              style={{ color: 'var(--fabrica-red)' }}
            >
              {t('Alle Projekte ansehen', 'View all projects')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Knowledge Base Teaser */}
      <section className="py-12 bg-white border-y">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: 'var(--fabrica-anthrazit)' }}
              >
                <BookOpen size={26} />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Basiswissen & Entscheidungshilfe', 'Knowledge Base & Decision Guide')}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {t(
                    'Welches Verfahren passt zu Ihrem Projekt? Welche Dateiformate werden benötigt? Finden Sie Antworten in unserem Basiswissen.',
                    'Which process suits your project? Which file formats are required? Find answers in our Knowledge Base.'
                  )}
                </p>
              </div>
            </div>
            <Link
              href="/basiswissen"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-white rounded flex-shrink-0 transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--fabrica-anthrazit)' }}
            >
              {t('Zum Basiswissen', 'Knowledge Base')} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-14 md:py-20" style={{ backgroundColor: 'var(--fabrica-gray)' }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-5"
              style={{ backgroundColor: 'var(--fabrica-red)' }}
            >
              <Upload size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Datei hochladen – Kostenlose Prüfung', 'Upload File – Free Check')}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t(
                'Laden Sie Ihre CAD-Datei hoch und wir prüfen sie kostenlos auf Druckbarkeit und Fertigungseignung. Sie erhalten innerhalb von 24 Stunden ein verbindliches Angebot.',
                'Upload your CAD file and we will check it free of charge for printability and manufacturability. You will receive a binding quote within 24 hours.'
              )}
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--fabrica-red)' }}
            >
              <Upload size={18} />
              {t('Jetzt Datei hochladen', 'Upload File Now')}
            </Link>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-10 bg-white border-y">
        <div className="container">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            {t('Vertrauen von führenden Unternehmen', 'Trusted by leading companies')}
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-28 h-10 rounded flex items-center justify-center text-xs font-bold text-gray-300 border border-gray-100"
              >
                LOGO {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 text-white text-center" style={{ backgroundColor: 'var(--fabrica-red)' }}>
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('Bereit für Ihr nächstes Projekt?', 'Ready for your next project?')}
          </h2>
          <p className="text-white/80 mb-8 text-lg leading-relaxed">
            {t(
              'Senden Sie uns Ihre Anfrage direkt per E-Mail. Wir melden uns innerhalb von 24 Stunden mit einem verbindlichen Angebot.',
              'Send us your request directly by email. We will respond within 24 hours with a binding quote.'
            )}
          </p>
          <a
            href="mailto:kontakt@fabrica3d.eu?subject=Allgemeine%20Anfrage"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold text-lg rounded transition-opacity hover:opacity-90"
            style={{ color: 'var(--fabrica-red)' }}
          >
            <Mail size={20} />
            {t('Sofortangebot anfordern', 'Request a Quote')}
          </a>
          <p className="mt-4 text-white/60 text-sm">kontakt@fabrica3d.eu</p>
        </div>
      </section>
    </PageLayout>
  );
}
