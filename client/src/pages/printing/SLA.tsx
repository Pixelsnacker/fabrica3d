import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SLA() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="SLA-Druck"
      titleEn="SLA Printing"
      subtitle="Stereolithografie – höchste Oberflächenqualität und feinste Details für anspruchsvolle Anwendungen."
      subtitleEn="Stereolithography – highest surface quality and finest details for demanding applications."
      mailtoSubject="Anfrage%20SLA-Druck"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sla_panorama-XGVXRKSsM2Tz8j8vCESQwj.webp"
      heroColor="oklch(30% 0.15 260)"
      caseStudies={[
        { title: 'Schmuckprototyp', titleEn: 'Jewelry Prototype', industry: 'Schmuck', industryEn: 'Jewelry', challenge: 'Filigrane Schmuckstücke mit höchster Detailtreue für Gussformen.', challengeEn: 'Filigree jewelry with highest detail accuracy for casting molds.', solution: 'SLA-Druck in castable Resin mit 0,025 mm Schichtdicke.', solutionEn: 'SLA printing in castable resin with 0.025 mm layer thickness.', result: 'Perfekte Gussqualität, Designzyklus von Wochen auf 2 Tage reduziert.', resultEn: 'Perfect casting quality, design cycle reduced from weeks to 2 days.' },
        { title: 'Zahntechnisches Modell', titleEn: 'Dental Model', industry: 'Zahntechnik', industryEn: 'Dental', challenge: 'Präzise Zahnmodelle für Kieferorthopädie mit engen Toleranzen.', challengeEn: 'Precise dental models for orthodontics with tight tolerances.', solution: 'SLA mit dental-zertifiziertem Resin, Toleranz ±0,01 mm.', solutionEn: 'SLA with dental-certified resin, tolerance ±0.01 mm.', result: 'Passgenaue Modelle, Produktionszeit 80% kürzer als konventionell.', resultEn: 'Perfectly fitting models, production time 80% shorter than conventional.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Was ist SLA-Druck?', 'What is SLA Printing?')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">{t('Stereolithografie (SLA) ist ein lichtbasiertes 3D-Druckverfahren, bei dem ein UV-Laser flüssiges Photopolymer-Resin schichtweise aushärtet. Das Verfahren liefert die höchste Oberflächenqualität und feinste Details aller 3D-Druckverfahren.', 'Stereolithography (SLA) is a light-based 3D printing process in which a UV laser cures liquid photopolymer resin layer by layer. The process delivers the highest surface quality and finest details of all 3D printing processes.')}</p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Parameter', 'Parameter')}</th><th>{t('Wert', 'Value')}</th></tr></thead>
            <tbody>
              <tr><td>{t('Schichtdicke', 'Layer Thickness')}</td><td>ab 0,025 mm</td></tr>
              <tr><td>{t('Maßgenauigkeit', 'Dimensional Accuracy')}</td><td>±0,01 mm</td></tr>
              <tr><td>{t('Oberflächenqualität', 'Surface Quality')}</td><td>{t('Sehr glatt, Ra < 1 µm', 'Very smooth, Ra < 1 µm')}</td></tr>
              <tr><td>{t('Maximale Baugröße', 'Max Build Size')}</td><td>145 × 145 × 175 mm</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Materialien', 'Materials')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { mat: 'Standard Resin', desc: t('Für Prototypen und Designmodelle, glatte Oberfläche', 'For prototypes and design models, smooth surface') },
            { mat: 'ABS-like Resin', desc: t('Höhere Schlagzähigkeit, für Funktionsteile', 'Higher impact resistance, for functional parts') },
            { mat: 'Flexible Resin', desc: t('Gummiartig, für Dichtungen und flexible Teile', 'Rubber-like, for seals and flexible parts') },
            { mat: 'Castable Resin', desc: t('Für Schmuck- und Metallguss, rückstandslos ausbrennbar', 'For jewelry and metal casting, burns out residue-free') },
            { mat: 'Dental Resin', desc: t('Biokompatibel, für zahntechnische Anwendungen', 'Biocompatible, for dental applications') },
            { mat: 'High Temp Resin', desc: t('Bis 238°C Wärmeformbeständigkeit', 'Up to 238°C heat deflection temperature') },
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
