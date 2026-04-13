export interface DurationPOJO {
  readonly scale: 'years' | 'months';
  readonly duration: number;
}

export interface DepositInputPOJO {
  readonly principal: number;
  readonly annualRate: number;
  readonly duration: DurationPOJO;
  readonly monthlyDeposit: number;
  readonly tax: number;
  readonly compoundRate: number;
  readonly noFirstMonthDeposit: boolean;
}

export interface DepositResultPOJO {
  readonly deposited: number;
  readonly interest: number;
  readonly taxed: number;
  readonly net: number;
}



export interface DepositPOJO {
  readonly input: DepositInputPOJO;
  readonly result: DepositResultPOJO;
}