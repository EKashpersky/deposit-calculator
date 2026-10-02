import { Injectable, signal, WritableSignal } from '@angular/core';
import { CurrencyCodeEnum } from '@config/supported-currencies';



/**
 * @example { [CurrencyCodeEnum.UAH]: 0.08 }
**/
export type CurrencyMap = Record<CurrencyCodeEnum, number>;

@Injectable()
export class CurrencyInflationService {
  private _currency2Inflation: WritableSignal<Partial<CurrencyMap>>;

  public constructor() {
    this._currency2Inflation = signal({});
  }

  public updates() {
    return this._currency2Inflation();
  }

  /**
   * Resets all existing 
  **/
  public setBatch(currency2Inflation: Partial<CurrencyMap>) {
    this._currency2Inflation.set(currency2Inflation);
  }

  /**
   * Creates or updates a record with inflation
  **/
  public setOne(inflationCurrencyCode: CurrencyCodeEnum, inflation: number) {
    if (typeof inflation !== 'number' || inflation < 0) {
      return void 0;
    }

    this._currency2Inflation.update(currencyToInflation => {
      currencyToInflation[inflationCurrencyCode] = inflation;
      return currencyToInflation;
    })
  }

  public getOne(currencyCode: CurrencyCodeEnum) {
    return this._currency2Inflation()[currencyCode];
  }

  public getOneSafe(currencyCode: CurrencyCodeEnum) {
    return this._currency2Inflation()[currencyCode] || 0;
  }
}
