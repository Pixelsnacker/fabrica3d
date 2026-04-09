import TechPageLayout from '@/components/TechPageLayout';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Polyjet() {
  const { data: imgData } = trpc.images.getByKey.useQuery({ imageKey: 'print_polyjet' }, { staleTime: 5 * 60 * 1000, retry: false });
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="Polyjet"
      titleEn="Polyjet"
      subtitle="Mehrere Materialien und Farben in einem Druckvorgang – höchste Detailgenauigkeit mit variablen Shore-Härten."
      subtitleEn="Multiple materials and colors in one print – highest detail accuracy with variable Shore hardness."
      mailtoSubject="Anfrage%20Polyjet"
      heroImage={imgData?.url ?? 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_polyjet_panorama-bJC78HVkCv4DXftzyir9Xi.webp'}
      heroColor="oklch(30% 0.12 320)"
      caseStudies={[
        { title: 'Medizinisches Anatomiemodell', titleEn: 'Medical Anatomy Model', industry: 'Medizintechnik', industryEn: 'Medical Technology', challenge: 'Anatomiemodell für Operationsplanung mit unterschiedlichen Gewebesteifigkeiten.', challengeEn: 'Anatomy model for surgical planning with different tissue stiffnesses.', solution: 'Polyjet mit mehreren Materialien: rigid für Knochen, flexible für Weichgewebe.', solutionEn: 'Polyjet with multiple materials: rigid for bones, flexible for soft tissue.', result: 'Realitätsgetreues Modell, OP-Planung deutlich verbessert.', resultEn: 'Realistic model, surgical planning significantly improved.' },
        { title: 'Designprototyp Konsumgüter', titleEn: 'Consumer Goods Design Prototype', industry: 'Konsumgüter', industryEn: 'Consumer Goods', challenge: 'Produktprototyp mit mehreren Farben und unterschiedlichen Materialhärten.', challengeEn: 'Product prototype with multiple colors and different material hardnesses.', solution: 'Polyjet Multi-Material in einem Druckvorgang, keine Montage erforderlich.', solutionEn: 'Polyjet multi-material in one print, no assembly required.', result: 'Fotorealistischer Prototyp in 2 Tagen, Designabnahme auf Anhieb.', resultEn: 'Photorealistic prototype in 2 days, design approval at first attempt.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Was ist Polyjet?', 'What is Polyjet?')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">{t('Polyjet ist ein 3D-Druckverfahren, bei dem flüssige Photopolymere schichtweise aufgetragen und sofort mit UV-Licht ausgehärtet werden. Das Besondere: Mehrere Materialien und Farben können in einem einzigen Druckvorgang kombiniert werden.', 'Polyjet is a 3D printing process in which liquid photopolymers are applied layer by layer and immediately cured with UV light. The special feature: multiple materials and colors can be combined in a single printing process.')}</p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Parameter', 'Parameter')}</th><th>{t('Wert', 'Value')}</th></tr></thead>
            <tbody>
              <tr><td>{t('Schichtdicke', 'Layer Thickness')}</td><td>ab 0,016 mm</td></tr>
              <tr><td>{t('Materialien pro Druck', 'Materials per Print')}</td><td>{t('Bis zu 8 gleichzeitig', 'Up to 8 simultaneously')}</td></tr>
              <tr><td>{t('Shore-Härte', 'Shore Hardness')}</td><td>Shore A 27 – Shore D 85</td></tr>
              <tr><td>{t('Farben', 'Colors')}</td><td>{t('Vollfarbe möglich', 'Full color possible')}</td></tr>
              <tr><td>{t('Oberflächenqualität', 'Surface Quality')}</td><td>{t('Höchste Detailgenauigkeit', 'Highest detail accuracy')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Materialien', 'Materials')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { mat: 'Rigid', desc: t('Hart, für Gehäuse, Strukturteile, Designmodelle', 'Hard, for housings, structural parts, design models') },
            { mat: 'Flexible', desc: t('Gummiartig, für Dichtungen, Griffe, Dämpfer', 'Rubber-like, for seals, grips, dampers') },
            { mat: 'Transparent', desc: t('Klar, für optische Teile, Flüssigkeitsbehälter', 'Clear, for optical parts, liquid containers') },
            { mat: 'Hautfarben-ähnlich', desc: t('Für medizinische Modelle und Prothesen-Prototypen', 'For medical models and prosthetic prototypes') },
          ].map((m) => (
            <div key={m.mat} className="p-4 border rounded-lg">
              <div className="font-bold text-sm mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>{m.mat}</div>
              <div className="text-xs text-gray-500">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </TechPageLayout>
  );
}
