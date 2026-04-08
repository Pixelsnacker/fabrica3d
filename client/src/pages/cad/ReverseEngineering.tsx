import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ReverseEngineering() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="Reverse Engineering"
      titleEn="Reverse Engineering"
      subtitle="3D-Scan als Grundlage für CAD-Rekonstruktion – Ersatzteile ohne Zeichnung, Altteile digitalisieren."
      subtitleEn="3D scan as the basis for CAD reconstruction – spare parts without drawings, digitizing old parts."
      mailtoSubject="Anfrage%20Reverse%20Engineering"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_reverse_engineering_panorama-ZktQwSqLTcuGMggkpygyBK.webp"
      heroColor="oklch(22% 0.08 240)"
      caseStudies={[
        { title: 'Veraltetes Maschinenteil', titleEn: 'Obsolete Machine Part', industry: 'Maschinenbau', industryEn: 'Mechanical Engineering', challenge: 'Maschinenteil aus den 1970ern, kein Hersteller mehr, keine Zeichnung vorhanden.', challengeEn: 'Machine part from the 1970s, no manufacturer anymore, no drawing available.', solution: '3D-Scan mit GOM ATOS, parametrische CAD-Rekonstruktion, FDM-Druck in PA.', solutionEn: '3D scan with GOM ATOS, parametric CAD reconstruction, FDM printing in PA.', result: 'Funktionales Ersatzteil in 7 Tagen, Maschine wieder produktionsfähig.', resultEn: 'Functional spare part in 7 days, machine back in production.' },
        { title: 'Karosseriebauteil Oldtimer', titleEn: 'Classic Car Body Part', industry: 'Automotive', industryEn: 'Automotive', challenge: 'Einzigartiges Karosseriebauteil für Oldtimer-Restaurierung, kein Original mehr verfügbar.', challengeEn: 'Unique body part for classic car restoration, no original available anymore.', solution: '3D-Scan des Restteils, CAD-Rekonstruktion, CNC-Fräsen in Aluminium.', solutionEn: '3D scan of the remaining part, CAD reconstruction, CNC milling in aluminum.', result: 'Passgenaues Bauteil, Restaurierung erfolgreich abgeschlossen.', resultEn: 'Perfectly fitting component, restoration successfully completed.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Der Reverse Engineering Prozess', 'The Reverse Engineering Process')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '01', title: t('3D-Scan', '3D Scan'), desc: t('Präziser optischer Scan des Originalteils mit GOM ATOS', 'Precise optical scan of the original part with GOM ATOS') },
            { step: '02', title: t('Punktewolke', 'Point Cloud'), desc: t('Verarbeitung der Scandaten zu einer präzisen Punktewolke', 'Processing scan data into a precise point cloud') },
            { step: '03', title: t('CAD-Rekonstruktion', 'CAD Reconstruction'), desc: t('Parametrische Rekonstruktion als vollständiges Volumenmodell', 'Parametric reconstruction as a complete solid model') },
            { step: '04', title: t('Fertigung', 'Manufacturing'), desc: t('Direkte Fertigung aus den rekonstruierten CAD-Daten', 'Direct manufacturing from the reconstructed CAD data') },
          ].map((s) => (
            <div key={s.step} className="text-center p-4 border rounded-xl">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--fabrica-red)' }}>{s.step}</div>
              <div className="font-bold text-sm mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>{s.title}</div>
              <div className="text-xs text-gray-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </TechPageLayout>
  );
}
