import {
  DepositInput,
  DepositModel,
  Duration
} from '@features/calculator/model';

import { DepositPOJO } from './storage.models';



export class DepositSerializer {
  public static deserialize(deposit: DepositPOJO): DepositModel {
    return new DepositModel(
      deposit.name,
      new DepositInput(
        deposit.input.principal,
        deposit.input.annualRate,
        new Duration(deposit.input.duration.scale, deposit.input.duration.duration),
        deposit.input.monthlyDeposit,
        deposit.input.tax,
        deposit.input.compoundRate,
        deposit.input.noFirstMonthDeposit
      ),
      deposit.result
    );
  }

  public static serialize(deposit: DepositModel): DepositPOJO {
    return {
      name: deposit.name(),
      input: {
        principal: deposit.input().principal,
        annualRate: deposit.input().annualRate,
        duration: {
          scale: deposit.input().duration.scale(),
          duration: deposit.input().duration.duration()
        },
        monthlyDeposit: deposit.input().monthlyDeposit,
        tax: deposit.input().tax,
        compoundRate: deposit.input().compoundRate, 
        noFirstMonthDeposit: deposit.input().noFirstMonthDeposit,
      },
      result: deposit.result(),
    }
  }
}