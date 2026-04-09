import TechPageLayout from '@/components/TechPageLayout';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Drehen() {
  const { data: imgData } = trpc.images.getByKey.useQuery({ imageKey: 'cnc_drehen' }, { staleTime: 5 * 60 * 1000, retry: false });
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="CNC-Drehen"
      titleEn="CNC Turning"
      subtitle="Präzisionsdrehen in Kunststoff und Metall – rotationssymmetrische Bauteile mit höchster Genauigkeit."
      subtitleEn="Precision turning in plastic and metal – rotationally symmetric components with highest accuracy."
      mailtoSubject="Anfrage%20CNC%20Drehen"
      heroImage={imgData?.url ?? 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/cnc_drehen_hero_88d657f7.jpg'}
      heroColor="oklch(23% 0.04 40)"
      caseStudies={[
        { title: 'Präzisionswelle Edelstahl', titleEn: 'Precision Shaft Stainless Steel', industry: 'Maschinenbau', industryEn: 'Mechanical Engineering', challenge: 'Präzisionswelle mit h6-Toleranz für Lagerpassung in Edelstahl.', challengeEn: 'Precision shaft with h6 tolerance for bearing fit in stainless steel.', solution: 'CNC-Drehen mit anschließendem Schleifen für h6-Toleranz.', solutionEn: 'CNC turning followed by grinding for h6 tolerance.', result: 'Toleranz h6 eingehalten, Lieferung in 4 Tagen.', resultEn: 'Tolerance h6 met, delivery in 4 days.' },
        { title: 'PTFE-Dichtungsbuchse', titleEn: 'PTFE Sealing Bushing', industry: 'Chemie', industryEn: 'Chemical', challenge: 'Chemikalienbeständige Dichtungsbuchse aus PTFE mit engen Toleranzen.', challengeEn: 'Chemical-resistant sealing bushing from PTFE with tight tolerances.', solution: 'CNC-Drehen in PTFE, spezielle Spannvorrichtung für weiches Material.', solutionEn: 'CNC turning in PTFE, special clamping device for soft material.', result: 'Passgenaue Buchse, chemikalienbeständig, Lieferung in 3 Tagen.', resultEn: 'Perfectly fitting bushing, chemical resistant, delivery in 3 days.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Technische Spezifikationen', 'Technical Specifications')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Parameter', 'Parameter')}</th><th>{t('Wert', 'Value')}</th></tr></thead>
            <tbody>
              <tr><td>{t('Maßgenauigkeit', 'Dimensional Accuracy')}</td><td>±0,01 mm</td></tr>
              <tr><td>{t('Max. Drehdurchmesser', 'Max. Turning Diameter')}</td><td>Ø 300 mm</td></tr>
              <tr><td>{t('Max. Drehlänge', 'Max. Turning Length')}</td><td>800 mm</td></tr>
              <tr><td>{t('Materialien', 'Materials')}</td><td>{t('Aluminium, Stahl, Edelstahl, Messing, Kunststoffe', 'Aluminum, Steel, Stainless Steel, Brass, Plastics')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </TechPageLayout>
  );
}
