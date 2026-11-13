import { Injectable } from '@angular/core';

import { CurrencyCodeEnum } from '@config/supported-currencies';
import { CurrencyBankService } from './currency-bank.service';



export enum CurrencyConvertSide {
  Buy = 'buy',
  Sell = 'sell',
  Mid = 'mid',
}

@Injectable()
export class CurrencyOpsService {
  public constructor(private _currencyBank: CurrencyBankService) { }

  public crossRate(from: CurrencyCodeEnum, to: CurrencyCodeEnum): number {
    if (from === to) {
      return 1;
    }

    const fromRate = this._currencyBank.getRate(from);
    const toRate = this._currencyBank.getRate(to);

    if (!fromRate || !toRate) {
      throw new Error(`No rate for ${from} or ${to}`);
    }

    return fromRate.mid / toRate.mid;
  }


  public exchangeMid(amount: number, from: CurrencyCodeEnum, to: CurrencyCodeEnum) {
    return this._convert(amount, from, to, CurrencyConvertSide.Mid);
  }



  private _convert(
    amount: number,
    from: CurrencyCodeEnum,
    to: CurrencyCodeEnum,
    side: CurrencyConvertSide
  ) {
    if (amount <= 0) {
      throw new Error(`Amount can't be 0 or less`);
    }

    if (from === to) {
      return amount;
    }

    let result = 0;
    if (side === CurrencyConvertSide.Mid) {
      const amountInUah = amount * this._currencyBank.getRate(from)!.mid;
      result = amountInUah / this._currencyBank.getRate(to)!.mid;
    }

    return Math.round(result * 100) / 100;
  }
}