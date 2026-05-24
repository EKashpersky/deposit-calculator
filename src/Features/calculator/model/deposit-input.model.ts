import { Duration } from './duration.model';



export class DepositInput {
  public readonly principal: number;      /// 10000
  public readonly annualRate: number;     /// 12
  public readonly duration: Duration;     /// new Duration('months', 12)
  public readonly monthlyDeposit: number; /// 100
  public readonly tax: number;            /// 23
  public readonly compoundRate: number;   /// See CompoundRate enum
  public readonly noFirstMonthDeposit: boolean;

  public static Empty(): DepositInput {
    return new DepositInput(0, 0, new Duration('months', 0), 0, 0, 0, false);
  }

  public static New(
    principal: number,
    annualRate: number,
    duration: Duration,
    monthlyDeposit: number,
    tax: number,
    compoundRate: number,
    noFirstMonthDeposit: boolean,
  ) {
    return new DepositInput(
      principal,
      annualRate,
      duration,
      monthlyDeposit,
      tax,
      compoundRate,
      noFirstMonthDeposit,
    );
  }

  private constructor(
    principal: number,
    annualRate: number,
    duration: Duration,
    monthlyDeposit: number,
    tax: number,
    compoundRate: number,
    noFirstMonthDeposit: boolean,
  ) {
    this.principal        = principal;
    this.annualRate       = annualRate;
    this.duration         = duration;
    this.monthlyDeposit   = monthlyDeposit;
    this.tax              = tax;
    this.compoundRate     = compoundRate;
    this.noFirstMonthDeposit = noFirstMonthDeposit;
  }
}
