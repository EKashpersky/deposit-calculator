import { Injectable } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';

import { CurrencyCodeEnum } from '@config/supported-currencies';



@Injectable()
export class CurrencyApiService {
  public constructor() { }

  public getCurrencyRates() {
    const MIN_OF_FIN_UA = [
      { code: CurrencyCodeEnum.UAH, buy: 1,        sell: 1 },
      { code: CurrencyCodeEnum.USD, buy: 44.44279, sell: 44.93429 },
      { code: CurrencyCodeEnum.EUR, buy: 51.84598, sell: 52.52861 },
      { code: CurrencyCodeEnum.GBP, buy: 59.57273, sell: 61.26591 },
      { code: CurrencyCodeEnum.PLN, buy: 11.66938, sell: 12.19063 },
      { code: CurrencyCodeEnum.CHF, buy: 54.84167, sell: 56.6125 },
      { code: CurrencyCodeEnum.CZK, buy: 1.855,    sell: 2.155 },
      { code: CurrencyCodeEnum.CAD, buy: 31.25,    sell: 32.3 },
      { code: CurrencyCodeEnum.HUF, buy: 0.128,    sell: 0.14 },
      { code: CurrencyCodeEnum.AUD, buy: 30.25,    sell: 31.2 },
      { code: CurrencyCodeEnum.RON, buy: 9.3,      sell: 10 },
      { code: CurrencyCodeEnum.TRY, buy: 0.95,     sell: 1.05 },
      { code: CurrencyCodeEnum.JPY, buy: 0.27,     sell: 0.29 },
      { code: CurrencyCodeEnum.CNY, buy: 6.5,      sell: 6.75 },
      { code: CurrencyCodeEnum.ILS, buy: 12.75,    sell: 13.5 },
    ];

    return lastValueFrom(of(MIN_OF_FIN_UA));
  }
}
