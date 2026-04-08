import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DLP() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="DLP-Druck"
      titleEn="DLP Printing"
      subtitle="Digital Light Processing – schneller als SLA bei vergleichbarer Qualität. Ideal für Serienteile in Resin."
      subtitleEn="Digital Light Processing – faster than SLA at comparable quality. Ideal for series parts in resin."
      mailtoSubject="Anfrage%20DLP-Druck"
      heroColor="oklch(28% 0.12 280)"
      caseStudies={[
        { title: 'Schmuck-Kleinserie', titleEn: 'Jewelry Small Series', industry: 'Schmuck', industryEn: 'Jewelry', challenge: 'Serienproduktion von 500 Schmuckmodellen für Guss.', challengeEn: 'Series production of 500 jewelry models for casting.', solution: 'DLP mit castable Resin, 10x schneller als SLA bei gleicher Qualität.', solutionEn: 'DLP with castable resin, 10x faster than SLA at the same quality.', result: '500 Teile in 3 Tagen, Kosten 40% unter SLA-Einzelfertigung.', resultEn: '500 parts in 3 days, costs 40% below SLA individual production.' },
        { title: 'Dental-Schienen Serienfertigung', titleEn: 'Dental Splint Series Production', industry: 'Dental', industryEn: 'Dental', challenge: 'Tagesproduktion von 50+ individuellen Zahnschienen.', challengeEn: 'Daily production of 50+ individual dental splints.', solution: 'DLP mit dental-zertifiziertem Resin, automatisierter Workflow.', solutionEn: 'DLP with dental-certified resin, automated workflow.', result: '50 Schienen täglich, Toleranz ±0,05 mm, vollständig reproduzierbar.', resultEn: '50 splints daily, tolerance ±0.05 mm, fully reproducible.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('DLP vs. SLA – Der Unterschied', 'DLP vs. SLA – The Difference')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">{t('Während SLA einen Laser-Punkt verwendet, der die Schicht abfährt, belichtet DLP eine gesamte Schicht gleichzeitig mit einem digitalen Lichtprojektor. Das macht DLP deutlich schneller, besonders bei flachen oder breiten Bauteilen.', 'While SLA uses a laser point that scans the layer, DLP exposes an entire layer simultaneously with a digital light projector. This makes DLP significantly faster, especially for flat or wide components.')}</p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Eigenschaft', 'Property')}</th><th>DLP</th><th>SLA</th></tr></thead>
            <tbody>
              <tr><td>{t('Geschwindigkeit', 'Speed')}</td><td className="text-green-700 font-semibold">{t('Sehr schnell', 'Very fast')}</td><td>{t('Mittel', 'Medium')}</td></tr>
              <tr><td>{t('Detailgenauigkeit', 'Detail Accuracy')}</td><td>{t('Sehr hoch', 'Very high')}</td><td className="text-green-700 font-semibold">{t('Höchste', 'Highest')}</td></tr>
              <tr><td>{t('Schichtdicke', 'Layer Thickness')}</td><td>ab 0,025 mm</td><td>ab 0,025 mm</td></tr>
              <tr><td>{t('Serieneignung', 'Series Suitability')}</td><td className="text-green-700 font-semibold">{t('Sehr gut', 'Very good')}</td><td>{t('Gut', 'Good')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Materialien', 'Materials')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { mat: 'Standard Resin', desc: t('Für Prototypen, glatte Oberfläche', 'For prototypes, smooth surface') },
            { mat: 'Castable Resin', desc: t('Für Schmuck- und Metallguss', 'For jewelry and metal casting') },
            { mat: 'Dental Resin', desc: t('Biokompatibel, für Zahnmedizin', 'Biocompatible, for dentistry') },
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
