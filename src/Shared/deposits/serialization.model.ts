import {
  DepositInput,
  DepositModel,
  Duration,
  TaxTiming
} from '@features/calculator/model';
import { DomainSerializer } from '@shared/Storage';

import { DepositPOJO } from './storage.models';



export class DepositSerializer implements DomainSerializer<DepositModel, DepositPOJO> {
  public deserialize(name: string, deposit: DepositPOJO): DepositModel {
    return new DepositModel(
      name,
      deposit.currency,
      deposit.autoConversion,
      new DepositInput(
        deposit.input.principal,
        deposit.input.annualRate,
        new Duration(deposit.input.duration.scale, deposit.input.duration.duration),
        deposit.input.monthlyDeposit,
        deposit.input.accrualFrequncy,
        deposit.input.capitalize,
        deposit.input.taxRate,
        deposit.input.taxTiming,
        deposit.input.depositingMonthBegin,
        deposit.input.depositingMonthEnd,
        deposit.input.depositAtMonthStart
      ),
      deposit.result
    );
  }

  public serialize(deposit: DepositModel): DepositPOJO {
    return {
      currency: deposit.currency(),
      autoConversion: deposit.autoConversion(),
      input: {
        principal: deposit.input().principal,
        annualRate: deposit.input().annualRate,
        duration: {
          scale: deposit.input().duration.scale(),
          duration: deposit.input().duration.duration()
        },
        monthlyDeposit: deposit.input().monthlyDeposit,

        taxRate: deposit.input().taxRate,
        taxTiming: deposit.input().taxTiming,

        accrualFrequncy: deposit.input().accrualFrequency,
        capitalize: deposit.input().capitalize,

        depositingMonthBegin: deposit.input().depositingMonthBegin,
        depositingMonthEnd: deposit.input().depositingMonthEnd,
        depositAtMonthStart: deposit.input().depositAtMonthStart,
      },
      result: deposit.result(),
    }
  }
}