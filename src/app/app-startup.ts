import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SUPPORTED_LANGUAGES } from '../config/supported-languages';



export function appStartup(): Promise<void> | void {
  return new Promise(resolve => {
    const translateService = inject(TranslateService);

    /// Register supported languages
    const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES.map(x => x.locale);
    translateService.addLangs(SUPPORTED_LOCALES);

    const browserLanguage = translateService.getBrowserLang()!;
    if (SUPPORTED_LOCALES.includes(browserLanguage)) {
      translateService.use(browserLanguage);
    } else {
      translateService.use('en');
    }

    resolve();
  });
}