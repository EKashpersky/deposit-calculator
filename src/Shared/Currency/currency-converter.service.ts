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

    let result = 0;
    if (side === CurrencyConvertSide.Equal) {
      const amountInUah = amount * this._currencyRates.mid(from);
      result = amountInUah / this._currencyRates.mid(to);
    } else {
      const amountInUah = amount * this._currencyRates.getRate(from)![side];
      result = amountInUah / this._currencyRates.getRate(to)![side];
    }

    return Math.round(result * 100) / 100;
  }
}
