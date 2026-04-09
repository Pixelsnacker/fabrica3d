import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { getLoginUrl } from '@/const';
import { Image, Euro, Loader2, Settings } from 'lucide-react';
import { useEffect } from 'react';

export default function AdminOverview() {
  const { t } = useLanguage();
  const { data: me, isLoading } = trpc.auth.me.useQuery();

  useEffect(() => {
    if (!isLoading && !me) {
      window.location.href = getLoginUrl('/admin');
    }
  }, [me, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!me) return null;

  const adminItems = [
    {
      href: '/admin/bilder',
      icon: Image,
      title: t('Bildverwaltung', 'Image Management'),
      desc: t(
        'Hero-Bilder aller Seiten hochladen und austauschen.',
        'Upload and replace hero images for all pages.'
      ),
    },
    {
      href: '/admin/preise',
      icon: Euro,
      title: t('Preisverwaltung', 'Pricing Management'),
      desc: t(
        'Preise und Einheiten für den F3 Kalkulator bearbeiten.',
        'Edit prices and units for the F3 calculator.'
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="h-7 w-7 text-gray-500" />
          <h1 className="text-2xl font-bold text-gray-900">
            {t('Admin-Bereich', 'Admin Panel')}
          </h1>
        </div>

        <div className="grid gap-4">
          {adminItems.map(({ href, icon: Icon, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                <Icon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/" className="mt-8 inline-block text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← {t('Zurück zur Website', 'Back to website')}
        </Link>
      </div>
    </div>
  );
}
