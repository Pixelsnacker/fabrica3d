import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import { Upload, ChevronDown, ChevronUp } from 'lucide-react';

const glossary = [
  { de: 'FDM', en: 'FDM', defDe: 'Fused Deposition Modeling – Schmelzschichtverfahren, bei dem Kunststoff erhitzt und schichtweise aufgetragen wird.', defEn: 'Fused Deposition Modeling – a process in which plastic is heated and deposited layer by layer.' },
  { de: 'SLA', en: 'SLA', defDe: 'Stereolithografie – lichtbasiertes Verfahren, bei dem UV-Laser flüssiges Resin aushärtet.', defEn: 'Stereolithography – a light-based process in which UV laser cures liquid resin.' },
  { de: 'SLS', en: 'SLS', defDe: 'Selektives Lasersintern – Kunststoffpulver wird mit Laser verschmolzen, keine Stützstrukturen nötig.', defEn: 'Selective Laser Sintering – plastic powder is fused with a laser, no support structures needed.' },
  { de: 'MJF', en: 'MJF', defDe: 'Multi Jet Fusion – HP-Verfahren mit Infrarot und Agenten, schneller als SLS, isotrope Eigenschaften.', defEn: 'Multi Jet Fusion – HP process with infrared and agents, faster than SLS, isotropic properties.' },
  { de: 'STL', en: 'STL', defDe: 'Standard Tessellation Language – Dateiformat für 3D-Druckdaten, beschreibt Oberflächen als Dreiecksnetz.', defEn: 'Standard Tessellation Language – file format for 3D print data, describes surfaces as a triangle mesh.' },
  { de: 'STEP', en: 'STEP', defDe: 'Standard for the Exchange of Product Data – universelles CAD-Austauschformat mit Geometrie und Topologie.', defEn: 'Standard for the Exchange of Product Data – universal CAD exchange format with geometry and topology.' },
  { de: 'Infill', en: 'Infill', defDe: 'Füllgrad des Bauteils beim 3D-Druck (10–100%). Beeinflusst Festigkeit, Gewicht und Druckzeit.', defEn: 'Fill density of the component in 3D printing (10–100%). Affects strength, weight and print time.' },
  { de: 'Stützstrukturen', en: 'Support Structures', defDe: 'Hilfsstrukturen beim 3D-Druck für Überhänge > 45°. Werden nach dem Druck entfernt.', defEn: 'Support structures in 3D printing for overhangs > 45°. Removed after printing.' },
  { de: 'Schichtdicke', en: 'Layer Thickness', defDe: 'Dicke einer einzelnen Druckschicht. Beeinflusst Oberflächenqualität und Druckzeit.', defEn: 'Thickness of a single print layer. Affects surface quality and print time.' },
  { de: 'Reverse Engineering', en: 'Reverse Engineering', defDe: 'Digitalisierung eines physischen Objekts und Rekonstruktion als CAD-Modell.', defEn: 'Digitization of a physical object and reconstruction as a CAD model.' },
  { de: 'GOM ATOS', en: 'GOM ATOS', defDe: 'Industrielles optisches 3D-Messsystem für Qualitätskontrolle und Digitalisierung.', defEn: 'Industrial optical 3D measuring system for quality control and digitization.' },
  { de: 'Maßhaltigkeit', en: 'Dimensional Accuracy', defDe: 'Abweichung des gefertigten Bauteils von den Sollmaßen. Angabe als ± Toleranz.', defEn: 'Deviation of the manufactured component from the nominal dimensions. Specified as ± tolerance.' },
];

const processComparison = [
  { proc: 'FDM', procEn: 'FDM', detail: 'Mittel', detailEn: 'Medium', speed: 'Schnell', speedEn: 'Fast', material: 'Breit', materialEn: 'Wide', cost: 'Niedrig', costEn: 'Low', best: 'Prototypen, Gehäuse', bestEn: 'Prototypes, housings' },
  { proc: 'Endlosfaser FDM', procEn: 'Cont. Fiber FDM', detail: 'Mittel', detailEn: 'Medium', speed: 'Mittel', speedEn: 'Medium', material: 'PA6+Fasern', materialEn: 'PA6+Fibers', cost: 'Mittel', costEn: 'Medium', best: 'Strukturbauteile', bestEn: 'Structural parts' },
  { proc: 'SLA', procEn: 'SLA', detail: 'Sehr hoch', detailEn: 'Very high', speed: 'Mittel', speedEn: 'Medium', material: 'Resin', materialEn: 'Resin', cost: 'Mittel', costEn: 'Medium', best: 'Schmuck, Dental', bestEn: 'Jewelry, dental' },
  { proc: 'DLP', procEn: 'DLP', detail: 'Sehr hoch', detailEn: 'Very high', speed: 'Schnell', speedEn: 'Fast', material: 'Resin', materialEn: 'Resin', cost: 'Mittel', costEn: 'Medium', best: 'Serien in Resin', bestEn: 'Series in resin' },
  { proc: 'SLS', procEn: 'SLS', detail: 'Hoch', detailEn: 'High', speed: 'Mittel', speedEn: 'Medium', material: 'PA12, PA11', materialEn: 'PA12, PA11', cost: 'Mittel', costEn: 'Medium', best: 'Komplexe Teile', bestEn: 'Complex parts' },
  { proc: 'MJF', procEn: 'MJF', detail: 'Hoch', detailEn: 'High', speed: 'Sehr schnell', speedEn: 'Very fast', material: 'PA12, TPU', materialEn: 'PA12, TPU', cost: 'Mittel', costEn: 'Medium', best: 'Serienteile', bestEn: 'Series parts' },
  { proc: 'Polyjet', procEn: 'Polyjet', detail: 'Höchste', detailEn: 'Highest', speed: 'Mittel', speedEn: 'Medium', material: 'Multi-Material', materialEn: 'Multi-Material', cost: 'Hoch', costEn: 'High', best: 'Designmodelle', bestEn: 'Design models' },
  { proc: 'CNC-Fräsen', procEn: 'CNC Milling', detail: 'Sehr hoch', detailEn: 'Very high', speed: 'Mittel', speedEn: 'Medium', material: 'Metall, Kunststoff', materialEn: 'Metal, plastic', cost: 'Hoch', costEn: 'High', best: 'Präzisionsteile', bestEn: 'Precision parts' },
];

const cadProblems = [
  { prob: 'Offene Flächen', probEn: 'Open Surfaces', desc: 'Flächenmodelle (Blender, SketchUp, ArchiCAD) haben oft offene Kanten. Lösung: Volumenmodell erstellen oder Daten aufbereiten lassen.', descEn: 'Surface models (Blender, SketchUp, ArchiCAD) often have open edges. Solution: Create solid model or have data prepared.' },
  { prob: 'Zu dünne Wandstärken', probEn: 'Walls Too Thin', desc: 'Wandstärken < 0,8 mm sind nicht druckbar. Empfehlung: Mindestens 1,2 mm für FDM, 0,5 mm für SLA.', descEn: 'Wall thicknesses < 0.8 mm are not printable. Recommendation: At least 1.2 mm for FDM, 0.5 mm for SLA.' },
  { prob: 'Falsche Maßeinheiten', probEn: 'Wrong Units', desc: 'Modell in falscher Einheit (mm vs. cm vs. inch). Immer Maßstab vor dem Export prüfen.', descEn: 'Model in wrong unit (mm vs. cm vs. inch). Always check scale before export.' },
  { prob: 'Überlappende Geometrien', probEn: 'Overlapping Geometries', desc: 'Sich überschneidende Körper können Druckfehler verursachen. Boolesche Vereinigung vor dem Export.', descEn: 'Intersecting bodies can cause print errors. Boolean union before export.' },
  { prob: 'Falsches Dateiformat', probEn: 'Wrong File Format', desc: 'Für 3D-Druck: STL oder 3MF. Für CNC: STEP oder IGES. Für Scan-Vergleich: STEP mit Nominalgeometrie.', descEn: 'For 3D printing: STL or 3MF. For CNC: STEP or IGES. For scan comparison: STEP with nominal geometry.' },
];

function GlossaryItem({ term, defDe, defEn }: { term: string; defDe: string; defEn: string }) {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-sm" style={{ color: 'var(--fabrica-anthrazit)' }}>{term}</span>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">
          {lang === 'en' ? defEn : defDe}
        </div>
      )}
    </div>
  );
}

export default function Basiswissen() {
  const { lang, t } = useLanguage();

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="py-16 md:py-24 text-white"
        style={{ background: 'linear-gradient(135deg, var(--fabrica-anthrazit) 0%, oklch(25% 0.05 260) 100%)' }}
      >
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t('Basiswissen', 'Knowledge Base')}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {t('Alles was Sie über 3D-Druck, CAD-Daten, Verfahren und Dateiformate wissen müssen – kompakt und verständlich erklärt.', 'Everything you need to know about 3D printing, CAD data, processes and file formats – explained compactly and understandably.')}
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-4xl">

        {/* 1. Volumenmodell */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {t('1. Was ist ein Volumenmodell?', '1. What is a Solid Model?')}
          </h2>
          <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
          <p className="text-gray-600 leading-relaxed mb-4">
            {t(
              'Für den 3D-Druck und die CNC-Bearbeitung wird ein Volumenmodell (Solid Model) benötigt – kein Flächenmodell. Ein Volumenmodell beschreibt einen geschlossenen, wasserdichten Körper mit definierten Innen- und Außenflächen.',
              'For 3D printing and CNC machining, a solid model is required – not a surface model. A solid model describes a closed, watertight body with defined inner and outer surfaces.'
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border-l-4 border-green-500 bg-green-50">
              <p className="font-semibold text-green-800 mb-2">{t('✓ Geeignete Formate', '✓ Suitable Formats')}</p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>STEP (.stp, .step) – {t('Empfohlen', 'Recommended')}</li>
                <li>STL (.stl) – {t('Für 3D-Druck', 'For 3D printing')}</li>
                <li>3MF (.3mf) – {t('Modernes 3D-Druckformat', 'Modern 3D print format')}</li>
                <li>IGES (.igs) – {t('Für CNC', 'For CNC')}</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border-l-4 border-red-400 bg-red-50">
              <p className="font-semibold text-red-800 mb-2">{t('⚠ Problematische Formate', '⚠ Problematic Formats')}</p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>DWG/DXF – {t('2D-Format, nicht für 3D', '2D format, not for 3D')}</li>
                <li>SKP (SketchUp) – {t('Oft offene Flächen', 'Often open surfaces')}</li>
                <li>OBJ – {t('Nur Oberfläche, kein Volumen', 'Surface only, no volume')}</li>
                <li>ArchiCAD/Revit – {t('Aufbereitung nötig', 'Preparation needed')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Häufige CAD-Probleme */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {t('2. Häufige CAD-Probleme', '2. Common CAD Problems')}
          </h2>
          <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
          <div className="space-y-4">
            {cadProblems.map((p) => (
              <div key={p.prob} className="p-4 border rounded-lg">
                <div className="font-bold text-sm mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {lang === 'en' ? p.probEn : p.prob}
                </div>
                <p className="text-sm text-gray-600">{lang === 'en' ? p.descEn : p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--fabrica-gray)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Daten nicht verwendbar?', 'Data not usable?')}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {t('Fabrica bietet professionelle Datenaufbereitung an. Schicken Sie uns Ihre Daten und wir prüfen sie kostenlos.', 'Fabrica offers professional data preparation. Send us your data and we will check it free of charge.')}
            </p>
          </div>
        </section>

        {/* 3. Software-Übersicht */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {t('3. Software-Übersicht', '3. Software Overview')}
          </h2>
          <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
          <div className="overflow-x-auto rounded-lg border">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t('Software', 'Software')}</th>
                  <th>{t('Typ', 'Type')}</th>
                  <th>{t('Eignung 3D-Druck', '3D Print Suitability')}</th>
                  <th>{t('Kosten', 'Cost')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sw: 'Fusion 360', type: t('Parametrisches CAD', 'Parametric CAD'), suit: t('Sehr gut', 'Very good'), cost: t('Kostenlos (Hobby)', 'Free (Hobby)') },
                  { sw: 'SolidWorks', type: t('Parametrisches CAD', 'Parametric CAD'), suit: t('Sehr gut', 'Very good'), cost: t('Kostenpflichtig', 'Paid') },
                  { sw: 'FreeCAD', type: t('Parametrisches CAD', 'Parametric CAD'), suit: t('Gut', 'Good'), cost: t('Kostenlos', 'Free') },
                  { sw: 'Blender', type: t('Polygonmodellierung', 'Polygon Modeling'), suit: t('Aufbereitung nötig', 'Preparation needed'), cost: t('Kostenlos', 'Free') },
                  { sw: 'Rhino', type: t('NURBS/Flächen', 'NURBS/Surfaces'), suit: t('Aufbereitung nötig', 'Preparation needed'), cost: t('Kostenpflichtig', 'Paid') },
                  { sw: 'SketchUp', type: t('Architektur', 'Architecture'), suit: t('Aufbereitung nötig', 'Preparation needed'), cost: t('Kostenlos/Paid', 'Free/Paid') },
                  { sw: 'ArchiCAD', type: t('Architektur (BIM)', 'Architecture (BIM)'), suit: t('Aufbereitung nötig', 'Preparation needed'), cost: t('Kostenpflichtig', 'Paid') },
                ].map((r) => (
                  <tr key={r.sw}>
                    <td className="font-semibold">{r.sw}</td>
                    <td>{r.type}</td>
                    <td>{r.suit}</td>
                    <td>{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Verfahrensauswahl */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {t('4. Welches Verfahren passt zu meinem Projekt?', '4. Which Process Suits My Project?')}
          </h2>
          <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
          <div className="overflow-x-auto rounded-lg border">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t('Verfahren', 'Process')}</th>
                  <th>{t('Detailgrad', 'Detail Level')}</th>
                  <th>{t('Geschwindigkeit', 'Speed')}</th>
                  <th>{t('Material', 'Material')}</th>
                  <th>{t('Kosten', 'Cost')}</th>
                  <th>{t('Ideal für', 'Ideal for')}</th>
                </tr>
              </thead>
              <tbody>
                {processComparison.map((r) => (
                  <tr key={r.proc}>
                    <td className="font-semibold">{lang === 'en' ? r.procEn : r.proc}</td>
                    <td>{lang === 'en' ? r.detailEn : r.detail}</td>
                    <td>{lang === 'en' ? r.speedEn : r.speed}</td>
                    <td>{lang === 'en' ? r.materialEn : r.material}</td>
                    <td>{lang === 'en' ? r.costEn : r.cost}</td>
                    <td>{lang === 'en' ? r.bestEn : r.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Glossar */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {t('5. Glossar', '5. Glossary')}
          </h2>
          <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
          <div className="border rounded-lg overflow-hidden">
            {glossary.map((g) => (
              <GlossaryItem key={g.de} term={g.de} defDe={g.defDe} defEn={g.defEn} />
            ))}
          </div>
        </section>

        {/* 6. Upload CTA */}
        <section>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {t('6. Bereit für Ihre Anfrage?', '6. Ready for Your Request?')}
          </h2>
          <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
          <div className="p-8 rounded-xl text-white text-center" style={{ backgroundColor: 'var(--fabrica-red)' }}>
            <Upload size={32} className="mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">{t('Datei hochladen und Angebot erhalten', 'Upload File and Get Quote')}</h3>
            <p className="text-white/80 mb-5 text-sm">{t('Laden Sie Ihre CAD-Datei hoch. Wir prüfen sie kostenlos und senden Ihnen innerhalb von 24 Stunden ein verbindliches Angebot.', 'Upload your CAD file. We will check it free of charge and send you a binding quote within 24 hours.')}</p>
            <Link href="/upload" className="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded" style={{ color: 'var(--fabrica-red)' }}>
              <Upload size={16} />
              {t('Jetzt Datei hochladen', 'Upload File Now')}
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
