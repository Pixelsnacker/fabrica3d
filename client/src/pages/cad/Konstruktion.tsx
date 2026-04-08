import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Konstruktion() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="CAD-Konstruktion"
      titleEn="CAD Engineering"
      subtitle="Fertigungsgerechte Konstruktion für 3D-Druck und CNC – inklusive Aufbereitung nicht verwendbarer Daten."
      subtitleEn="Manufacturing-ready engineering for 3D printing and CNC – including preparation of unusable data."
      mailtoSubject="Anfrage%20CAD%20Konstruktion"
      heroColor="oklch(20% 0.1 260)"
      caseStudies={[
        { title: 'Architekturmodell zu Druckdaten', titleEn: 'Architecture Model to Print Data', industry: 'Architektur', industryEn: 'Architecture', challenge: 'ArchiCAD-Modell mit offenen Flächen und falschen Wandstärken, nicht direkt druckbar.', challengeEn: 'ArchiCAD model with open surfaces and incorrect wall thicknesses, not directly printable.', solution: 'Vollständige Datenaufbereitung: Flächenmodell zu Volumenmodell, Wandstärken angepasst.', solutionEn: 'Complete data preparation: surface model to solid model, wall thicknesses adjusted.', result: 'Druckfähige Daten in 2 Tagen, Modell erfolgreich gedruckt.', resultEn: 'Printable data in 2 days, model successfully printed.' },
        { title: 'Ersatzteil ohne Zeichnung', titleEn: 'Spare Part Without Drawing', industry: 'Maschinenbau', industryEn: 'Mechanical Engineering', challenge: 'Veraltetes Maschinenteil ohne CAD-Daten oder Zeichnung.', challengeEn: 'Outdated machine part without CAD data or drawing.', solution: '3D-Scan und parametrische CAD-Rekonstruktion, fertigungsgerecht für FDM.', solutionEn: '3D scan and parametric CAD reconstruction, manufacturing-ready for FDM.', result: 'Funktionales Ersatzteil in 5 Tagen, Maschine wieder in Betrieb.', resultEn: 'Functional spare part in 5 days, machine back in operation.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Unsere CAD-Leistungen', 'Our CAD Services')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: t('Neukonstruktion', 'New Design'), desc: t('Parametrisches Design von Grund auf, fertigungsgerecht für 3D-Druck und CNC. Wir konstruieren nach Ihren Anforderungen und Skizzen.', 'Parametric design from scratch, manufacturing-ready for 3D printing and CNC. We design according to your requirements and sketches.') },
            { title: t('Datenaufbereitung', 'Data Preparation'), desc: t('Aufbereitung von Architekturmodellen (ArchiCAD, Revit, SketchUp), Flächenmodellen und fehlerhaften Geometrien für den 3D-Druck.', 'Preparation of architecture models (ArchiCAD, Revit, SketchUp), surface models and faulty geometries for 3D printing.') },
            { title: t('Fertigungsoptimierung', 'Manufacturing Optimization'), desc: t('Optimierung bestehender Konstruktionen für additive Fertigung: Wandstärken, Stützstrukturen, Orientierung, Infill-Strategie.', 'Optimization of existing designs for additive manufacturing: wall thicknesses, support structures, orientation, infill strategy.') },
            { title: t('Parametrisches Design', 'Parametric Design'), desc: t('Konstruktionen mit Parametern für einfache Anpassungen – ideal für Varianten und Serien mit unterschiedlichen Abmessungen.', 'Designs with parameters for easy adjustments – ideal for variants and series with different dimensions.') },
          ].map((item) => (
            <div key={item.title} className="p-5 border rounded-xl">
              <h3 className="font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Besonderheit: Datenaufbereitung', 'Special: Data Preparation')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="p-6 rounded-xl border-l-4" style={{ backgroundColor: 'oklch(97% 0.01 260)', borderLeftColor: 'var(--fabrica-red)' }}>
          <p className="font-semibold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Nicht verwendbare Daten? Kein Problem.', 'Unusable data? No problem.')}</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{t('Viele Kunden kommen mit Daten aus Architektur-Software (ArchiCAD, Revit, SketchUp) oder Flächenmodellierer (Blender, Rhino), die nicht direkt für den 3D-Druck geeignet sind. Fabrica bereitet diese Daten professionell auf.', 'Many customers come with data from architecture software (ArchiCAD, Revit, SketchUp) or surface modelers (Blender, Rhino) that are not directly suitable for 3D printing. Fabrica prepares this data professionally.')}</p>
          <ul className="space-y-1 text-sm text-gray-600">
            {[
              t('Offene Flächen schließen', 'Close open surfaces'),
              t('Flächenmodell zu Volumenmodell konvertieren', 'Convert surface model to solid model'),
              t('Wandstärken korrigieren', 'Correct wall thicknesses'),
              t('Skalierung und Maße prüfen', 'Check scaling and dimensions'),
              t('Stützstrukturen optimieren', 'Optimize support structures'),
            ].map((item) => (
              <li key={item} className="flex items-center gap-2"><span className="text-green-500">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </TechPageLayout>
  );
}
