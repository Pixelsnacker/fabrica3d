import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, ChevronDown, Mail, Phone } from 'lucide-react';

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
  { label: 'F3 Kalkulator', labelEn: 'F3 Calculator', href: '/kalkulator' },
  { label: 'Upload', labelEn: 'Upload', href: '/upload' },
];

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isMuseumPage = location === '/museumsmodelle';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location]);

  const ctaHref = isMuseumPage
    ? 'mailto:kontakt@fabrica3d.eu?subject=Anfrage%20Museumsmodell'
    : 'mailto:kontakt@fabrica3d.eu?subject=Sofortangebot%20Anfrage';

  const ctaLabel = isMuseumPage
    ? t('Kontakt aufnehmen', 'Contact Us')
    : t('Sofortangebot', 'Get a Quote');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">

        {/* ── TOPBAR ── */}
        <div
          className="hidden md:block border-b text-xs"
          style={{ backgroundColor: 'var(--fabrica-anthrazit)', color: 'rgba(255,255,255,0.85)' }}
        >
          <div className="container flex items-center justify-between h-12">
            {/* Left: contact info */}
            <div className="flex items-center gap-5">
              <a
                href="tel:+4922739529429"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone size={11} />
                Kerpen: +49 (0) 2273 / 9529429
              </a>
              <a
                href="tel:+4922117051695"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone size={11} />
                Köln: +49 (0) 221 / 17051695
              </a>
              <a
                href="mailto:kontakt@fabrica3d.eu"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail size={11} />
                kontakt@fabrica3d.eu
              </a>
            </div>

            {/* Right: language + CTA */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="flex items-center border border-white/20 rounded overflow-hidden font-semibold">
                <button
                  onClick={() => setLang('de')}
                  className={`px-2.5 py-0.5 transition-colors ${lang === 'de' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'}`}
                  aria-label="Deutsch"
                >
                  🇩🇪 DE
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-0.5 transition-colors ${lang === 'en' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'}`}
                  aria-label="English"
                >
                  🇬🇧 EN
                </button>
              </div>

              {/* CTA Button */}
              <a
                href={ctaHref}
                className="flex items-center gap-1.5 px-3 py-0.5 font-semibold text-white rounded transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--fabrica-red)' }}
              >
                <Mail size={11} />
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>

        {/* ── MAIN NAVBAR ── */}
        <div style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.08)' }}>
          <div className="container">
            <div className="flex items-center justify-between h-[82px]">

              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/FabricaLogoneu_e9be3c25.png"
                  alt="Fabrica GmbH – Digital Production"
                  className="h-[62px] w-auto object-contain"
                  style={{ maxWidth: '210px' }}
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden xl:flex items-center gap-0.5">
                {navItems.map((item) => (
                  <div key={item.label} className="nav-item relative">
                    {item.children ? (
                      <>
                        <button
                          className="flex items-center gap-1 px-2.5 py-2 text-sm font-medium rounded hover:bg-gray-50 transition-colors whitespace-nowrap"
                          style={{ color: 'var(--fabrica-anthrazit)' }}
                        >
                          {lang === 'en' ? item.labelEn : item.label}
                          <ChevronDown size={13} />
                        </button>
                        <div className="nav-dropdown">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg whitespace-nowrap"
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
                        className="px-2.5 py-2 text-sm font-medium rounded hover:bg-gray-50 transition-colors block whitespace-nowrap"
                        style={{ color: 'var(--fabrica-anthrazit)' }}
                      >
                        {lang === 'en' ? item.labelEn : item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Kontakt link in main nav (desktop) */}
                <Link
                  href="/kontakt"
                  className="px-2.5 py-2 text-sm font-medium rounded hover:bg-gray-50 transition-colors block whitespace-nowrap"
                  style={{ color: 'var(--fabrica-anthrazit)' }}
                >
                  {t('Kontakt', 'Contact')}
                </Link>
              </nav>

              {/* Mobile right side: language + hamburger */}
              <div className="xl:hidden flex items-center gap-2">
                {/* Mobile language switcher */}
                <div className="flex items-center border rounded overflow-hidden text-xs font-semibold">
                  <button
                    onClick={() => setLang('de')}
                    className={`px-2 py-1 transition-colors ${lang === 'de' ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={lang === 'de' ? { backgroundColor: 'var(--fabrica-anthrazit)' } : {}}
                    aria-label="Deutsch"
                  >
                    🇩🇪
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-2 py-1 transition-colors ${lang === 'en' ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={lang === 'en' ? { backgroundColor: 'var(--fabrica-anthrazit)' } : {}}
                    aria-label="English"
                  >
                    🇬🇧
                  </button>
                </div>

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 rounded hover:bg-gray-100 transition-colors"
                  aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="xl:hidden border-t bg-white max-h-[80vh] overflow-y-auto">
            <div className="container py-3">

              {/* Mobile contact info */}
              <div className="mb-3 pb-3 border-b space-y-1.5">
                <a href="tel:+4922739529429" className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={13} style={{ color: 'var(--fabrica-red)' }} />
                  Kerpen: +49 (0) 2273 / 9529429
                </a>
                <a href="tel:+4922117051695" className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={13} style={{ color: 'var(--fabrica-red)' }} />
                  Köln: +49 (0) 221 / 17051695
                </a>
                <a href="mailto:kontakt@fabrica3d.eu" className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={13} style={{ color: 'var(--fabrica-red)' }} />
                  kontakt@fabrica3d.eu
                </a>
              </div>

              {/* Nav items */}
              {[...navItems, { label: 'Kontakt', labelEn: 'Contact', href: '/kontakt' }].map((item) => (
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

              {/* Mobile CTA */}
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
      <a
        href={ctaHref}
        className="md:hidden fixed bottom-6 right-4 z-40 flex items-center gap-2 px-4 py-3 text-sm font-bold text-white rounded-full shadow-lg"
        style={{ backgroundColor: 'var(--fabrica-red)' }}
        aria-label={t('Sofortangebot anfordern', 'Get a Quote')}
      >
        <Mail size={16} />
        {t('Angebot', 'Quote')}
      </a>
    </>
  );
}
