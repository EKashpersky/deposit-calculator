import { Injectable, signal } from '@angular/core';



export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  UAH = 'UAH',
}



export interface CurrencyShape {
  code: Currency;
  symbol: string;
}

const SUPPORTED_CURRENCIES = [
  {
    code: Currency.EUR,
    symbol: '€',
  },
  {
    code: Currency.USD,
    symbol: '$',
  },
  {
    code: Currency.UAH,
    symbol: '₴',
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