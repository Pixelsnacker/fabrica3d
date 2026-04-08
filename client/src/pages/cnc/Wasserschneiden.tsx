import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Wasserschneiden() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="Wasserschneiden"
      titleEn="Water Jet Cutting"
      subtitle="Kaltes Schneidverfahren ohne Wärmeeinflusszone – für Metall, Stein, Glas, Kunststoff und Verbundwerkstoffe."
      subtitleEn="Cold cutting process without heat-affected zone – for metal, stone, glass, plastic and composites."
      mailtoSubject="Anfrage%20Wasserschneiden"
      heroColor="oklch(22% 0.08 220)"
      caseStudies={[
        { title: 'Titanschnitt Medizintechnik', titleEn: 'Titanium Cutting Medical Technology', industry: 'Medizintechnik', industryEn: 'Medical Technology', challenge: 'Präzise Titanzuschnitte für medizinische Implantate ohne Wärmeeinfluss.', challengeEn: 'Precise titanium cuts for medical implants without heat influence.', solution: 'Wasserstrahlschneiden mit Abrasiv, keine Wärmeeinflusszone, Toleranz ±0,1 mm.', solutionEn: 'Abrasive water jet cutting, no heat-affected zone, tolerance ±0.1 mm.', result: 'Saubere Schnittkanten, keine Materialeigenschaftsveränderung.', resultEn: 'Clean cut edges, no material property changes.' },
        { title: 'Verbundwerkstoff-Zuschnitte', titleEn: 'Composite Material Cuts', industry: 'Luft- und Raumfahrt', industryEn: 'Aerospace', challenge: 'CFK-Platten schneiden ohne Delamination und Faserausriss.', challengeEn: 'Cutting CFRP panels without delamination and fiber pull-out.', solution: 'Wasserstrahlschneiden mit optimiertem Druck für CFK.', solutionEn: 'Water jet cutting with optimized pressure for CFRP.', result: 'Saubere Schnittkanten ohne Delamination, Maßhaltigkeit ±0,15 mm.', resultEn: 'Clean cut edges without delamination, dimensional accuracy ±0.15 mm.' },
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
              <tr><td>{t('Max. Materialstärke Metall', 'Max. Metal Thickness')}</td><td>200 mm</td></tr>
              <tr><td>{t('Max. Materialstärke Stein/Glas', 'Max. Stone/Glass Thickness')}</td><td>150 mm</td></tr>
              <tr><td>{t('Wärmeeinflusszone', 'Heat-Affected Zone')}</td><td>{t('Keine', 'None')}</td></tr>
              <tr><td>{t('Materialien', 'Materials')}</td><td>{t('Metall, Stein, Glas, Kunststoff, CFK, GFK', 'Metal, Stone, Glass, Plastic, CFRP, GFRP')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </TechPageLayout>
  );
}
