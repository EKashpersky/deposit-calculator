import {
  DepositInput,
  DepositModel,
  Duration
} from '@features/calculator/model';
import { DomainSerializer } from '@shared/Storage';

import { DepositPOJO } from './storage.models';



export class DepositSerializer implements DomainSerializer<DepositModel, DepositPOJO> {
  public deserialize(name: string, deposit: DepositPOJO): DepositModel {
    return new DepositModel(
      name,
      deposit.currency,
      deposit.autoConversion,
      DepositInput.New(
        deposit.input.principal,
        deposit.input.annualRate,
        new Duration(deposit.input.duration.scale, deposit.input.duration.duration),
        deposit.input.monthlyDeposit,
        deposit.input.tax,
        deposit.input.compoundRate,
        deposit.input.flags
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
        tax: deposit.input().tax,
        compoundRate: deposit.input().compoundRate,
        flags: deposit.input().flags,
      },
      result: deposit.result(),
    }
  }
}