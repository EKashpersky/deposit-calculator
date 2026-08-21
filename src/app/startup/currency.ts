import { RegionEnum } from '@config/region.enum';
import {
  CurrencyCodeEnum,
  CurrencySymbolEnum,
  LOCALE_2_CURRENCY_MAP
} from '@config/supported-currencies';
import { CurrencyService } from '@shared/Currency';



/**
 * Sets up user preferred currency, based on user language locale
**/
export function appStartupSetupCurrency(currencyService: CurrencyService) {
  return new Promise<void>(resolve => {
    /**
     * First phase: go over user preferences(navigator.languages), and try to
     * determine from app-supported currencies their preferred one.
    **/

    const userLocales = navigator.languages.map(
      localex => new Intl.Locale(localex)
    ).map(
      localex => [
        localex.language,
        (localex.region || '').toUpperCase()
      ].filter(Boolean).join('-')
    );

    const preferredUserLocale = userLocales.find(
      localex => LOCALE_2_CURRENCY_MAP[localex]
    ) as RegionEnum;

    const preferredCurrency = (
      LOCALE_2_CURRENCY_MAP[preferredUserLocale] || CurrencyCodeEnum.USD
    );

    currencyService.changePreferredCurrency({
      code: preferredCurrency,
      symbol: CurrencySymbolEnum[preferredCurrency],
    });

    resolve();
  });
}