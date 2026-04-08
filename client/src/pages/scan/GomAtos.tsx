import TechPageLayout from '@/components/TechPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GomAtos() {
  const { t } = useLanguage();
  return (
    <TechPageLayout
      title="GOM ATOS Systeme"
      titleEn="GOM ATOS Systems"
      subtitle="Professionelles optisches Messsystem für Qualitätskontrolle und Digitalisierung – Toleranz ±0,01 mm."
      subtitleEn="Professional optical measuring system for quality control and digitization – tolerance ±0.01 mm."
      mailtoSubject="Anfrage%203D-Scan"
      heroColor="oklch(25% 0.1 200)"
      caseStudies={[
        { title: 'Qualitätskontrolle Serienteil', titleEn: 'Series Part Quality Control', industry: 'Automotive', industryEn: 'Automotive', challenge: 'Maßprüfung von 500 Serienteilen mit engen Toleranzen und vollständiger Dokumentation.', challengeEn: 'Dimensional inspection of 500 series parts with tight tolerances and complete documentation.', solution: 'GOM ATOS Scan, automatisierter Vergleich mit CAD-Nominalgeometrie, Farbplot-Auswertung.', solutionEn: 'GOM ATOS scan, automated comparison with CAD nominal geometry, color plot evaluation.', result: '500 Teile in 3 Tagen geprüft, vollständige Prüfdokumentation, 3 Teile ausgesondert.', resultEn: '500 parts inspected in 3 days, complete inspection documentation, 3 parts rejected.' },
        { title: 'Digitalisierung Kulturgut', titleEn: 'Cultural Heritage Digitization', industry: 'Museum', industryEn: 'Museum', challenge: 'Digitalisierung eines historischen Artefakts für Archivierung und Reproduktion.', challengeEn: 'Digitization of a historical artifact for archiving and reproduction.', solution: 'Berührungsloser GOM ATOS Scan, hochauflösende Punktewolke, STL-Export.', solutionEn: 'Non-contact GOM ATOS scan, high-resolution point cloud, STL export.', result: 'Vollständige 3D-Dokumentation, Reproduktion für Ausstellung erfolgreich.', resultEn: 'Complete 3D documentation, reproduction for exhibition successful.' },
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('GOM ATOS – Technologie', 'GOM ATOS – Technology')}</h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">{t('GOM ATOS (Automated Topometric Sensor) ist ein industrielles optisches 3D-Messsystem, das strukturiertes Licht verwendet, um Objekte berührungslos und hochpräzise zu digitalisieren. Es ist der Standard in der Automobilindustrie und Luft- und Raumfahrt.', 'GOM ATOS (Automated Topometric Sensor) is an industrial optical 3D measuring system that uses structured light to digitize objects non-contactly and with high precision. It is the standard in the automotive industry and aerospace.')}</p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="spec-table">
            <thead><tr><th>{t('Parameter', 'Parameter')}</th><th>{t('Wert', 'Value')}</th></tr></thead>
            <tbody>
              <tr><td>{t('Messgenauigkeit', 'Measurement Accuracy')}</td><td>±0,01 mm</td></tr>
              <tr><td>{t('Messprinzip', 'Measurement Principle')}</td><td>{t('Strukturiertes Licht (Fringe Projection)', 'Structured Light (Fringe Projection)')}</td></tr>
              <tr><td>{t('Berührungslos', 'Non-contact')}</td><td>{t('Ja', 'Yes')}</td></tr>
              <tr><td>{t('Ausgabeformate', 'Output Formats')}</td><td>STL, STEP, IGES, Punktewolke</td></tr>
              <tr><td>{t('Anwendungen', 'Applications')}</td><td>{t('Qualitätskontrolle, Reverse Engineering, Archivierung', 'Quality control, reverse engineering, archiving')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </TechPageLayout>
  );
}
