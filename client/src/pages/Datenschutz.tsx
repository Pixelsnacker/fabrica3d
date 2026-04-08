import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';

export default function Datenschutz() {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container py-12 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Datenschutzerklärung', 'Privacy Policy')}
        </h1>
        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('1. Datenschutz auf einen Blick', '1. Privacy at a Glance')}
            </h2>
            <h3 className="font-semibold mb-2">{t('Allgemeine Hinweise', 'General Information')}</h3>
            <p>{t('Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.', 'The following notes provide a simple overview of what happens to your personal data when you visit this website.')}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('2. Verantwortlicher', '2. Controller')}
            </h2>
            <p>
              Fabrica GmbH<br />
              [Straße und Hausnummer]<br />
              [PLZ Ort]<br />
              E-Mail: <a href="mailto:kontakt@fabrica3d.eu" className="underline" style={{ color: 'var(--fabrica-red)' }}>kontakt@fabrica3d.eu</a>
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('3. Datenerfassung auf dieser Website', '3. Data Collection on This Website')}
            </h2>
            <h3 className="font-semibold mb-2">{t('Kontaktformular', 'Contact Form')}</h3>
            <p>{t('Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.', 'If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your consent.')}</p>
            <h3 className="font-semibold mb-2 mt-4">{t('Cookies', 'Cookies')}</h3>
            <p>{t('Diese Website verwendet technisch notwendige Cookies für die grundlegende Funktionalität. Wir verwenden keine Tracking- oder Analyse-Cookies ohne Ihre ausdrückliche Einwilligung.', 'This website uses technically necessary cookies for basic functionality. We do not use tracking or analytics cookies without your explicit consent.')}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('4. Ihre Rechte', '4. Your Rights')}
            </h2>
            <p>{t('Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.', 'You have the right at any time to free information about your stored personal data, their origin and recipients and the purpose of data processing, as well as a right to correction, blocking or deletion of this data.')}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('5. Rechtsgrundlage', '5. Legal Basis')}
            </h2>
            <p>{t('Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen).', 'The processing of your data is based on Art. 6 Para. 1 lit. b GDPR (contract fulfillment) and Art. 6 Para. 1 lit. f GDPR (legitimate interests).')}</p>
          </section>
          <div className="p-4 rounded-lg border-l-4 text-sm" style={{ backgroundColor: 'oklch(98% 0.01 60)', borderLeftColor: 'var(--fabrica-red)' }}>
            <p className="font-semibold mb-1">{t('Hinweis', 'Note')}</p>
            <p className="text-gray-600">{t('Dies ist eine vereinfachte Platzhalter-Datenschutzerklärung. Für den produktiven Betrieb empfehlen wir eine rechtlich geprüfte Datenschutzerklärung durch einen Fachanwalt oder einen spezialisierten Datenschutz-Generator.', 'This is a simplified placeholder privacy policy. For productive operation, we recommend a legally reviewed privacy policy by a specialist lawyer or a specialized data protection generator.')}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
