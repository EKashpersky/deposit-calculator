import { ReelModel } from '@components/reels';
import { CurrencySymbolEnum } from '@config/supported-currencies';

import { ReelRollerCurrencyModel } from './reel-roller.currency.model';



export function reelRollerCurrencyFactory(
  currency: CurrencySymbolEnum,
  value: string,
  variable = false
) {
  const NUMBERS_DICTIONARY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const exceptions = [' ', '.', ',', '\''];

  /// Find and replace the currency with a dollar to fix multiple currency
  /// symbols in case of multiple symbols as a currency symbol
  const reels2 = `${value.replace(currency, '$').trim()}`.split('').map(
    charx => {
      if (exceptions.includes(charx)) {
        return new ReelModel(exceptions, charx, variable);
      } else if (NUMBERS_DICTIONARY.includes(+charx)) {
        return new ReelModel(NUMBERS_DICTIONARY, +charx, variable)
      } else {
        return reelRollerCurrencySignFactory(currency as CurrencySymbolEnum);
      }
    }
  );

  return new ReelRollerCurrencyModel(...reels2 as ReelModel<any>[]);
}


export function reelRollerCurrencySignFactory(currency: CurrencySymbolEnum) {
  return new ReelModel(Object.values(CurrencySymbolEnum), currency, true);
}

export function reelRollerCurrencyValueFactory(value: string, variable = false) {
  const NUMBERS_DICTIONARY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const exceptions = [' ', '.', ',', '\''];

  return `${value}`.split('').map(
    (numberx) => {
      if (exceptions.includes(numberx)) {
        return new ReelModel(exceptions, numberx, variable);
      } else {
        return new ReelModel(NUMBERS_DICTIONARY, +numberx, variable)
      }
    }
  );
}