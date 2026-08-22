import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CurrencyService } from '@shared/Currency';

import { appStartupSetupCurrency } from './startup/currency';
import { appStartupSetupLocale } from './startup/locale';



export function appStartup() {
  const translateService = inject(TranslateService);
  const currencyService  = inject(CurrencyService);

  return Promise.all([
    appStartupSetupLocale(translateService),
    appStartupSetupCurrency(currencyService),
  ]);
}