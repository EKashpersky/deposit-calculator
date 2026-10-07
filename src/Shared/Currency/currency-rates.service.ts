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



  public mid(code: CurrencyCodeEnum): number {
    const rate = this.getRate(code);
    if (!rate) {
      throw new Error(`No rate for ${code}`);
    }

    return (rate.buy + rate.sell) / 2;
  }

  public crossRate(from: CurrencyCodeEnum, to: CurrencyCodeEnum): number {
    if (from === to) {
      return 1;
    }

    return this.mid(from) / this.mid(to);
  }

  public getRate(currencyCode: CurrencyCodeEnum) {
    return this._rates().find(
      currencyRate => currencyRate.code === currencyCode
    ) || null;
  }

  public setRates(rates: CurrencyRate[]) {
    this._rates.set(rates);
  }
}