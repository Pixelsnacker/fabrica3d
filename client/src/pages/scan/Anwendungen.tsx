import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ScanAnwendungen() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="3D-Scan Anwendungen"
      titleEn="3D Scan Applications"
      subtitle="Qualitätskontrolle, Digitalisierung, Maßprüfung und Archivierung mit professioneller Messtechnik."
      subtitleEn="Quality control, digitization, dimensional inspection and archiving with professional measurement technology."
      mailtoSubject="Anfrage%203D-Scan"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_3dscan_panorama-enR5FWV3DmycJ8anGV2ZYL.webp"
      heroColor="oklch(22% 0.08 200)"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Anwendungsbereiche', 'Applications')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: t('Qualitätskontrolle', 'Quality Control'), desc: t('Vergleich von Ist-Geometrie mit CAD-Nominalgeometrie. Farbplot-Auswertung zeigt Abweichungen auf einen Blick. Vollständige Prüfdokumentation.', 'Comparison of actual geometry with CAD nominal geometry. Color plot evaluation shows deviations at a glance. Complete inspection documentation.') },
            { title: t('Digitalisierung', 'Digitization'), desc: t('Berührungslose Digitalisierung von Bauteilen, Werkzeugen, Kunstobjekten und Kulturgütern. Ausgabe als STL, STEP oder Punktewolke.', 'Non-contact digitization of components, tools, art objects and cultural heritage. Output as STL, STEP or point cloud.') },
            { title: t('Maßprüfung', 'Dimensional Inspection'), desc: t('Präzise Maßprüfung nach Zeichnung oder CAD-Modell. Toleranzauswertung und GD&T-Analyse für Serienteile.', 'Precise dimensional inspection according to drawing or CAD model. Tolerance evaluation and GD&T analysis for series parts.') },
            { title: t('Archivierung', 'Archiving'), desc: t('Digitale Archivierung von Bauteilen, Werkzeugen und historischen Objekten. Vollständige 3D-Dokumentation für Nachfertigung oder Restaurierung.', 'Digital archiving of components, tools and historical objects. Complete 3D documentation for reproduction or restoration.') },
          ].map((app) => (
            <div key={app.title} className="p-5 border rounded-xl">
              <h3 className="font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{app.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </TechPageLayout>
  );
}
