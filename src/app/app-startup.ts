import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { appStartupSetupLocale } from './startup/locale';
import { appStartupSetupStorage } from './startup/storage';



export function appStartup(): Promise<void> | void {
  return new Promise(resolve => {
    const translateService = inject(TranslateService);

    Promise.all([
      appStartupSetupLocale(translateService),
      appStartupSetupStorage(),
    ]).then(() => resolve())
  });
}