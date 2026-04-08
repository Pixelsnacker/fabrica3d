import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MJF() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="MJF-Druck"
      titleEn="MJF Printing"
      subtitle="Multi Jet Fusion von HP – schneller als SLS, isotrope Eigenschaften, ideal für Serienproduktion."
      subtitleEn="Multi Jet Fusion by HP – faster than SLS, isotropic properties, ideal for series production."
      mailtoSubject="Anfrage%20MJF-Druck"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_mjf_panorama-9SsUkwhULkNZXS2AmwkEUJ.webp"
      heroColor="oklch(20% 0.05 230)"
      caseStudies={[
        { title: 'Serienproduktion Funktionsteile', titleEn: 'Series Production Functional Parts', industry: 'Industrie', industryEn: 'Industry', challenge: 'Serienproduktion von 1000 Funktionsteilen mit isotropen Eigenschaften.', challengeEn: 'Series production of 1000 functional parts with isotropic properties.', solution: 'MJF PA12 mit optimiertem Nestingfaktor für maximale Packungsdichte.', solutionEn: 'MJF PA12 with optimized nesting factor for maximum packing density.', result: '1000 Teile in 5 Tagen, gleichmäßige Eigenschaften in alle Richtungen.', resultEn: '1000 parts in 5 days, uniform properties in all directions.' },
        { title: 'Komplexe Baugruppe mit TPU', titleEn: 'Complex Assembly with TPU', industry: 'Konsumgüter', industryEn: 'Consumer Goods', challenge: 'Flexible Dichtungsbaugruppe mit komplexer Geometrie.', challengeEn: 'Flexible sealing assembly with complex geometry.', solution: 'MJF TPU für optimale Elastizität und Maßhaltigkeit.', solutionEn: 'MJF TPU for optimal elasticity and dimensional accuracy.', result: 'Perfekte Dichtwirkung, Serienreife in 3 Iterationen.', resultEn: 'Perfect sealing effect, series readiness in 3 iterations.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('MJF vs. SLS – Der Unterschied', 'MJF vs. SLS – The Difference')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">{t('MJF (Multi Jet Fusion) von HP verwendet Infrarot-Energie und spezielle Fusing- und Detailing-Agenten, um Pulverschichten zu verschmelzen. Im Vergleich zu SLS ist MJF schneller, liefert bessere Oberflächenqualität und isotrope mechanische Eigenschaften.', 'MJF (Multi Jet Fusion) by HP uses infrared energy and special fusing and detailing agents to fuse powder layers. Compared to SLS, MJF is faster, delivers better surface quality and isotropic mechanical properties.')}</p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Eigenschaft', 'Property')}</th><th>MJF</th><th>SLS</th></tr></thead>
            <tbody>
              <tr><td>{t('Geschwindigkeit', 'Speed')}</td><td className="text-green-700 font-semibold">{t('Schneller', 'Faster')}</td><td>{t('Mittel', 'Medium')}</td></tr>
              <tr><td>{t('Oberflächenqualität', 'Surface Quality')}</td><td className="text-green-700 font-semibold">{t('Besser', 'Better')}</td><td>{t('Gut', 'Good')}</td></tr>
              <tr><td>{t('Mechanische Eigenschaften', 'Mechanical Properties')}</td><td className="text-green-700 font-semibold">{t('Isotrop', 'Isotropic')}</td><td>{t('Leicht anisotrop', 'Slightly anisotropic')}</td></tr>
              <tr><td>{t('Schichtdicke', 'Layer Thickness')}</td><td>0,08 mm</td><td>0,1 mm</td></tr>
              <tr><td>{t('Kosten (Kleinserie)', 'Cost (Small Series)')}</td><td>{t('Mittel', 'Medium')}</td><td>{t('Mittel', 'Medium')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Materialien', 'Materials')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { mat: 'PA12', desc: t('Standard, ausgezeichnete mechanische Eigenschaften, breite Anwendung', 'Standard, excellent mechanical properties, wide application') },
            { mat: 'PA12 GB (glasgefüllt)', desc: t('Erhöhte Steifigkeit und Wärmeformbeständigkeit durch Glasfüller', 'Increased stiffness and heat deflection through glass filler') },
            { mat: 'PA11', desc: t('Biobasiert, bessere Schlagzähigkeit als PA12, ideal für flexible Funktionsteile – besonders empfohlen', 'Bio-based, better impact resistance than PA12, ideal for flexible functional parts – especially recommended') },
            { mat: 'TPU', desc: t('Flexibel, gummiartig, für Dichtungen, Griffe und flexible Bauteile', 'Flexible, rubber-like, for seals, grips and flexible components') },
          ].map((m) => (
            <div key={m.mat} className="p-5 border rounded-lg">
              <div className="font-bold mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                {m.mat}
                {m.mat === 'PA11' && <span className="ml-2 text-xs px-2 py-0.5 rounded font-bold text-white" style={{ backgroundColor: 'var(--fabrica-red)' }}>Empfohlen</span>}
              </div>
              <div className="text-sm text-gray-500">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </TechPageLayout>
  );
}
