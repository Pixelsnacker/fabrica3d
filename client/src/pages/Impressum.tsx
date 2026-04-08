import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';

export default function Impressum() {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container py-12 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Impressum', 'Legal Notice')}
        </h1>
        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Angaben gemäß § 5 TMG', 'Information pursuant to § 5 TMG')}
            </h2>
            <p>
              Fabrica GmbH<br />
              [Straße und Hausnummer]<br />
              [PLZ Ort]<br />
              Deutschland
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Vertreten durch', 'Represented by')}
            </h2>
            <p>[Geschäftsführer Name]</p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Kontakt', 'Contact')}
            </h2>
            <p>
              E-Mail: <a href="mailto:kontakt@fabrica3d.eu" className="underline" style={{ color: 'var(--fabrica-red)' }}>kontakt@fabrica3d.eu</a>
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Registereintrag', 'Register Entry')}
            </h2>
            <p>
              {t('Eintragung im Handelsregister.', 'Entry in the commercial register.')}<br />
              {t('Registergericht:', 'Register court:')} [Amtsgericht]<br />
              {t('Registernummer:', 'Register number:')} [HRB XXXXX]
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Umsatzsteuer-ID', 'VAT ID')}
            </h2>
            <p>
              {t('Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:', 'VAT identification number pursuant to § 27 a of the German VAT Act:')}<br />
              DE [XXXXXXXXX]
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Haftungsausschluss', 'Disclaimer')}
            </h2>
            <p className="text-sm leading-relaxed">
              {t(
                'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
                'The contents of our pages have been created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.'
              )}
            </p>
          </section>
          <div className="p-4 rounded-lg border-l-4 text-sm" style={{ backgroundColor: 'oklch(98% 0.01 60)', borderLeftColor: 'var(--fabrica-red)' }}>
            <p className="font-semibold mb-1">{t('Hinweis', 'Note')}</p>
            <p className="text-gray-600">{t('Dies ist ein Platzhalter-Impressum. Bitte ersetzen Sie alle eckigen Klammern [  ] mit Ihren tatsächlichen Unternehmensdaten.', 'This is a placeholder legal notice. Please replace all square brackets [  ] with your actual company data.')}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
