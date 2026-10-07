import { Injectable, signal } from '@angular/core';

import {
  CurrencyCodeEnum,
  CurrencySymbolEnum
} from '@config/supported-currencies';

import { CurrencyShape } from './currency.model';
import { CurrencyRatesService } from './currency-rates.service';



export function getDefaultCurrency() {
  return {
    code: CurrencyCodeEnum.EUR,
    symbol: CurrencySymbolEnum.EUR
  };
}



@Injectable()
export class CurrencyService {
  private _preferredCurrency = signal<CurrencyShape | null>(null);



  public constructor(private _currencyRates: CurrencyRatesService) { }

  public getCurrenciesWithRates() {
    return this._currencyRates.rates().map((currencyRate) => {
      return {
        code: currencyRate.code,
        symbol: CurrencySymbolEnum[currencyRate.code],
      }
    });
  }

  public getPreferredOrFallbackCurrency() {
    let preferredCurrency = this._preferredCurrency();

    if (preferredCurrency === null) {
      preferredCurrency = getDefaultCurrency();
    }

    return preferredCurrency;
  }

  public changePreferredCurrency(currency: CurrencyShape) {
    this._preferredCurrency.set(currency);
  }

  public preferredCurrency() {
    return this._preferredCurrency();
  }
}