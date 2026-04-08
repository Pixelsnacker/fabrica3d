import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Endlosfaser() {
  const { t } = useLanguage();

  return (
    <TechPageLayout
      title="Endlosfaser FDM"
      titleEn="Continuous Fiber FDM"
      subtitle="Festigkeit wie Aluminium – Gewicht wie Kunststoff. Unser wichtigstes Alleinstellungsmerkmal für Hochleistungsbauteile."
      subtitleEn="Strength like aluminum – weight like plastic. Our most important unique selling point for high-performance components."
      mailtoSubject="Anfrage%20Endlosfaser%20FDM"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_endlosfaser_panorama-RYDpxAcwVpo3HiGRMocvPJ.webp"
      heroColor="oklch(35% 0.18 25)"
      badge="Spezialität"
      badgeEn="Specialty"
      caseStudies={[
        {
          title: 'Strukturbauteil Automotive',
          titleEn: 'Automotive Structural Component',
          industry: 'Automotive',
          industryEn: 'Automotive',
          challenge: 'Leichte Halterung für Fahrzeugchassis mit hoher Steifigkeit und Crashsicherheit.',
          challengeEn: 'Lightweight bracket for vehicle chassis with high stiffness and crash safety.',
          solution: 'Endlosfaser-FDM mit Kohlefaser-Verstärkung in PA6-Matrix, optimiertes Faserrouting.',
          solutionEn: 'Continuous fiber FDM with carbon fiber reinforcement in PA6 matrix, optimized fiber routing.',
          result: '65% Gewichtsreduktion gegenüber Aluminium, gleiche Steifigkeit, Lieferzeit 5 Tage.',
          resultEn: '65% weight reduction compared to aluminum, same stiffness, delivery time 5 days.',
        },
        {
          title: 'Roboterarm-Komponente',
          titleEn: 'Robot Arm Component',
          industry: 'Automatisierung',
          industryEn: 'Automation',
          challenge: 'Roboterarm-Segment mit minimalem Gewicht für höhere Dynamik und Präzision.',
          challengeEn: 'Robot arm segment with minimal weight for higher dynamics and precision.',
          solution: 'Kevlar-verstärktes FDM für optimale Schlagzähigkeit und Gewichtsminimierung.',
          solutionEn: 'Kevlar-reinforced FDM for optimal impact resistance and weight minimization.',
          result: 'Zykluszeit um 30% verbessert durch reduzierte Massenträgheit.',
          resultEn: 'Cycle time improved by 30% through reduced mass inertia.',
        },
        {
          title: 'Luft- und Raumfahrt Halterung',
          titleEn: 'Aerospace Bracket',
          industry: 'Luft- und Raumfahrt',
          industryEn: 'Aerospace',
          challenge: 'Zertifizierungsrelevantes Bauteil mit engen Toleranzen und extremen Festigkeitsanforderungen.',
          challengeEn: 'Certification-relevant component with tight tolerances and extreme strength requirements.',
          solution: 'Kohlefaser-Endlosfaser mit optimiertem Lagenaufbau und Qualitätsdokumentation.',
          solutionEn: 'Carbon fiber continuous fiber with optimized layer structure and quality documentation.',
          result: 'Bauteil bestand alle Belastungstests, Gewicht 40% unter Aluminium-Referenz.',
          resultEn: 'Component passed all load tests, weight 40% below aluminum reference.',
        },
      ]}
    >
      {/* Hero highlight */}
      <div
        className="p-6 rounded-xl mb-10 text-white"
        style={{ background: 'linear-gradient(135deg, var(--fabrica-red) 0%, var(--fabrica-red-dark) 100%)' }}
      >
        <div className="text-sm font-bold uppercase tracking-widest mb-2 text-white/70">
          {t('Unser Alleinstellungsmerkmal', 'Our Unique Selling Point')}
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {t('Festigkeit vergleichbar mit Aluminium – bei deutlich geringerem Gewicht', 'Strength comparable to aluminum – at significantly lower weight')}
        </h2>
        <p className="text-white/80 text-sm leading-relaxed">
          {t(
            'Durch das Einbetten von Endlosfasern in eine thermoplastische Matrix entstehen Bauteile, die in Steifigkeit und Festigkeit mit metallischen Werkstoffen konkurrieren können – bei einem Bruchteil des Gewichts.',
            'By embedding continuous fibers in a thermoplastic matrix, components are created that can compete with metallic materials in stiffness and strength – at a fraction of the weight.'
          )}
        </p>
      </div>

      {/* Technology description */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Technologie & Funktionsprinzip', 'Technology & Operating Principle')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t(
                'Beim Endlosfaser-FDM-Druck werden kontinuierliche Faserstränge (Kohlefaser, Glasfaser oder Kevlar) gleichzeitig mit dem Basiskunststoff PA6 (Polyamid 6) verarbeitet. Die Fasern werden präzise in die Bauteilstruktur eingebettet und folgen dem optimierten Kraftfluss.',
                'In continuous fiber FDM printing, continuous fiber strands (carbon fiber, fiberglass or Kevlar) are processed simultaneously with the base plastic PA6 (Polyamide 6). The fibers are precisely embedded in the component structure and follow the optimized force flow.'
              )}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t(
                'Das Ergebnis sind Bauteile mit anisotropen Eigenschaften, die gezielt auf die Belastungsrichtung ausgerichtet werden können – ähnlich wie bei kohlefaserverstärkten Kunststoffen (CFK) in der Luft- und Raumfahrt.',
                'The result is components with anisotropic properties that can be specifically aligned to the direction of loading – similar to carbon fiber reinforced plastics (CFRP) in aerospace.'
              )}
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: t('Basismatrix', 'Base Matrix'), value: 'PA6 (Polyamid 6)' },
              { label: t('Schichtdicke', 'Layer Thickness'), value: 'ab 0,1 mm' },
              { label: t('Maßgenauigkeit', 'Dimensional Accuracy'), value: '±0,3 mm' },
              { label: t('Maximale Baugröße', 'Max Build Size'), value: '320 × 132 × 154 mm' },
              { label: t('Faserarten', 'Fiber Types'), value: t('Kohlefaser, Glasfaser, Kevlar', 'Carbon Fiber, Fiberglass, Kevlar') },
            ].map((spec) => (
              <div key={spec.label} className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium text-gray-700">{spec.label}</span>
                <span className="text-sm text-gray-500">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fiber types */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Verstärkungsmaterialien', 'Reinforcement Materials')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: t('Kohlefaser / Carbon Fiber', 'Carbon Fiber'),
              color: '#1a1a1a',
              props: [
                t('Höchste Steifigkeit und Festigkeit', 'Highest stiffness and strength'),
                t('Optimaler Leichtbau', 'Optimal lightweight construction'),
                t('Elektrisch leitfähig', 'Electrically conductive'),
                t('Ideal für Strukturbauteile', 'Ideal for structural components'),
              ],
              propsEn: [
                'Highest stiffness and strength',
                'Optimal lightweight construction',
                'Electrically conductive',
                'Ideal for structural components',
              ],
            },
            {
              name: t('Glasfaser / Fiberglass', 'Fiberglass'),
              color: '#4a90d9',
              props: [
                t('Gutes Preis-Leistungs-Verhältnis', 'Good price-performance ratio'),
                t('Elektrisch isolierend', 'Electrically insulating'),
                t('Chemikalienbeständig', 'Chemical resistant'),
                t('Für allgemeine Verstärkung', 'For general reinforcement'),
              ],
              propsEn: [
                'Good price-performance ratio',
                'Electrically insulating',
                'Chemical resistant',
                'For general reinforcement',
              ],
            },
            {
              name: t('Kevlar / Aramid', 'Kevlar / Aramid'),
              color: '#f5a623',
              props: [
                t('Hohe Schlagzähigkeit', 'High impact resistance'),
                t('Flexibel und schnittfest', 'Flexible and cut-resistant'),
                t('Geringes Gewicht', 'Low weight'),
                t('Für dynamische Belastungen', 'For dynamic loads'),
              ],
              propsEn: [
                'High impact resistance',
                'Flexible and cut-resistant',
                'Low weight',
                'For dynamic loads',
              ],
            },
          ].map((fiber) => (
            <div key={fiber.name} className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: fiber.color }} />
                <h3 className="font-bold" style={{ color: 'var(--fabrica-anthrazit)' }}>{fiber.name}</h3>
              </div>
              <ul className="space-y-2">
                {fiber.props.map((prop, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {prop}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Vergleich: Endlosfaser FDM vs. Standard FDM vs. Aluminium', 'Comparison: Continuous Fiber FDM vs. Standard FDM vs. Aluminum')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead>
              <tr>
                <th>{t('Eigenschaft', 'Property')}</th>
                <th>{t('Endlosfaser FDM', 'Continuous Fiber FDM')}</th>
                <th>{t('Standard FDM', 'Standard FDM')}</th>
                <th>Aluminium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('Zugfestigkeit', 'Tensile Strength')}</td>
                <td className="font-semibold text-green-700">800+ MPa (CF)</td>
                <td>50–80 MPa</td>
                <td>310 MPa</td>
              </tr>
              <tr>
                <td>{t('Gewicht (Dichte)', 'Weight (Density)')}</td>
                <td className="font-semibold text-green-700">1,4 g/cm³</td>
                <td>1,1–1,3 g/cm³</td>
                <td>2,7 g/cm³</td>
              </tr>
              <tr>
                <td>{t('Kosten (relativ)', 'Cost (relative)')}</td>
                <td>Mittel</td>
                <td className="font-semibold text-green-700">Niedrig</td>
                <td>Hoch</td>
              </tr>
              <tr>
                <td>{t('Lieferzeit', 'Delivery Time')}</td>
                <td className="font-semibold text-green-700">3–7 Tage</td>
                <td className="font-semibold text-green-700">1–5 Tage</td>
                <td>2–8 Wochen</td>
              </tr>
              <tr>
                <td>{t('Designfreiheit', 'Design Freedom')}</td>
                <td className="font-semibold text-green-700">Sehr hoch</td>
                <td className="font-semibold text-green-700">Sehr hoch</td>
                <td>Eingeschränkt</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Applications */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Anwendungsbereiche', 'Applications')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { de: 'Strukturbauteile', en: 'Structural Components' },
            { de: 'Halterungen & Brackets', en: 'Brackets & Fixtures' },
            { de: 'Ersatzteile', en: 'Spare Parts' },
            { de: 'Automotive', en: 'Automotive' },
            { de: 'Maschinenbau', en: 'Mechanical Engineering' },
            { de: 'Luft- und Raumfahrt', en: 'Aerospace' },
            { de: 'Robotik', en: 'Robotics' },
            { de: 'Medizintechnik', en: 'Medical Technology' },
            { de: 'Sportgeräte', en: 'Sports Equipment' },
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
    </TechPageLayout>
  );
}
