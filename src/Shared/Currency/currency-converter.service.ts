import { Injectable } from '@angular/core';

import { CurrencyCodeEnum } from '@config/supported-currencies';

import { CurrencyRatesService } from './currency-rates.service';




export enum CurrencyConvertSide {
  Buy = 'buy',
  Sell = 'sell',
  Equal = 'equal',
}

@Injectable()
export class CurrencyConverterService {
  public constructor(private _currencyRates: CurrencyRatesService) { }

  public convert(
    amount: number,
    from: CurrencyCodeEnum,
    to: CurrencyCodeEnum,
    side: CurrencyConvertSide
  ) {
    if (amount <= 0) {
      throw new Error(`Amount can't be 0 or less`);
    }

    if (from === to) {
      return amount;
    }

    const fromRate = this._currencyRates.getRate(from)!;
    const toRate = this._currencyRates.getRate(to)!;

    let result = 0;
    if (side === CurrencyConvertSide.Equal) {
      const amountInUah = amount * ((fromRate.buy + fromRate.sell) / 2);
      result = amountInUah / ((toRate.buy + toRate.sell) / 2);
    } else {
      const amountInUah = amount * fromRate[side];
      result = amountInUah / toRate[side];
    }

    return Math.round(result * 100) / 100;
  }
}
