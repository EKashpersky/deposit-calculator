import { Injectable, signal } from '@angular/core';

import { CurrencyCodeEnum } from '@config/supported-currencies';




export interface CurrencyRate {
  code: CurrencyCodeEnum;
  buy: number;
  sell: number;
}



@Injectable()
export class CurrencyRatesService {
  private _rates = signal<CurrencyRate[]>([]);
  public readonly rates = this._rates.asReadonly();



  public getRate(currencyCode: CurrencyCodeEnum) {
    return this._rates().find(
      currencyRate => currencyRate.code === currencyCode
    ) || null;
  }

  public setRates(rates: CurrencyRate[]) {
    this._rates.set(rates);
  }
}