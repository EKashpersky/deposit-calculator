import { Injectable } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';

import { CurrencyCodeEnum } from '@config/supported-currencies';



@Injectable()
export class CurrencyApiService {
  public constructor() { }

  public getCurrencyRates() {
    const MIN_OF_FIN_UA = [
      { code: CurrencyCodeEnum.UAH, buy: 1,        sell: 1 },
      { code: CurrencyCodeEnum.USD, buy: 44.44879, sell: 44.93841 },
      { code: CurrencyCodeEnum.EUR, buy: 51.22041, sell: 51.85797 },
    ];

    return lastValueFrom(of(MIN_OF_FIN_UA));
  }
}
