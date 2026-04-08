import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Fraesen() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="CNC-Fräsen"
      titleEn="CNC Milling"
      subtitle="3- und 5-Achs-Bearbeitung in Kunststoff und Metall – höchste Präzision für komplexe Geometrien."
      subtitleEn="3- and 5-axis machining in plastic and metal – highest precision for complex geometries."
      mailtoSubject="Anfrage%20CNC%20Fr%C3%A4sen"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cnc_panorama-Pneytx7DHJd5oKkDwYNmTt.webp"
      heroColor="oklch(25% 0.05 30)"
      caseStudies={[
        { title: 'Präzisionsbauteil Aluminium', titleEn: 'Precision Aluminum Component', industry: 'Maschinenbau', industryEn: 'Mechanical Engineering', challenge: 'Hochpräzises Aluminiumteil mit engen Toleranzen und komplexen Freiformflächen.', challengeEn: 'High-precision aluminum part with tight tolerances and complex freeform surfaces.', solution: '5-Achs-Fräsen in einer Aufspannung, Toleranz ±0,01 mm.', solutionEn: '5-axis milling in one clamping, tolerance ±0.01 mm.', result: 'Bauteil in 3 Tagen, alle Toleranzen eingehalten, Oberflächengüte Ra 0,8.', resultEn: 'Component in 3 days, all tolerances met, surface quality Ra 0.8.' },
        { title: 'Kunststoffgehäuse Kleinserie', titleEn: 'Plastic Housing Small Series', industry: 'Elektronik', industryEn: 'Electronics', challenge: 'Kleinserie von 50 Kunststoffgehäusen mit komplexer Innengeometrie.', challengeEn: 'Small series of 50 plastic housings with complex internal geometry.', solution: '3-Achs-Fräsen in POM, optimiertes Werkzeugpfad-Programm.', solutionEn: '3-axis milling in POM, optimized toolpath program.', result: '50 Gehäuse in 5 Tagen, gleichbleibende Qualität, Kosten 60% unter Spritzguss.', resultEn: '50 housings in 5 days, consistent quality, costs 60% below injection molding.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Technische Spezifikationen', 'Technical Specifications')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Parameter', 'Parameter')}</th><th>{t('3-Achs', '3-Axis')}</th><th>{t('5-Achs', '5-Axis')}</th></tr></thead>
            <tbody>
              <tr><td>{t('Maßgenauigkeit', 'Dimensional Accuracy')}</td><td>±0,05 mm</td><td>±0,01 mm</td></tr>
              <tr><td>{t('Maximale Baugröße', 'Max Build Size')}</td><td>800 × 600 × 400 mm</td><td>500 × 500 × 400 mm</td></tr>
              <tr><td>{t('Materialien', 'Materials')}</td><td colSpan={2}>{t('Aluminium, Stahl, Titan, POM, PA, PEEK, PTFE', 'Aluminum, Steel, Titanium, POM, PA, PEEK, PTFE')}</td></tr>
              <tr><td>{t('Oberflächengüte', 'Surface Quality')}</td><td>Ra 1,6</td><td>Ra 0,8</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </TechPageLayout>
  );
}
