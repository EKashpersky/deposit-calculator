import { CurrencyCharEnum } from '@shared/currency.service';

import { ReelModel } from '@components/reels';
import { ReelRollerCurrencyModel } from './reel-roller.currency.model';





export function reelRollerCurrencyFactory(
  currency: CurrencyCharEnum,
  value: number,
  withSpace: boolean
) {
  const reels = [ reelRollerCurrencySignFactory(currency) ] as ReelModel<any>[];

  if (withSpace) {
    reels.push(new ReelModel([ ' ' ], ' '));
  }

  reels.push(...reelRollerCurrencyValueFactory(value));

  return new ReelRollerCurrencyModel(...reels);
}


export function reelRollerCurrencySignFactory(currency: CurrencyCharEnum) {
  return new ReelModel([
    CurrencyCharEnum.EUR,
    CurrencyCharEnum.UAH,
    CurrencyCharEnum.USD,
  ], currency);
}

export function reelRollerCurrencyValueFactory(value: number) {
  const NUMBERS_DICTIONARY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const exceptions = [' ', '.', ',', '\''];

  return `${value}`.split('').map(
    (numberx) => {
      if (exceptions.includes(numberx)) {
        return new ReelModel(exceptions, numberx);
      } else {
        return new ReelModel(NUMBERS_DICTIONARY, +numberx)
      }
    }
  );
}