import TechPageLayout from '@/components/TechPageLayout';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FDM() {
  const { data: imgData } = trpc.images.getByKey.useQuery({ imageKey: 'print_fdm' }, { staleTime: 5 * 60 * 1000, retry: false });
  const { t } = useLanguage();

  return (
    <TechPageLayout
      title="FDM-Druck"
      titleEn="FDM Printing"
      subtitle="Schmelzschichtverfahren mit breiter Materialauswahl – ideal für Prototypen, Funktionsteile und Gehäuse."
      subtitleEn="Fused Deposition Modeling with a wide range of materials – ideal for prototypes, functional parts and housings."
      mailtoSubject="Anfrage%20FDM-Druck"
      heroImage={imgData?.url ?? '/api/img?url=https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/fdm_industrial_printer_markforged_fx20_8cfeacca.jpg'}
      heroColor="oklch(22% 0.01 260)"
      caseStudies={[
        {
          title: 'Gehäuseprototyp Elektronik',
          titleEn: 'Electronics Housing Prototype',
          industry: 'Elektronik',
          industryEn: 'Electronics',
          challenge: 'Schnelle Prototypenentwicklung für ein Elektronikgehäuse mit komplexen Innenstrukturen.',
          challengeEn: 'Rapid prototype development for an electronics housing with complex internal structures.',
          solution: 'FDM-Druck in ABS mit angepassten Wandstärken und Montagepunkten.',
          solutionEn: 'FDM printing in ABS with adapted wall thicknesses and mounting points.',
          result: 'Funktionsfähiger Prototyp in 48 Stunden, 3 Iterationen bis zur Serienreife.',
          resultEn: 'Functional prototype in 48 hours, 3 iterations to production readiness.',
        },
        {
          title: 'Halterung Maschinenbau',
          titleEn: 'Mechanical Engineering Bracket',
          industry: 'Maschinenbau',
          industryEn: 'Mechanical Engineering',
          challenge: 'Ersatzteil für Produktionsanlage nicht mehr lieferbar.',
          challengeEn: 'Spare part for production system no longer available.',
          solution: 'Reverse Engineering und FDM-Druck in PETG für chemische Beständigkeit.',
          solutionEn: 'Reverse engineering and FDM printing in PETG for chemical resistance.',
          result: 'Lieferung in 5 Werktagen, Kosten 90% geringer als Neubeschaffung.',
          resultEn: 'Delivery in 5 working days, costs 90% lower than new procurement.',
        },
      ]}
    >
      {/* Technology description */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Was ist FDM-Druck?', 'What is FDM Printing?')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t(
                'FDM (Fused Deposition Modeling), auch FFF (Fused Filament Fabrication) genannt, ist das am weitesten verbreitete 3D-Druckverfahren. Ein thermoplastischer Kunststoff wird erhitzt und schichtweise aufgetragen, um dreidimensionale Objekte aufzubauen.',
                'FDM (Fused Deposition Modeling), also known as FFF (Fused Filament Fabrication), is the most widely used 3D printing process. A thermoplastic material is heated and deposited layer by layer to build three-dimensional objects.'
              )}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t(
                'Das Verfahren überzeugt durch seine breite Materialauswahl, gute mechanische Eigenschaften und wirtschaftliche Fertigung. Es eignet sich besonders für Prototypen, Funktionsteile und Kleinserien.',
                'The process impresses with its wide range of materials, good mechanical properties and economical production. It is particularly suitable for prototypes, functional parts and small series.'
              )}
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: t('Schichtdicke', 'Layer Thickness'), value: 'ab 0,1 mm / from 0.1 mm' },
              { label: t('Maßgenauigkeit', 'Dimensional Accuracy'), value: '±0,3 mm' },
              { label: t('Maximale Baugröße', 'Max Build Size'), value: '600 × 600 × 600 mm' },
              { label: t('Nachbearbeitung', 'Post-processing'), value: t('Schleifen, Lackieren, Beschichten', 'Sanding, Painting, Coating') },
            ].map((spec) => (
              <div key={spec.label} className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium text-gray-700">{spec.label}</span>
                <span className="text-sm text-gray-500">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markforged Mark Two */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Unser Drucker: Markforged Mark Two', 'Our Printer: Markforged Mark Two')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t(
                'Bei Fabrica setzen wir auf den Markforged Mark Two – einen der leistungsfähigsten Industrie-FDM-Drucker für Endlosfaser-Verbundwerkstoffe. Er kombiniert das FFF-Verfahren (Fused Filament Fabrication) mit der patentierten CFF-Technologie (Continuous Fiber Fabrication), bei der kontinuierliche Kohlenstoff-, Glas- oder Kevlar-Fasern direkt in das Bauteil eingebettet werden.',
                'At Fabrica, we use the Markforged Mark Two – one of the most powerful industrial FDM printers for continuous fiber composites. It combines the FFF process with patented CFF technology (Continuous Fiber Fabrication), embedding continuous carbon, glass or Kevlar fibers directly into the part.'
              )}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t(
                'Das Ergebnis: Bauteile mit bis zu 26-facher Festigkeit gegenüber ABS – bei gleichzeitig deutlich geringerem Gewicht als Aluminium. Der Mark Two druckt mit dem Hochleistungsmaterial Onyx (mikrokarbongefülltes Nylon) als Basiswerkstoff und verstärkt ihn optional mit Endlosfasern für strukturelle Anwendungen.',
                'The result: parts with up to 26x the strength of ABS – while being significantly lighter than aluminum. The Mark Two prints with Onyx (micro carbon-filled nylon) as the base material and optionally reinforces it with continuous fibers for structural applications.'
              )}
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: t('Technologie', 'Technology'), value: 'FFF + CFF (Endlosfaser / Continuous Fiber)' },
              { label: t('Bauraum', 'Build Volume'), value: '320 × 132 × 154 mm' },
              { label: t('Schichtdicke', 'Layer Thickness'), value: '0,1 – 0,25 mm' },
              { label: t('Basismaterial', 'Base Material'), value: 'Onyx (Mikro-Carbon-Nylon)' },
              { label: t('Fasern', 'Fibers'), value: t('Kohlefaser, Glasfaser, Kevlar, HSHT-Glasfaser', 'Carbon Fiber, Fiberglass, Kevlar, HSHT Fiberglass') },
              { label: t('Festigkeit vs. ABS', 'Strength vs. ABS'), value: t('bis zu 26×', 'up to 26×') },
            ].map((spec) => (
              <div key={spec.label} className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium text-gray-700">{spec.label}</span>
                <span className="text-sm text-gray-500 text-right max-w-[55%]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical specs table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Technische Spezifikationen', 'Technical Specifications')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead>
              <tr>
                <th>{t('Parameter', 'Parameter')}</th>
                <th>{t('Wert', 'Value')}</th>
                <th>{t('Hinweis', 'Note')}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>{t('Schichtdicke', 'Layer Thickness')}</td><td>0,1 – 0,4 mm</td><td>{t('Je nach Material und Düse', 'Depending on material and nozzle')}</td></tr>
              <tr><td>{t('Maßgenauigkeit', 'Dimensional Accuracy')}</td><td>±0,3 mm</td><td>{t('Standardwert, materialabhängig', 'Standard value, material dependent')}</td></tr>
              <tr><td>{t('Wandstärke min.', 'Min. Wall Thickness')}</td><td>0,8 mm</td><td>{t('Empfohlen: ≥ 1,2 mm', 'Recommended: ≥ 1.2 mm')}</td></tr>
              <tr><td>{t('Infill', 'Infill')}</td><td>10 – 100 %</td><td>{t('Anpassbar je nach Anforderung', 'Adjustable per requirement')}</td></tr>
              <tr><td>{t('Stützstrukturen', 'Support Structures')}</td><td>{t('Ja, bei Überhängen > 45°', 'Yes, for overhangs > 45°')}</td><td>{t('Entfernbar, Oberfläche nachbearbeiten', 'Removable, surface post-processing')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Applications */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Typische Anwendungsbereiche', 'Typical Applications')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { de: 'Prototypen', en: 'Prototypes' },
            { de: 'Funktionsteile', en: 'Functional Parts' },
            { de: 'Gehäuse & Halterungen', en: 'Housings & Brackets' },
            { de: 'Ersatzteile', en: 'Spare Parts' },
            { de: 'Vorrichtungen & Lehren', en: 'Jigs & Fixtures' },
            { de: 'Verpackungsprototypen', en: 'Packaging Prototypes' },
            { de: 'Anschauungsmodelle', en: 'Display Models' },
            { de: 'Kleinserien', en: 'Small Series' },
          ].map((app) => (
            <div
              key={app.de}
              className="p-3 rounded-lg text-center text-sm font-medium border"
              style={{ color: 'var(--fabrica-anthrazit)' }}
            >
              {app.de}
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Materialien', 'Materials')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { mat: 'PLA', desc: t('Einfach zu drucken, biologisch abbaubar, für Prototypen', 'Easy to print, biodegradable, for prototypes'), color: '#4CAF50' },
            { mat: 'PETG', desc: t('Chemikalienbeständig, lebensmittelecht möglich, zäh', 'Chemical resistant, food-safe possible, tough'), color: '#2196F3' },
            { mat: 'ABS', desc: t('Hitzebeständig, schlagzäh, gut nachbearbeitbar', 'Heat resistant, impact resistant, easy to post-process'), color: '#FF9800' },
            { mat: 'ASA', desc: t('UV-beständig, witterungsfest, für Außenanwendungen', 'UV resistant, weatherproof, for outdoor applications'), color: '#9C27B0' },
            { mat: 'TPU', desc: t('Flexibel, gummiartig, für Dichtungen und Griffe', 'Flexible, rubber-like, for seals and grips'), color: '#F44336' },
            { mat: 'PA (Nylon)', desc: t('Hohe Festigkeit, chemikalienbeständig, für Funktionsteile', 'High strength, chemical resistant, for functional parts'), color: '#607D8B' },
          ].map((m) => (
            <div key={m.mat} className="flex items-start gap-3 p-4 border rounded-lg">
              <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: m.color }} />
              <div>
                <div className="font-bold text-sm" style={{ color: 'var(--fabrica-anthrazit)' }}>{m.mat}</div>
                <div className="text-xs text-gray-500 mt-0.5">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </TechPageLayout>
  );
}
