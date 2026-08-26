import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CurrencyService } from '@shared/Currency';
import { PreferencesService } from '@shared/preferences';
import { ThemeService } from '@shared/theme.service';

import { appStartupSetupCurrency } from './startup/currency';
import { appStartupSetupLocale } from './startup/locale';
import { appStartupPreferences } from './startup/startup-preferences';
import { appStartupSetupTheme } from './startup/theme';



export function appStartup() {
  const currencyService  = inject(CurrencyService);
  const themeService     = inject(ThemeService);
  const translateService = inject(TranslateService);
  const preferences      = inject(PreferencesService);

  return Promise.all([
    appStartupSetupLocale(translateService),
    appStartupSetupCurrency(currencyService),
    appStartupSetupTheme(themeService),
    appStartupPreferences(
      preferences,
      currencyService,
      translateService,
      themeService,
    )
  ]);
}