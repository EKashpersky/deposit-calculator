import { ReelModel } from '@components/reels';
import { CurrencySymbolEnum } from '@config/supported-currencies';

import { ReelRollerCurrencyModel } from './reel-roller.currency.model';



export function reelRollerCurrencyFactory(
  currency: CurrencySymbolEnum,
  value: number,
  withSpace: boolean,
  variable = false
) {
  const reels = [ reelRollerCurrencySignFactory(currency) ] as ReelModel<any>[];

  if (withSpace) {
    reels.push(new ReelModel([ ' ' ], ' '));
  }

  reels.push(...reelRollerCurrencyValueFactory(value, variable));

  return new ReelRollerCurrencyModel(...reels);
}


export function reelRollerCurrencySignFactory(currency: CurrencySymbolEnum) {
  return new ReelModel(Object.values(CurrencySymbolEnum), currency, true);
}

export function reelRollerCurrencyValueFactory(value: number, variable = false) {
  const NUMBERS_DICTIONARY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const exceptions = [' ', '.', ',', '\''];

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