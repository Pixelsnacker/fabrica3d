import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';

interface NavItem {
  label: string;
  labelEn: string;
  href?: string;
  children?: { label: string; labelEn: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: '3D-Druck',
    labelEn: '3D Printing',
    children: [
      { label: 'FDM-Druck', labelEn: 'FDM Printing', href: '/3d-druck/fdm' },
      { label: 'Endlosfaser FDM', labelEn: 'Continuous Fiber FDM', href: '/3d-druck/endlosfaser' },
      { label: 'SLA-Druck', labelEn: 'SLA Printing', href: '/3d-druck/sla' },
      { label: 'DLP-Druck', labelEn: 'DLP Printing', href: '/3d-druck/dlp' },
      { label: 'SLS-Druck', labelEn: 'SLS Printing', href: '/3d-druck/sls' },
      { label: 'MJF-Druck', labelEn: 'MJF Printing', href: '/3d-druck/mjf' },
      { label: 'Sanddruck', labelEn: 'Sand Printing', href: '/3d-druck/sanddruck' },
      { label: 'Polyjet', labelEn: 'Polyjet', href: '/3d-druck/polyjet' },
      { label: 'Materialien', labelEn: 'Materials', href: '/3d-druck/materialien' },
    ],
  },
  {
    label: 'CAD-Daten',
    labelEn: 'CAD Data',
    children: [
      { label: 'Konstruktion', labelEn: 'Engineering', href: '/cad/konstruktion' },
      { label: 'Reverse Engineering', labelEn: 'Reverse Engineering', href: '/cad/reverse-engineering' },
    ],
  },
  {
    label: '3D-Scan',
    labelEn: '3D Scan',
    children: [
      { label: 'GOM ATOS Systeme', labelEn: 'GOM ATOS Systems', href: '/3d-scan/gom-atos' },
      { label: 'Anwendungen', labelEn: 'Applications', href: '/3d-scan/anwendungen' },
    ],
  },
  {
    label: 'CNC-Bearbeitung',
    labelEn: 'CNC Machining',
    children: [
      { label: 'Fräsen', labelEn: 'Milling', href: '/cnc/fraesen' },
      { label: 'Drehen', labelEn: 'Turning', href: '/cnc/drehen' },
      { label: 'Wasserschneiden', labelEn: 'Water Jet Cutting', href: '/cnc/wasserschneiden' },
      { label: 'Laserschneiden', labelEn: 'Laser Cutting', href: '/cnc/laserschneiden' },
    ],
  },
  { label: 'Museumsmodelle', labelEn: 'Museum Models', href: '/museumsmodelle' },
  { label: 'Projekte', labelEn: 'Projects', href: '/projekte' },
  { label: 'Basiswissen', labelEn: 'Knowledge Base', href: '/basiswissen' },
  { label: 'Kalkulator', labelEn: 'Calculator', href: '/kalkulator' },
  { label: 'Datei hochladen', labelEn: 'Upload File', href: '/upload' },
  { label: 'Kontakt', labelEn: 'Contact', href: '/kontakt' },
];

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isMuseumPage = location === '/museumsmodelle';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const ctaHref = isMuseumPage
    ? 'mailto:kontakt@fabrica3d.eu?subject=Anfrage%20Museumsmodell'
    : 'mailto:kontakt@fabrica3d.eu?subject=Allgemeine%20Anfrage';

  const ctaLabel = isMuseumPage
    ? t('Kontakt aufnehmen', 'Contact Us')
    : t('Sofortangebot', 'Get a Quote');

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white"
        style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.08)' }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/FabricaLogoneu_e9be3c25.png"
                alt="Fabrica GmbH – Digital Production"
                className="h-10 w-auto object-contain"
                style={{ maxWidth: '180px' }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="nav-item relative">
                  {item.children ? (
                    <>
                      <button
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                        style={{ color: 'var(--fabrica-anthrazit)' }}
                      >
                        {lang === 'en' ? item.labelEn : item.label}
                        <ChevronDown size={14} />
                      </button>
                      <div className="nav-dropdown">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            style={{ color: 'var(--fabrica-anthrazit)' }}
                          >
                            {lang === 'en' ? child.labelEn : child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className="px-3 py-2 text-sm font-medium rounded hover:bg-gray-50 transition-colors block"
                      style={{ color: 'var(--fabrica-anthrazit)' }}
                    >
                      {lang === 'en' ? item.labelEn : item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Language + CTA */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Language switcher */}
              <div className="hidden md:flex items-center border rounded overflow-hidden text-xs font-semibold">
                <button
                  onClick={() => setLang('de')}
                  className={`px-2 py-1 transition-colors ${lang === 'de' ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  style={lang === 'de' ? { backgroundColor: 'var(--fabrica-anthrazit)' } : {}}
                  aria-label="Deutsch"
                >
                  🇩🇪 DE
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 transition-colors ${lang === 'en' ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  style={lang === 'en' ? { backgroundColor: 'var(--fabrica-anthrazit)' } : {}}
                  aria-label="English"
                >
                  🇬🇧 EN
                </button>
              </div>

              {/* CTA Button */}
              <a
                href={ctaHref}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--fabrica-red)' }}
              >
                <Mail size={14} />
                {ctaLabel}
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded hover:bg-gray-100 transition-colors"
                aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden border-t bg-white max-h-[80vh] overflow-y-auto">
            <div className="container py-3">
              {/* Mobile language switcher */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                <button
                  onClick={() => setLang('de')}
                  className={`flex-1 py-2 text-sm font-semibold rounded transition-colors ${lang === 'de' ? 'text-white' : 'bg-gray-100 text-gray-700'}`}
                  style={lang === 'de' ? { backgroundColor: 'var(--fabrica-anthrazit)' } : {}}
                >
                  🇩🇪 Deutsch
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`flex-1 py-2 text-sm font-semibold rounded transition-colors ${lang === 'en' ? 'text-white' : 'bg-gray-100 text-gray-700'}`}
                  style={lang === 'en' ? { backgroundColor: 'var(--fabrica-anthrazit)' } : {}}
                >
                  🇬🇧 English
                </button>
              </div>

              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-3 text-sm font-semibold border-b"
                        style={{ color: 'var(--fabrica-anthrazit)' }}
                      >
                        {lang === 'en' ? item.labelEn : item.label}
                        <ChevronDown
                          size={16}
                          className="transition-transform"
                          style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="pl-4 pb-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block py-2.5 text-sm border-b border-gray-100 last:border-0"
                              style={{ color: 'var(--fabrica-anthrazit)' }}
                            >
                              {lang === 'en' ? child.labelEn : child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className="block py-3 text-sm font-semibold border-b"
                      style={{ color: 'var(--fabrica-anthrazit)' }}
                    >
                      {lang === 'en' ? item.labelEn : item.label}
                    </Link>
                  )}
                </div>
              ))}

              <a
                href={ctaHref}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white rounded"
                style={{ backgroundColor: 'var(--fabrica-red)' }}
              >
                <Mail size={16} />
                {ctaLabel}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile fixed CTA (bottom right) */}
      {!isMuseumPage && (
        <a
          href="mailto:kontakt@fabrica3d.eu?subject=Allgemeine%20Anfrage"
          className="md:hidden fixed bottom-6 right-4 z-40 flex items-center gap-2 px-4 py-3 text-sm font-bold text-white rounded-full shadow-lg"
          style={{ backgroundColor: 'var(--fabrica-red)' }}
          aria-label={t('Sofortangebot anfordern', 'Get a Quote')}
        >
          <Mail size={16} />
          {t('Angebot', 'Quote')}
        </a>
      )}
    </>
  );
}
