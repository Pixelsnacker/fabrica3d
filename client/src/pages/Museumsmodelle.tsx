import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Museumsmodelle() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="Museumsmodelle"
      titleEn="Museum Models"
      subtitle="Rekonstruktion historischer Objekte und Artefakte in höchster Detailtreue – für Museen, Ausstellungen und Bildungseinrichtungen."
      subtitleEn="Reconstruction of historical objects and artifacts with highest detail accuracy – for museums, exhibitions and educational institutions."
      mailtoSubject="Anfrage%20Museumsmodelle"
      heroColor="oklch(28% 0.06 50)"
      badge="Spezialgebiet"
      badgeEn="Specialty"
      caseStudies={[
        { title: 'Rekonstruktion Römerhelm', titleEn: 'Reconstruction Roman Helmet', industry: 'Museum', industryEn: 'Museum', challenge: 'Originalhelm zu fragil für Ausstellung, Reproduktion für Besucherinteraktion benötigt.', challengeEn: 'Original helmet too fragile for exhibition, reproduction needed for visitor interaction.', solution: '3D-Scan des Originals, Polyjet-Druck mit Metalloptik-Finish, handbemalt.', solutionEn: '3D scan of original, Polyjet printing with metallic finish, hand-painted.', result: 'Täuschend echte Reproduktion, Besucher können Helm anfassen und anprobieren.', resultEn: 'Deceptively real reproduction, visitors can touch and try on the helmet.' },
        { title: 'Digitale Archivierung Fossilien', titleEn: 'Digital Fossil Archiving', industry: 'Naturkunde', industryEn: 'Natural History', challenge: 'Seltene Fossilien digitalisieren und für Forschung und Ausstellung reproduzieren.', challengeEn: 'Digitize rare fossils and reproduce for research and exhibition.', solution: 'GOM ATOS Scan, hochauflösende STL-Daten, SLA-Druck für Forschungsmodelle.', solutionEn: 'GOM ATOS scan, high-resolution STL data, SLA printing for research models.', result: 'Vollständige digitale Archivierung, 10 Reproduktionen für Bildungszwecke.', resultEn: 'Complete digital archiving, 10 reproductions for educational purposes.' },
        { title: 'Architekturmodell Historisches Gebäude', titleEn: 'Architecture Model Historical Building', industry: 'Architektur', industryEn: 'Architecture', challenge: 'Maßstabsgetreues Modell eines historischen Gebäudes für Ausstellung.', challengeEn: 'Scale model of a historical building for exhibition.', solution: 'CAD-Rekonstruktion aus historischen Plänen, FDM-Druck in Maßstab 1:100.', solutionEn: 'CAD reconstruction from historical plans, FDM printing in scale 1:100.', result: 'Detailgetreues Modell, Ausstellungsstück für Stadtmuseum.', resultEn: 'Detailed model, exhibit for city museum.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Unser Ansatz für Museumsmodelle', 'Our Approach to Museum Models')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">
          {t(
            'Fabrica verbindet modernste 3D-Scan-Technologie mit präzisen 3D-Druckverfahren, um historische Objekte und Artefakte in höchster Detailtreue zu rekonstruieren. Jedes Modell wird in enger Zusammenarbeit mit Kuratoren und Historikern entwickelt.',
            'Fabrica combines state-of-the-art 3D scan technology with precise 3D printing processes to reconstruct historical objects and artifacts with the highest detail accuracy. Each model is developed in close collaboration with curators and historians.'
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', title: t('Digitalisierung', 'Digitization'), desc: t('Berührungsloser 3D-Scan des Originals oder Rekonstruktion aus historischen Quellen und Dokumenten.', 'Non-contact 3D scan of the original or reconstruction from historical sources and documents.') },
            { step: '02', title: t('Aufbereitung', 'Preparation'), desc: t('Professionelle CAD-Aufbereitung für optimale Druckqualität. Maßstabsanpassung und Detailoptimierung.', 'Professional CAD preparation for optimal print quality. Scale adjustment and detail optimization.') },
            { step: '03', title: t('Fertigung & Finish', 'Manufacturing & Finish'), desc: t('Druck mit dem optimalen Verfahren (SLA, Polyjet, FDM). Nachbearbeitung, Bemalung und Oberflächenbehandlung.', 'Printing with the optimal process (SLA, Polyjet, FDM). Post-processing, painting and surface treatment.') },
          ].map((s) => (
            <div key={s.step} className="text-center p-5 border rounded-xl">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--fabrica-red)' }}>{s.step}</div>
              <div className="font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{s.title}</div>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Anwendungsbereiche', 'Applications')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { de: 'Archäologische Funde', en: 'Archaeological Finds' },
            { de: 'Historische Artefakte', en: 'Historical Artifacts' },
            { de: 'Fossilien & Naturkunde', en: 'Fossils & Natural History' },
            { de: 'Architekturmodelle', en: 'Architecture Models' },
            { de: 'Kunstobjekte', en: 'Art Objects' },
            { de: 'Bildungsmodelle', en: 'Educational Models' },
          ].map((app) => (
            <div key={app.de} className="p-3 rounded-lg text-center text-sm font-medium border" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {app.de}
            </div>
          ))}
        </div>
      </section>
    </TechPageLayout>
  );
}
