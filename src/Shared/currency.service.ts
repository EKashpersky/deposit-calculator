import { Injectable, signal } from '@angular/core';



export enum CurrencyCodeEnum {
  EUR = 'EUR',
  UAH = 'UAH',
  USD = 'USD',
}

export enum CurrencyCharEnum {
  EUR = '€',
  UAH = '₴',
  USD = '$',
}




export interface CurrencyShape {
  code: CurrencyCodeEnum;
  symbol: CurrencyCharEnum;
}

const SUPPORTED_CURRENCIES = [
  {
    code: CurrencyCodeEnum.EUR,
    symbol: CurrencyCharEnum.EUR,
  },
  {
    code: CurrencyCodeEnum.USD,
    symbol: CurrencyCharEnum.USD,
  },
  {
    code: CurrencyCodeEnum.UAH,
    symbol: CurrencyCharEnum.UAH,
  },
] as const satisfies CurrencyShape[];



@Injectable()
export class CurrencyService {
  private _currency = signal<CurrencyShape>(SUPPORTED_CURRENCIES[0]);
  public readonly currency = this._currency.asReadonly();



  public getSupportedCurrencies() {
    return [...SUPPORTED_CURRENCIES];
  }

  public changeCurrency(currency: CurrencyShape) {
    this._currency.set(currency);
  }
}