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
        /// @ts-ignore
        deposit.input.accrualFrequncy || deposit.input['compoundRate'],
        deposit.input.capitalize,
        /// @ts-ignore
        deposit.input.taxRate || deposit.input['tax'],
        /// @ts-ignore
        deposit.input.taxTiming || deposit.input['withTaxes'] ? TaxTiming.AtMaturity : TaxTiming.None,
        deposit.input.noStartDeposits,
        deposit.input.noEndDeposits,
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

        noStartDeposits: deposit.input().noStartDeposits,
        noEndDeposits: deposit.input().noEndDeposits,
      },
      result: deposit.result(),
    }
  }
}