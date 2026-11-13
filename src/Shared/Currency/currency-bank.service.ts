import { httpResource, HttpResourceRef } from '@angular/common/http';
import { computed, Injectable, Signal } from '@angular/core';
import { CurrencyRateView, RateProviderView } from 'dc-api-types';

import { environment } from '@environment/development';

import {
  CurrencyCodeEnum,
  CurrencySymbolEnum
} from '@config/supported-currencies';

import { CurrencyShape } from './currency.model';



export interface CurrencyInflation {
  year: number;
  value: number;
}

export interface CurrencyRate {
  mid: number;
}

export interface CurrencyBankCellShape {
  symbol: CurrencySymbolEnum;
  code: CurrencyCodeEnum;
  rate: CurrencyRate;
  inflation: CurrencyInflation[];
}



@Injectable()
export class CurrencyBankService {
  public readonly providers: HttpResourceRef<RateProviderView[] | void>;
  private _provider: Signal<RateProviderView>;
  public readonly rates: HttpResourceRef<CurrencyRateView[] | void>;
  private _mappedRates: Signal<CurrencyShape[]>;

  public constructor() {
    this.providers = httpResource(() => `${environment.apiUrl}/providers`);

    this._provider = computed(() => {
      return this.providers.value()?.[0] || {
        id: -1,
        name: '',
        baseCurrency: {
          id: -1,
          a3c: '',
          symbol: '',
        }
      };
    });

    this.rates = httpResource(
      () => {
        if (this._provider().id === -1) {
          return undefined;
        }

        return {
          url: `${environment.apiUrl}/rates?providerId=${this._provider().id}`,
          method: 'GET',
        }
      }
    );

    this._mappedRates = computed(() =>
      this.rates.value()!.map(ratex =>
        ({
          code: ratex.currency.a3c as CurrencyCodeEnum,
          symbol: ratex.currency.symbol as CurrencySymbolEnum,
        }) as CurrencyShape
      )
    );
  }

  public getMappedRates() {
    return this._mappedRates();
  }

  public getRate(currencyCode: CurrencyCodeEnum) {
    const rates = this.rates.value();
    if (!rates) {
      return null;
    }

    return rates.find(
      currencyRate => currencyRate.currency.a3c === currencyCode
    ) || null;
  }
}
