import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';

export default function Datenschutz() {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-10" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Datenschutzerklärung', 'Privacy Policy')}
        </h1>
        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">

          {/* 1. Datenschutz auf einen Blick */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('1. Datenschutz auf einen Blick', '1. Privacy at a Glance')}
            </h2>
            <h3 className="font-semibold mb-2">{t('Allgemeine Hinweise', 'General Information')}</h3>
            <p>
              {t(
                'Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.',
                'The use of our website is generally possible without providing personal data. Insofar as personal data (for example name, address or e-mail addresses) is collected on our pages, this is, as far as possible, always on a voluntary basis. This data will not be passed on to third parties without your express consent.'
              )}
            </p>
            <p className="mt-3">
              {t(
                'Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.',
                'We point out that data transmission over the Internet (e.g. when communicating by e-mail) can have security gaps. A complete protection of the data from access by third parties is not possible.'
              )}
            </p>
          </section>

          {/* 2. Verantwortlicher */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('2. Verantwortlicher', '2. Controller')}
            </h2>
            <p className="leading-relaxed">
              <strong>Fabrica GmbH</strong><br />
              Hüttenstraße 205<br />
              D-50170 Kerpen-Sindorf<br />
              {t('Geschäftsführer:', 'Managing Director:')} Daniel Rincón<br />
              E-Mail:{' '}
              <a href="mailto:kontakt@fabrica3d.eu" className="underline" style={{ color: 'var(--fabrica-red)' }}>
                kontakt@fabrica3d.eu
              </a><br />
              {t('Tel.:', 'Phone:')} +49 (0) 2273 / 9529429
            </p>
            <p className="mt-3">
              {t(
                'Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.',
                'The use of contact data published as part of the imprint obligation by third parties for the purpose of sending unsolicited advertising and information material is hereby expressly prohibited. The operators of the pages expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information, such as spam e-mails.'
              )}
            </p>
          </section>

          {/* 3. Datenerfassung */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('3. Datenerfassung auf dieser Website', '3. Data Collection on This Website')}
            </h2>

            <h3 className="font-semibold mb-2">{t('Kontakt- und Anfrageformulare', 'Contact and Request Forms')}</h3>
            <p className="mb-4">
              {t(
                'Wenn Sie uns per Kontaktformular oder Upload-Formular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.',
                'If you send us inquiries via the contact form or upload form, your details from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your consent.'
              )}
            </p>

            <h3 className="font-semibold mb-2">{t('Datei-Upload', 'File Upload')}</h3>
            <p className="mb-4">
              {t(
                'Beim Hochladen von Dateien über unser Upload-Formular werden die übermittelten Dateien und Kontaktdaten ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Die Dateien werden nicht an Dritte weitergegeben und nach Abschluss des Projekts gelöscht.',
                'When uploading files via our upload form, the submitted files and contact data are used exclusively for processing your request. The files are not passed on to third parties and are deleted after the project is completed.'
              )}
            </p>

            <h3 className="font-semibold mb-2">{t('Cookies', 'Cookies')}</h3>
            <p>
              {t(
                'Diese Website verwendet ausschließlich technisch notwendige Cookies für die grundlegende Funktionalität. Wir verwenden keine Tracking- oder Analyse-Cookies ohne Ihre ausdrückliche Einwilligung. Sie können die Speicherung von Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern.',
                'This website uses only technically necessary cookies for basic functionality. We do not use tracking or analytics cookies without your explicit consent. You can prevent the storage of cookies by setting your browser software accordingly.'
              )}
            </p>
          </section>

          {/* 4. Ihre Rechte */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('4. Ihre Rechte', '4. Your Rights')}
            </h2>
            <p className="mb-3">
              {t(
                'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.',
                'You have the right at any time to free information about your stored personal data, their origin and recipients and the purpose of data processing, as well as a right to correction, blocking or deletion of this data.'
              )}
            </p>
            <p>
              {t(
                'Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.',
                'For this and other questions on the subject of data protection, you can contact us at any time at the address given in the imprint.'
              )}
            </p>
          </section>

          {/* 5. Rechtsgrundlage */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('5. Rechtsgrundlage', '5. Legal Basis')}
            </h2>
            <p>
              {t(
                'Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen) und Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen). Bei Einwilligung erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.',
                'The processing of your data is based on Art. 6 Para. 1 lit. b GDPR (contract fulfillment or pre-contractual measures) and Art. 6 Para. 1 lit. f GDPR (legitimate interests). With consent, processing is based on Art. 6 Para. 1 lit. a GDPR.'
              )}
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t">
            {t('Stand: Kerpen 2025', 'As of: Kerpen 2025')}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
