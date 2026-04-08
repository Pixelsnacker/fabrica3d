import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Mail, ChevronRight, BookOpen } from 'lucide-react';
import PageLayout from './PageLayout';

interface CaseStudy {
  title: string;
  titleEn?: string;
  industry: string;
  industryEn?: string;
  challenge: string;
  challengeEn?: string;
  solution: string;
  solutionEn?: string;
  result: string;
  resultEn?: string;
}

interface TechPageProps {
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  mailtoSubject: string;
  heroColor?: string;
  children: React.ReactNode;
  caseStudies?: CaseStudy[];
  badge?: string;
  badgeEn?: string;
}

export default function TechPageLayout({
  title,
  titleEn,
  subtitle,
  subtitleEn,
  mailtoSubject,
  heroColor = 'var(--fabrica-anthrazit)',
  children,
  caseStudies,
  badge,
  badgeEn,
}: TechPageProps) {
  const { lang, t } = useLanguage();

  usePageMeta({
    titleDe: title,
    titleEn: titleEn,
    descriptionDe: subtitle,
    descriptionEn: subtitleEn,
  });

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="py-16 md:py-24 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${heroColor} 0%, var(--fabrica-anthrazit) 100%)` }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        <div className="container relative">
          {badge && (
            <span
              className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded mb-4"
              style={{ backgroundColor: 'var(--fabrica-red)', color: 'white' }}
            >
              {lang === 'en' ? (badgeEn || badge) : badge}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {lang === 'en' ? titleEn : title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
            {lang === 'en' ? subtitleEn : subtitle}
          </p>
          <a
            href={`mailto:kontakt@fabrica3d.eu?subject=${mailtoSubject}`}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--fabrica-red)' }}
          >
            <Mail size={16} />
            {t('Sofortangebot anfordern', 'Request a Quote')}
          </a>
        </div>
      </section>

      {/* Content */}
      <div className="container py-12 md:py-16">
        {children}

        {/* Case Studies */}
        {caseStudies && caseStudies.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Fallbeispiele', 'Case Studies')}
            </h2>
            <div className="h-1 w-12 rounded mb-8" style={{ backgroundColor: 'var(--fabrica-red)' }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((cs, i) => (
                <div key={i} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg" style={{ color: 'var(--fabrica-anthrazit)' }}>
                      {lang === 'en' ? (cs.titleEn || cs.title) : cs.title}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded font-medium ml-2 flex-shrink-0"
                      style={{ backgroundColor: 'var(--fabrica-gray)', color: 'var(--fabrica-anthrazit)' }}
                    >
                      {lang === 'en' ? (cs.industryEn || cs.industry) : cs.industry}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold text-gray-800">{t('Herausforderung: ', 'Challenge: ')}</span>
                      {lang === 'en' ? (cs.challengeEn || cs.challenge) : cs.challenge}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">{t('Lösung: ', 'Solution: ')}</span>
                      {lang === 'en' ? (cs.solutionEn || cs.solution) : cs.solution}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">{t('Ergebnis: ', 'Result: ')}</span>
                      {lang === 'en' ? (cs.resultEn || cs.result) : cs.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Basiswissen link */}
        <div
          className="mt-12 p-6 rounded-lg flex items-center justify-between gap-4 flex-wrap"
          style={{ backgroundColor: 'var(--fabrica-gray)' }}
        >
          <div className="flex items-center gap-3">
            <BookOpen size={24} style={{ color: 'var(--fabrica-red)' }} />
            <div>
              <p className="font-semibold" style={{ color: 'var(--fabrica-anthrazit)' }}>
                {t('Mehr Hintergrundwissen?', 'Want to learn more?')}
              </p>
              <p className="text-sm text-gray-600">
                {t('In unserem Basiswissen finden Sie Erklärungen zu Verfahren, Materialien und Dateiformaten.', 'Our Knowledge Base explains processes, materials and file formats.')}
              </p>
            </div>
          </div>
          <Link
            href="/basiswissen"
            className="inline-flex items-center gap-1 text-sm font-semibold hover:underline flex-shrink-0"
            style={{ color: 'var(--fabrica-red)' }}
          >
            {t('Zum Basiswissen', 'Knowledge Base')}
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-8 p-8 rounded-lg text-white text-center"
          style={{ backgroundColor: 'var(--fabrica-red)' }}
        >
          <h3 className="text-xl font-bold mb-2">
            {t('Bereit für Ihr Projekt?', 'Ready for your project?')}
          </h3>
          <p className="text-white/80 mb-4 text-sm">
            {t('Senden Sie uns Ihre Anfrage – wir melden uns innerhalb von 24 Stunden mit einem verbindlichen Angebot.', 'Send us your request – we will respond within 24 hours with a binding quote.')}
          </p>
          <a
            href={`mailto:kontakt@fabrica3d.eu?subject=${mailtoSubject}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded transition-opacity hover:opacity-90"
            style={{ color: 'var(--fabrica-red)' }}
          >
            <Mail size={16} />
            {t('Jetzt Angebot anfordern', 'Request Quote Now')}
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
