import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MapPin, Clock, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: 'var(--fabrica-anthrazit)', color: 'white' }}>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/FabricaLogoneu_e9be3c25.png"
                alt="Fabrica GmbH – Digital Production"
                className="h-10 w-auto object-contain"
                style={{ maxWidth: '180px', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {t(
                'Ihr Spezialist für 3D-Druck, CAD-Konstruktion, 3D-Scan, CNC-Bearbeitung und Museumsmodelle. Ein Ansprechpartner für alle Fertigungstechnologien.',
                'Your specialist for 3D printing, CAD engineering, 3D scanning, CNC machining and museum models. One contact for all manufacturing technologies.'
              )}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-white/50">
              {t('Leistungen', 'Services')}
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/3d-druck/fdm" className="hover:text-white transition-colors">FDM-Druck</Link></li>
              <li><Link href="/3d-druck/endlosfaser" className="hover:text-white transition-colors">{t('Endlosfaser FDM', 'Continuous Fiber FDM')}</Link></li>
              <li><Link href="/3d-druck/sls" className="hover:text-white transition-colors">SLS-Druck</Link></li>
              <li><Link href="/3d-druck/mjf" className="hover:text-white transition-colors">MJF-Druck</Link></li>
              <li><Link href="/cad/konstruktion" className="hover:text-white transition-colors">{t('CAD-Konstruktion', 'CAD Engineering')}</Link></li>
              <li><Link href="/3d-scan/gom-atos" className="hover:text-white transition-colors">{t('3D-Scan / GOM ATOS', '3D Scan / GOM ATOS')}</Link></li>
              <li><Link href="/cnc/fraesen" className="hover:text-white transition-colors">{t('CNC-Fräsen', 'CNC Milling')}</Link></li>
              <li><Link href="/museumsmodelle" className="hover:text-white transition-colors">{t('Museumsmodelle', 'Museum Models')}</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-white/50">
              {t('Quicklinks', 'Quick Links')}
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/projekte" className="hover:text-white transition-colors">{t('Projekte', 'Projects')}</Link></li>
              <li><Link href="/basiswissen" className="hover:text-white transition-colors">{t('Basiswissen', 'Knowledge Base')}</Link></li>
              <li><Link href="/upload" className="hover:text-white transition-colors">{t('Datei hochladen', 'Upload File')}</Link></li>
              <li><Link href="/kontakt" className="hover:text-white transition-colors">{t('Kontakt', 'Contact')}</Link></li>
              <li><Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-white transition-colors">{t('Datenschutz', 'Privacy Policy')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-white/50">
              {t('Kontakt', 'Contact')}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 flex-shrink-0 text-white/40" />
                <a href="mailto:kontakt@fabrica3d.eu" className="hover:text-white transition-colors">
                  kontakt@fabrica3d.eu
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-white/40" />
                <span>
                  <span className="text-white/50 text-xs uppercase tracking-wide">{t('Kerpen', 'Kerpen')}</span><br />
                  Hüttenstraße 205<br />
                  D-50170 Kerpen-Sindorf<br />
                  <a href="tel:+4922739529429" className="hover:text-white transition-colors">
                    +49 (0) 2273 / 9529429
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-white/40" />
                <span>
                  <span className="text-white/50 text-xs uppercase tracking-wide">{t('Köln (neu)', 'Cologne (new)')}</span><br />
                  Gilabchstr. 29a<br />
                  50672 Köln<br />
                  <a href="tel:+4922117051695" className="hover:text-white transition-colors">
                    +49 (0) 221 / 17051695
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={15} className="mt-0.5 flex-shrink-0 text-white/40" />
                <span>
                  {t('Mo–Fr: Termine nach Vereinbarung', 'Mon–Fri: By appointment')}
                </span>
              </li>
            </ul>
            <a
              href="mailto:kontakt@fabrica3d.eu?subject=Allgemeine%20Anfrage"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--fabrica-red)' }}
            >
              <Mail size={14} />
              {t('Sofortangebot', 'Get a Quote')}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Fabrica GmbH – Digital Production. {t('Alle Rechte vorbehalten.', 'All rights reserved.')}</span>
          <div className="flex items-center gap-4">
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">{t('Datenschutz', 'Privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
