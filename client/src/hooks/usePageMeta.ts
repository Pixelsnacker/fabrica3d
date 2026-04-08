import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PageMetaOptions {
  titleDe: string;
  titleEn: string;
  descriptionDe: string;
  descriptionEn: string;
  canonical?: string;
}

/**
 * Sets page-level meta tags for SEO including title, description, canonical and OG tags.
 * Automatically switches between DE/EN based on the current language context.
 */
export function usePageMeta({ titleDe, titleEn, descriptionDe, descriptionEn, canonical }: PageMetaOptions) {
  const { lang } = useLanguage();

  useEffect(() => {
    const title = lang === 'en' ? titleEn : titleDe;
    const description = lang === 'en' ? descriptionEn : descriptionDe;
    const suffix = ' | Fabrica GmbH – Digital Production';

    // Title
    document.title = title + suffix;

    // Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title + suffix);

    // OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Canonical
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', `https://fabrica3d.eu${canonical}`);
    }

    // Lang attribute
    document.documentElement.lang = lang;
  }, [lang, titleDe, titleEn, descriptionDe, descriptionEn, canonical]);
}
