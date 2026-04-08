import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fabrica-cookie-consent');
    if (!consent) {
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('fabrica-cookie-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('fabrica-cookie-consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-[var(--fabrica-anthrazit)] text-white shadow-2xl"
      role="dialog"
      aria-label={t('Cookie-Hinweis', 'Cookie Notice')}
    >
      <div className="container py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 text-sm leading-relaxed">
            <p className="font-semibold mb-1 text-base">
              {t('Cookie-Hinweis', 'Cookie Notice')}
            </p>
            <p className="text-white/80">
              {t(
                'Diese Website verwendet technisch notwendige Cookies, um die Grundfunktionen zu gewährleisten. Wir verwenden keine Tracking- oder Marketing-Cookies ohne Ihre Zustimmung. Weitere Informationen finden Sie in unserer ',
                'This website uses technically necessary cookies to ensure basic functionality. We do not use tracking or marketing cookies without your consent. For more information, please see our '
              )}
              <a href="/datenschutz" className="underline hover:text-white">
                {t('Datenschutzerklärung', 'Privacy Policy')}
              </a>
              .
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={reject}
              className="px-4 py-2 text-sm font-medium border border-white/40 rounded hover:bg-white/10 transition-colors"
            >
              {t('Ablehnen', 'Reject')}
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 text-sm font-semibold rounded transition-colors"
              style={{ backgroundColor: 'var(--fabrica-red)' }}
            >
              {t('Akzeptieren', 'Accept')}
            </button>
            <button
              onClick={reject}
              className="p-1 hover:bg-white/10 rounded transition-colors"
              aria-label={t('Schließen', 'Close')}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
