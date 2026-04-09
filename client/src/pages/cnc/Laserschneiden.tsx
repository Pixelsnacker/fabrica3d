import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Laserschneiden() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="Laserschneiden"
      titleEn="Laser Cutting"
      subtitle="Hochpräzises Schneiden und Gravieren – für Metall, Kunststoff, Holz und Acryl."
      subtitleEn="High-precision cutting and engraving – for metal, plastic, wood and acrylic."
      mailtoSubject="Anfrage%20Laserschneiden"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/cnc_laserschneiden_hero_33866744.jpg"
      heroColor="oklch(20% 0.06 15)"
      caseStudies={[
        { title: 'Blechzuschnitte Serienfertigung', titleEn: 'Sheet Metal Series Production', industry: 'Maschinenbau', industryEn: 'Mechanical Engineering', challenge: 'Serienfertigung von 500 Blechzuschnitten mit komplexen Konturen.', challengeEn: 'Series production of 500 sheet metal cuts with complex contours.', solution: 'Laserschneiden mit optimiertem Nesting, minimaler Materialverschnitt.', solutionEn: 'Laser cutting with optimized nesting, minimal material waste.', result: '500 Teile in 2 Tagen, Toleranz ±0,1 mm, 15% Materialersparnis.', resultEn: '500 parts in 2 days, tolerance ±0.1 mm, 15% material savings.' },
        { title: 'Acryl-Beschriftungen', titleEn: 'Acrylic Labeling', industry: 'Werbetechnik', industryEn: 'Advertising', challenge: 'Präzise Beschriftungen und Logos in Acrylglas für Messestand.', challengeEn: 'Precise labels and logos in acrylic glass for trade show stand.', solution: 'Lasergravur und -schnitt in Acryl, scharfe Kanten und Gravuren.', solutionEn: 'Laser engraving and cutting in acrylic, sharp edges and engravings.', result: 'Professionelle Beschriftungen in 1 Tag, Messestand erfolgreich.', resultEn: 'Professional labels in 1 day, trade show stand successful.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Technische Spezifikationen', 'Technical Specifications')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Parameter', 'Parameter')}</th><th>{t('Wert', 'Value')}</th></tr></thead>
            <tbody>
              <tr><td>{t('Schneidgenauigkeit', 'Cutting Accuracy')}</td><td>±0,1 mm</td></tr>
              <tr><td>{t('Max. Blechstärke Stahl', 'Max. Steel Sheet Thickness')}</td><td>25 mm</td></tr>
              <tr><td>{t('Max. Blechstärke Aluminium', 'Max. Aluminum Sheet Thickness')}</td><td>20 mm</td></tr>
              <tr><td>{t('Schneidbereich', 'Cutting Area')}</td><td>3000 × 1500 mm</td></tr>
              <tr><td>{t('Materialien', 'Materials')}</td><td>{t('Stahl, Edelstahl, Aluminium, Kupfer, Kunststoff, Holz, Acryl', 'Steel, Stainless Steel, Aluminum, Copper, Plastic, Wood, Acrylic')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </TechPageLayout>
  );
}
