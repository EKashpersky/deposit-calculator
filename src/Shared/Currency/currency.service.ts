import { Injectable, signal } from '@angular/core';

import {
  CurrencyCodeEnum,
  CurrencySymbolEnum
} from '@config/supported-currencies';

import { CurrencyShape } from './currency.model';



export function getDefaultCurrency() {
  return {
    code: CurrencyCodeEnum.EUR,
    symbol: CurrencySymbolEnum.EUR
  };
}



@Injectable()
export class CurrencyService {
  private _preferredCurrency = signal<CurrencyShape | null>(null);



  public constructor() { }

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