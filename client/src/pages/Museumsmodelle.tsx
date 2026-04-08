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
        {
          title: 'Tastmodell Römerhelm',
          titleEn: 'Tactile Roman Helmet Model',
          industry: 'Museum',
          industryEn: 'Museum',
          challenge: 'Originalhelm zu fragil für Ausstellung, barrierefreies Tastmodell für blinde und sehbehinderte Besucher benötigt.',
          challengeEn: 'Original helmet too fragile for exhibition, accessible tactile model needed for blind and visually impaired visitors.',
          solution: '3D-Scan des Originals, SLA-Druck mit feiner Oberflächenstruktur, robuste Beschichtung für häufiges Berühren.',
          solutionEn: '3D scan of original, SLA printing with fine surface texture, robust coating for frequent touching.',
          result: 'Barrierefreies Ausstellungsstück, Besucher können Helm ertasten und erleben – auch ohne Sehvermögen.',
          resultEn: 'Accessible exhibit, visitors can feel and experience the helmet – even without sight.',
        },
        {
          title: 'Bronzemodell Stadtgründungsurkunde',
          titleEn: 'Bronze Model City Foundation Document',
          industry: 'Stadtmuseum',
          industryEn: 'City Museum',
          challenge: 'Historische Urkunde als repräsentatives Bronzerelief für Dauerausstellung und Schenkungen.',
          challengeEn: 'Historical document as representative bronze relief for permanent exhibition and gifts.',
          solution: 'Hochauflösender Scan, CAD-Aufbereitung, Bronzeguss-Replik mit authentischer Patinierung.',
          solutionEn: 'High-resolution scan, CAD preparation, bronze cast replica with authentic patination.',
          result: 'Edles Bronzerelief als Dauerleihgabe und limitierte Replik-Edition für Museumsshop.',
          resultEn: 'Noble bronze relief as permanent loan and limited replica edition for museum shop.',
        },
        {
          title: 'Digitale Archivierung Fossilien',
          titleEn: 'Digital Fossil Archiving',
          industry: 'Naturkunde',
          industryEn: 'Natural History',
          challenge: 'Seltene Fossilien digitalisieren und als Tastmodelle für Bildungszwecke reproduzieren.',
          challengeEn: 'Digitize rare fossils and reproduce as tactile models for educational purposes.',
          solution: 'GOM ATOS Scan, hochauflösende STL-Daten, SLA-Druck für robuste Bildungsmodelle.',
          solutionEn: 'GOM ATOS scan, high-resolution STL data, SLA printing for robust educational models.',
          result: 'Vollständige digitale Archivierung, 10 Tastmodelle für Schulklassen und Bildungsprogramme.',
          resultEn: 'Complete digital archiving, 10 tactile models for school classes and educational programs.',
        },
      ]}
    >
      {/* Unser Ansatz */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Unser Ansatz für Museumsmodelle', 'Our Approach to Museum Models')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">
          {t(
            'Fabrica verbindet modernste 3D-Scan-Technologie mit präzisen 3D-Druckverfahren und traditionellem Bronzeguss, um historische Objekte und Artefakte in höchster Detailtreue zu rekonstruieren. Jedes Modell wird in enger Zusammenarbeit mit Kuratoren und Historikern entwickelt.',
            'Fabrica combines state-of-the-art 3D scan technology with precise 3D printing processes and traditional bronze casting to reconstruct historical objects and artifacts with the highest detail accuracy. Each model is developed in close collaboration with curators and historians.'
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: t('Digitalisierung', 'Digitization'),
              desc: t(
                'Berührungsloser 3D-Scan des Originals oder Rekonstruktion aus historischen Quellen und Dokumenten.',
                'Non-contact 3D scan of the original or reconstruction from historical sources and documents.'
              ),
            },
            {
              step: '02',
              title: t('Aufbereitung', 'Preparation'),
              desc: t(
                'Professionelle CAD-Aufbereitung für optimale Druckqualität. Maßstabsanpassung und Detailoptimierung.',
                'Professional CAD preparation for optimal print quality. Scale adjustment and detail optimization.'
              ),
            },
            {
              step: '03',
              title: t('Fertigung & Finish', 'Manufacturing & Finish'),
              desc: t(
                'Druck oder Bronzeguss mit dem optimalen Verfahren. Nachbearbeitung, Patinierung, Bemalung und Oberflächenbehandlung.',
                'Printing or bronze casting with the optimal process. Post-processing, patination, painting and surface treatment.'
              ),
            },
          ].map((s) => (
            <div key={s.step} className="text-center p-5 border rounded-xl">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--fabrica-red)' }}>
                {s.step}
              </div>
              <div className="font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
                {s.title}
              </div>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tastmodelle */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Tastmodelle – Barrierefreie Ausstellungsstücke', 'Tactile Models – Accessible Exhibits')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">
          {t(
            'Tastmodelle ermöglichen blinden und sehbehinderten Besuchern ein haptisches Erlebnis historischer Objekte und Kunstwerke. Wir fertigen robuste, berührungsfreundliche Modelle, die für den täglichen Museumsbetrieb ausgelegt sind – mit präziser Oberflächenstruktur und langlebigen Materialien.',
            'Tactile models enable blind and visually impaired visitors to have a haptic experience of historical objects and artworks. We manufacture robust, touch-friendly models designed for daily museum operations – with precise surface texture and durable materials.'
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[
            {
              title: t('Anwendungsbereiche Tastmodelle', 'Tactile Model Applications'),
              items: [
                t('Barrierefreie Museumsausstellungen', 'Accessible museum exhibitions'),
                t('Inklusive Bildungsprogramme für Schulklassen', 'Inclusive educational programs for school classes'),
                t('Archäologische Funde & historische Artefakte', 'Archaeological finds & historical artifacts'),
                t('Kunstobjekte und Skulpturen', 'Art objects and sculptures'),
                t('Naturkundliche Objekte (Fossilien, Mineralien)', 'Natural history objects (fossils, minerals)'),
                t('Architekturmodelle historischer Gebäude', 'Architecture models of historical buildings'),
              ],
            },
            {
              title: t('Materialien & Eigenschaften', 'Materials & Properties'),
              items: [
                t('SLA-Kunstharz: feinste Oberflächendetails, glatt', 'SLA resin: finest surface details, smooth'),
                t('FDM-Kunststoff: robust, kostengünstig, leicht', 'FDM plastic: robust, cost-effective, lightweight'),
                t('Polyjet: mehrfarbig, differenzierte Texturen', 'Polyjet: multicolor, differentiated textures'),
                t('Beschichtungen für erhöhte Abriebfestigkeit', 'Coatings for increased abrasion resistance'),
                t('Maßstabsgetreu oder vergrößert nach Bedarf', 'True to scale or enlarged as needed'),
                t('Sockel und Beschriftungen auf Wunsch', 'Bases and labels on request'),
              ],
            },
          ].map((col) => (
            <div key={col.title} className="p-5 border rounded-xl">
              <h3 className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: 'var(--fabrica-red)' }}>
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--fabrica-red)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Bronzemodelle */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Bronzemodelle – Edle Repliken & Kunstguss', 'Bronze Models – Noble Replicas & Art Casting')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <p className="text-gray-600 leading-relaxed mb-6">
          {t(
            'Bronzemodelle verbinden modernste digitale Fertigungstechnologie mit dem traditionellen Handwerk des Bronzegusses. Wir digitalisieren historische Objekte, erstellen präzise CAD-Vorlagen und fertigen hochwertige Bronzerepliken mit authentischer Patinierung – für Museen, Institutionen und Sammlungen.',
            'Bronze models combine state-of-the-art digital manufacturing technology with the traditional craft of bronze casting. We digitize historical objects, create precise CAD templates and manufacture high-quality bronze replicas with authentic patination – for museums, institutions and collections.'
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            {
              icon: (
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--fabrica-red)' }}>
                  <circle cx="24" cy="24" r="18" />
                  <path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" />
                  <path d="M24 16v4M24 28v4M16 24h4M28 24h4" />
                </svg>
              ),
              title: t('Digitalisierung & Modellierung', 'Digitization & Modeling'),
              desc: t(
                'Hochauflösender 3D-Scan des Originals. Professionelle CAD-Aufbereitung für Gussqualität. Maßstabsanpassung und Detailoptimierung.',
                'High-resolution 3D scan of the original. Professional CAD preparation for casting quality. Scale adjustment and detail optimization.'
              ),
            },
            {
              icon: (
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--fabrica-red)' }}>
                  <path d="M12 36V20l12-8 12 8v16" />
                  <rect x="18" y="26" width="12" height="10" />
                  <path d="M24 12v4M8 20h4M36 20h4" />
                </svg>
              ),
              title: t('Bronzeguss & Veredelung', 'Bronze Casting & Finishing'),
              desc: t(
                'Traditioneller Wachsausschmelzguss oder Sandguss. Handwerkliche Nachbearbeitung. Authentische Patinierung in verschiedenen Tönen.',
                'Traditional lost-wax casting or sand casting. Artisan post-processing. Authentic patination in various tones.'
              ),
            },
            {
              icon: (
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--fabrica-red)' }}>
                  <rect x="8" y="30" width="32" height="10" rx="2" />
                  <path d="M16 30V18a2 2 0 012-2h12a2 2 0 012 2v12" />
                  <path d="M20 16v-4h8v4" />
                </svg>
              ),
              title: t('Präsentation & Lieferung', 'Presentation & Delivery'),
              desc: t(
                'Montage auf Sockel oder Wandhalterung. Gravierte Beschriftungsplatten. Verpackung und Versicherung für Transport.',
                'Mounting on base or wall bracket. Engraved label plates. Packaging and insurance for transport.'
              ),
            },
          ].map((card) => (
            <div key={card.title} className="text-center p-5 border rounded-xl">
              {card.icon}
              <div className="font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
                {card.title}
              </div>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { de: 'Historische Reliefs', en: 'Historical Reliefs' },
            { de: 'Skulpturen-Repliken', en: 'Sculpture Replicas' },
            { de: 'Medaillen & Plaketten', en: 'Medals & Plaques' },
            { de: 'Wappen & Embleme', en: 'Coats of Arms & Emblems' },
            { de: 'Urkunden-Reliefs', en: 'Document Reliefs' },
            { de: 'Archäologische Repliken', en: 'Archaeological Replicas' },
            { de: 'Limitierte Editionen', en: 'Limited Editions' },
            { de: 'Repräsentationsgeschenke', en: 'Representative Gifts' },
          ].map((item) => (
            <div
              key={item.de}
              className="p-3 rounded-lg text-center text-sm font-medium border"
              style={{ color: 'var(--fabrica-anthrazit)' }}
            >
              {t(item.de, item.en)}
            </div>
          ))}
        </div>
      </section>

      {/* Anwendungsbereiche gesamt */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
          {t('Alle Anwendungsbereiche', 'All Application Areas')}
        </h2>
        <div className="h-1 w-12 rounded mb-6" style={{ backgroundColor: 'var(--fabrica-red)' }} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { de: 'Tastmodelle (barrierefrei)', en: 'Tactile Models (accessible)' },
            { de: 'Bronzemodelle & Repliken', en: 'Bronze Models & Replicas' },
            { de: 'Historische Artefakte', en: 'Historical Artifacts' },
            { de: 'Fossilien & Naturkunde', en: 'Fossils & Natural History' },
            { de: 'Architekturmodelle', en: 'Architecture Models' },
            { de: 'Bildungsmodelle', en: 'Educational Models' },
          ].map((app) => (
            <div
              key={app.de}
              className="p-3 rounded-lg text-center text-sm font-medium border"
              style={{ color: 'var(--fabrica-anthrazit)' }}
            >
              {t(app.de, app.en)}
            </div>
          ))}
        </div>
      </section>
    </TechPageLayout>
  );
}
