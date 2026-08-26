import { CurrencyCodeEnum } from '@config/supported-currencies';
import { TranslateService } from '@ngx-translate/core';

import { CurrencyService, currencyShapeFromCode } from '@shared/Currency';
import { PreferencesService } from '@shared/preferences';
import { ThemeEnum, ThemeService } from '@shared/theme.service';



export function appStartupPreferences(
  preferences: PreferencesService,
  currency: CurrencyService,
  language: TranslateService,
  theme: ThemeService,
) {
  return new Promise<void>(resolve => {
    preferences.load().then(storedPrefs => {
      const prefs = storedPrefs[0].get();

      currency.changePreferredCurrency(currencyShapeFromCode(prefs.currency as CurrencyCodeEnum));
      language.use(prefs.language!);
      theme.setTheme(prefs.theme as ThemeEnum);

      resolve();
    });
  });
}