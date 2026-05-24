import { Duration } from './duration.model';




export const FLAG_TAXED = 1 << 0;
export const FLAG_NO_FIRST_MONTH_DEPOSIT = 1 << 1;

export class DepositInput {
  public readonly principal: number;      /// 10000
  public readonly annualRate: number;     /// 12
  public readonly duration: Duration;     /// new Duration('months', 12)
  public readonly monthlyDeposit: number; /// 100
  public readonly tax: number;            /// 23
  public readonly compoundRate: number;   /// See CompoundRate enum
  public readonly flags: number;



  public static Empty(): DepositInput {
    return new DepositInput(0, 0, new Duration('months', 0), 0, 0, 0, 0);
  }

  public static New(
    principal: number,
    annualRate: number,
    duration: Duration,
    monthlyDeposit: number,
    tax: number,
    compoundRate: number,
    flags: number,
  ) {
    return new DepositInput(
      principal,
      annualRate,
      duration,
      monthlyDeposit,
      tax,
      compoundRate,
      flags,
    );
  }

  private constructor(
    principal: number,
    annualRate: number,
    duration: Duration,
    monthlyDeposit: number,
    tax: number,
    compoundRate: number,
    flags: number,
  ) {
    this.principal      = principal;
    this.annualRate     = annualRate;
    this.duration       = duration;
    this.monthlyDeposit = monthlyDeposit;
    this.tax            = tax;
    this.compoundRate   = compoundRate;
    this.flags          = flags;
  }

  public isTaxed() {
    return Boolean(this.flags & FLAG_TAXED);
  }

  public isNoFirstMonthDeposit() {
    return Boolean(this.flags & FLAG_NO_FIRST_MONTH_DEPOSIT);
  }
}
