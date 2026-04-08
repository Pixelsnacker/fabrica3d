import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Sanddruck() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="Sanddruck"
      titleEn="Sand Printing"
      subtitle="Gießereikerne und Gießformen direkt aus Sand – keine Werkzeugkosten, sofort einsatzbereit."
      subtitleEn="Foundry cores and casting molds directly from sand – no tooling costs, ready to use immediately."
      mailtoSubject="Anfrage%20Sanddruck"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sanddruck_panorama-mxobzZdxCqzGFANvCCWUrr.webp"
      heroColor="oklch(35% 0.08 60)"
      caseStudies={[
        { title: 'Motorblock-Gießkern', titleEn: 'Engine Block Casting Core', industry: 'Maschinenbau', industryEn: 'Mechanical Engineering', challenge: 'Komplexer Gießkern für Motorblock mit engen Innenkanälen, konventionell nicht herstellbar.', challengeEn: 'Complex casting core for engine block with tight internal channels, not conventionally producible.', solution: 'Sanddruck mit Binder Jetting, Innenkanäle mit 5 mm Durchmesser realisiert.', solutionEn: 'Sand printing with binder jetting, internal channels with 5 mm diameter realized.', result: 'Erstmuster in 3 Tagen, perfekte Gussqualität ohne Werkzeugkosten.', resultEn: 'First sample in 3 days, perfect casting quality without tooling costs.' },
        { title: 'Prototypenguss Aluminium', titleEn: 'Aluminum Prototype Casting', industry: 'Automotive', industryEn: 'Automotive', challenge: 'Aluminium-Prototyp für Fahrzeugkomponente, Stückzahl 5, Werkzeugkosten nicht wirtschaftlich.', challengeEn: 'Aluminum prototype for vehicle component, quantity 5, tooling costs not economical.', solution: 'Sandform per Binder Jetting, Aluminiumguss in eigener Gießerei.', solutionEn: 'Sand mold via binder jetting, aluminum casting in own foundry.', result: '5 Aluminium-Prototypen in 10 Tagen, Kosten 85% unter Werkzeugfertigung.', resultEn: '5 aluminum prototypes in 10 days, costs 85% below tooling production.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Was ist Sanddruck?', 'What is Sand Printing?')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-4">{t('Beim Sanddruck (Binder Jetting) wird Quarzsand schichtweise mit einem Bindersystem verklebt. Das Ergebnis sind hochpräzise Gießformen und -kerne, die direkt für den Metallguss eingesetzt werden können – ohne teure Werkzeuge.', 'In sand printing (Binder Jetting), quartz sand is bonded layer by layer with a binder system. The result is highly precise casting molds and cores that can be used directly for metal casting – without expensive tooling.')}</p>
        <div
          className="p-5 rounded-xl mb-6 border-l-4"
          style={{ backgroundColor: 'oklch(97% 0.01 60)', borderLeftColor: 'var(--fabrica-red)' }}
        >
          <p className="font-semibold text-sm" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {t('Besonders geeignet für:', 'Especially suitable for:')}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {t('Maschinenbau und Gießereien – komplexe Innenkonturen, die konventionell nicht herstellbar sind, werden mit Sanddruck wirtschaftlich realisierbar.', 'Mechanical engineering and foundries – complex internal contours that cannot be produced conventionally become economically feasible with sand printing.')}
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Parameter', 'Parameter')}</th><th>{t('Wert', 'Value')}</th></tr></thead>
            <tbody>
              <tr><td>{t('Verfahren', 'Process')}</td><td>Binder Jetting</td></tr>
              <tr><td>{t('Material', 'Material')}</td><td>{t('Quarzsand mit Bindersystem', 'Quartz sand with binder system')}</td></tr>
              <tr><td>{t('Werkzeugkosten', 'Tooling Costs')}</td><td>{t('Keine', 'None')}</td></tr>
              <tr><td>{t('Komplexität', 'Complexity')}</td><td>{t('Unbegrenzt, auch Hinterschneidungen', 'Unlimited, including undercuts')}</td></tr>
              <tr><td>{t('Anwendung', 'Application')}</td><td>{t('Metallguss, Prototypenguss, Kleinserien', 'Metal casting, prototype casting, small series')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </TechPageLayout>
  );
}
