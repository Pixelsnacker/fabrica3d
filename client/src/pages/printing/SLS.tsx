import TechPageLayout from '@/components/TechPageLayout';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SLS() {
  const { data: imgData } = trpc.images.getByKey.useQuery({ imageKey: 'print_sls' }, { staleTime: 5 * 60 * 1000, retry: false });
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="SLS-Druck"
      titleEn="SLS Printing"
      subtitle="Selektives Lasersintern – keine Stützstrukturen, hohe mechanische Belastbarkeit, serientauglich."
      subtitleEn="Selective Laser Sintering – no support structures, high mechanical strength, suitable for series production."
      mailtoSubject="Anfrage%20SLS-Druck"
      heroImage={imgData?.url ?? 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sls_panorama-2LJpJBGnxfFBu7udib4N4b.webp'}
      heroColor="oklch(25% 0.08 200)"
      caseStudies={[
        { title: 'Komplexe Baugruppe Maschinenbau', titleEn: 'Complex Assembly Mechanical Engineering', industry: 'Maschinenbau', industryEn: 'Mechanical Engineering', challenge: 'Bauteil mit Hinterschneidungen und komplexen Innenkanälen, nicht zerspanbar.', challengeEn: 'Component with undercuts and complex internal channels, not machinable.', solution: 'SLS in PA12, keine Stützstrukturen erforderlich, direkt einsatzbereit.', solutionEn: 'SLS in PA12, no support structures required, ready to use directly.', result: 'Bauteil in 5 Tagen, Funktionstest bestanden, Kosten 70% unter CNC.', resultEn: 'Component in 5 days, functional test passed, costs 70% below CNC.' },
        { title: 'Serienfertigung Konsumgüter', titleEn: 'Consumer Goods Series Production', industry: 'Konsumgüter', industryEn: 'Consumer Goods', challenge: 'Kleinserie von 200 Funktionsteilen mit gleichbleibender Qualität.', challengeEn: 'Small series of 200 functional parts with consistent quality.', solution: 'SLS PA12 mit Pulver-Recycling für wirtschaftliche Serienfertigung.', solutionEn: 'SLS PA12 with powder recycling for economical series production.', result: '200 Teile in 7 Tagen, Maßhaltigkeit ±0,3 mm über alle Teile.', resultEn: '200 parts in 7 days, dimensional accuracy ±0.3 mm across all parts.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Was ist SLS-Druck?', 'What is SLS Printing?')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">{t('Beim Selektiven Lasersintern (SLS) wird Kunststoffpulver schichtweise mit einem Laser verschmolzen. Das umgebende Pulver dient als Stützmaterial – Stützstrukturen sind nicht erforderlich. Das ermöglicht komplexeste Geometrien und Hinterschneidungen.', 'In Selective Laser Sintering (SLS), plastic powder is fused layer by layer with a laser. The surrounding powder serves as support material – support structures are not required. This enables the most complex geometries and undercuts.')}</p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Parameter', 'Parameter')}</th><th>{t('Wert', 'Value')}</th></tr></thead>
            <tbody>
              <tr><td>{t('Schichtdicke', 'Layer Thickness')}</td><td>0,1 mm</td></tr>
              <tr><td>{t('Maßgenauigkeit', 'Dimensional Accuracy')}</td><td>±0,3 mm</td></tr>
              <tr><td>{t('Stützstrukturen', 'Support Structures')}</td><td>{t('Nicht erforderlich', 'Not required')}</td></tr>
              <tr><td>{t('Mechanische Eigenschaften', 'Mechanical Properties')}</td><td>{t('Hoch, serientauglich', 'High, suitable for series')}</td></tr>
              <tr><td>{t('Maximale Baugröße', 'Max Build Size')}</td><td>340 × 340 × 600 mm</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Materialien', 'Materials')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { mat: 'PA12 (Nylon 12)', desc: t('Standard-Material, ausgezeichnete mechanische Eigenschaften, chemikalienbeständig', 'Standard material, excellent mechanical properties, chemical resistant') },
            { mat: 'PA11 (Nylon 11)', desc: t('Biobasiert, bessere Schlagzähigkeit als PA12, ideal für flexible Funktionsteile', 'Bio-based, better impact resistance than PA12, ideal for flexible functional parts') },
          ].map((m) => (
            <div key={m.mat} className="p-5 border rounded-lg">
              <div className="font-bold mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>{m.mat}</div>
              <div className="text-sm text-gray-500">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </TechPageLayout>
  );
}
