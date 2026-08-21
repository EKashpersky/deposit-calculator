import { DepositFlags } from './deposit-flags.model';
import { Duration } from './duration.model';



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

  public withCurrencyUpdate(principal: number, monthlyDeposit: number) {
    return new DepositInput(
      principal,
      this.annualRate,
      this.duration,
      monthlyDeposit,
      this.tax,
      this.compoundRate,
      this.flags
    );
  }

  public isTaxed() {
    return Boolean(DepositFlags.IsTaxed(this.flags));
  }

  public isNoFirstMonthDeposit() {
    return Boolean(DepositFlags.IsNoFirstMonthDeposit(this.flags));
  }
}
