import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';

export default function Impressum() {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-10" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Impressum', 'Legal Notice')}
        </h1>
        <div className="prose prose-sm max-w-none text-gray-700 space-y-8">

          {/* Angaben gemäß § 5 TMG */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Angaben gemäß § 5 TMG', 'Information pursuant to § 5 TMG')}
            </h2>
            <p className="leading-relaxed">
              <strong>Fabrica GmbH</strong><br />
              Hüttenstraße 205<br />
              D-50170 Kerpen-Sindorf<br />
              Deutschland
            </p>
          </section>

          {/* Vertreten durch */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Vertreten durch', 'Represented by')}
            </h2>
            <p>{t('Geschäftsführung:', 'Managing Director:')} Daniel Rincón</p>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Kontakt', 'Contact')}
            </h2>
            <div className="space-y-1 leading-relaxed">
              <p>
                E-Mail:{' '}
                <a href="mailto:kontakt@fabrica3d.eu" className="underline" style={{ color: 'var(--fabrica-red)' }}>
                  kontakt@fabrica3d.eu
                </a>
              </p>
              <p>
                {t('Kerpen Tel.:', 'Kerpen Phone:')}{' '}
                <a href="tel:+4922739529429" className="hover:underline" style={{ color: 'var(--fabrica-red)' }}>
                  +49 (0) 2273 / 9529429
                </a>
              </p>
              <p>
                {t('Köln Tel.:', 'Cologne Phone:')}{' '}
                <a href="tel:+4922117051695" className="hover:underline" style={{ color: 'var(--fabrica-red)' }}>
                  +49 (0) 221 / 17051695
                </a>
              </p>
              <p>Fax: +49 (0) 221 / 790760092</p>
            </div>
          </section>

          {/* Registereintrag */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Registereintrag', 'Register Entry')}
            </h2>
            <p className="leading-relaxed">
              {t('Eintragung im Handelsregister.', 'Entry in the commercial register.')}<br />
              {t('Registergericht:', 'Register court:')} Köln<br />
              {t('Registernummer:', 'Register number:')} HRB 81094
            </p>
          </section>

          {/* Umsatzsteuer-ID */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Umsatzsteuer-ID', 'VAT ID')}
            </h2>
            <p className="leading-relaxed">
              {t(
                'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:',
                'VAT identification number pursuant to § 27 a of the German VAT Act:'
              )}<br />
              <strong>DE295059929</strong>
            </p>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Haftungsausschluss (Disclaimer)', 'Disclaimer')}
            </h2>

            <h3 className="font-semibold mb-2">{t('Haftung für Inhalte', 'Liability for Content')}</h3>
            <p className="text-sm leading-relaxed mb-4">
              {t(
                'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
                'As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 paragraph 1 TMG. According to §§ 8 to 10 TMG, however, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. However, liability in this regard is only possible from the point in time at which a concrete infringement of the law becomes known. Upon becoming aware of such infringements, we will remove this content immediately.'
              )}
            </p>

            <h3 className="font-semibold mb-2">{t('Haftung für Links', 'Liability for Links')}</h3>
            <p className="text-sm leading-relaxed mb-4">
              {t(
                'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
                'Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent content control of the linked pages is not reasonable without concrete evidence of a violation of law. Upon becoming aware of legal violations, we will remove such links immediately.'
              )}
            </p>

            <h3 className="font-semibold mb-2">{t('Urheberrecht', 'Copyright')}</h3>
            <p className="text-sm leading-relaxed">
              {t(
                'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
                'The content and works created by the site operators on these pages are subject to German copyright law. The duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of legal violations, we will remove such content immediately.'
              )}
            </p>
          </section>

          {/* Quellenangaben */}
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Quellenangaben für verwendete Bilder und Grafiken', 'Image and Graphic Credits')}
            </h2>
            <p className="leading-relaxed text-sm">
              Fabrica GmbH · 3D-Systems · Formlabs USA · Daniel Rincón · Bigstock · ShutterStock
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
