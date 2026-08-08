import { TranslateService } from '@ngx-translate/core';

import {
  FALLBACK_LANGUAGES,
  SUPPORTED_LANGUAGES,
} from '../../config/supported-languages';



export function appStartupSetupLocale(translateService: TranslateService) {
  return new Promise<void>(resolve => {
    /**
     * Register supported languages within translate service
    **/
    const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES.map(x => x.locale);
    translateService.addLangs(SUPPORTED_LOCALES);

    /**
     * First phase: go over user preferences(navigator.languages), and try to
     * select from app-supported languages their preferred one.
    **/

    let primaryLocale: string | null = null;

    for (const preferredLanguage of navigator.languages) {
      const base = preferredLanguage.split('-')[0];
      if (SUPPORTED_LOCALES.includes(base)) {
        primaryLocale = base;
        break;
      }
    }

    if (primaryLocale !== null) {
      translateService.use(primaryLocale);
      return resolve();
    }

    /**
     * Second phase: go over same navigator languages again, and now try to find
     * all the available fallback options for them.
    **/

   /// Build fallback chain respecting preference order
   const fallbackCandidates: string[] = [];
    for (const preferred of navigator.languages) {
      const base = preferred.split('-')[0] as keyof typeof FALLBACK_LANGUAGES;

      const definedFallbacks = FALLBACK_LANGUAGES[base] ?? [];

      for (const fallback of definedFallbacks) {
        if (SUPPORTED_LOCALES.includes(fallback) 
          && !fallbackCandidates.includes(fallback)
        ) {
          fallbackCandidates.push(fallback);
        }
      }
    }

    if (!fallbackCandidates.includes('en')) {
      fallbackCandidates.push('en');
    }

    translateService.setFallbackLang(fallbackCandidates[0]);

    resolve();
  });
}