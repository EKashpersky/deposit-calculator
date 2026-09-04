import { TaxTiming } from '@features/calculator/model';
import { CurrencyShape } from '@shared/Currency';



export interface DurationPOJO {
  readonly scale: 'years' | 'months';
  readonly duration: number;
}

export interface DepositInputPOJO {
  readonly principal: number;
  readonly annualRate: number;
  readonly monthlyDeposit: number;
  readonly duration: DurationPOJO;
  readonly taxRate: number;
  readonly taxTiming: TaxTiming;
  readonly accrualFrequncy: number;
  readonly capitalize: boolean;
  readonly noStartDeposits: number;
  readonly noEndDeposits: number;
}

export interface DepositResultPOJO {
  readonly deposited: number;
  readonly interest: number;
  readonly taxed: number;
  readonly net: number;
}



export interface DepositPOJO {
  readonly currency: CurrencyShape;
  readonly autoConversion: boolean;
  readonly input: DepositInputPOJO;
  readonly result: DepositResultPOJO;
}