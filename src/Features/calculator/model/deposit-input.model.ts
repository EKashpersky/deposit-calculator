import { AccrualFrequency, TaxTiming } from './common.enum';
import { Duration } from './duration.model';



export class DepositInput {
  public readonly principal: number;
  public readonly annualRate: number;
  public readonly duration: Duration;
  public readonly monthlyDeposit: number;

  public readonly accrualFrequency: AccrualFrequency;
  public readonly capitalize: boolean;

  public readonly taxRate: number;
  public readonly taxTiming: TaxTiming;

  /**
   * Twese two define a period within this.duration.durationInMonths() duration
   * of how long can the deposit be top-up
  **/
  public readonly depositingMonthBegin: number;
  public readonly depositingMonthEnd: number;
  public readonly depositAtMonthStart: boolean;



  public static Empty(): DepositInput {
    return new DepositInput(
      0,
      0,
      new Duration('months', 0),
      0,
      AccrualFrequency.MONTHLY,
      false,
      0,
      TaxTiming.None,
      0,
      0,
      true,
    );
  }

  public constructor(
    principal: number,
    annualRate: number,
    duration: Duration,
    monthlyDeposit: number,

    accrualFrequency: AccrualFrequency,
    capitalize: boolean,

    taxRate: number,
    taxTiming: TaxTiming,

    depositingMonthBegin: number,
    depositingMonthEnd: number,
    depositAtMonthBeginning: boolean,
  ) {
    this.principal         = principal;
    this.annualRate        = annualRate;
    this.duration          = duration;
    this.monthlyDeposit    = monthlyDeposit;

    this.accrualFrequency  = accrualFrequency;
    this.capitalize        = capitalize;

    this.taxRate           = taxRate;
    this.taxTiming         = taxTiming;

    this.depositingMonthBegin = depositingMonthBegin;
    this.depositingMonthEnd   = depositingMonthEnd;
    this.depositAtMonthStart  = depositAtMonthBeginning;
  }

  public withCurrencyUpdate(principal: number, monthlyDeposit: number) {
    return new DepositInput(
      principal,
      this.annualRate,
      this.duration,
      monthlyDeposit,
      this.accrualFrequency,
      this.capitalize,
      this.taxRate,
      this.taxTiming,
      this.depositingMonthBegin,
      this.depositingMonthEnd,
      this.depositAtMonthStart,
    );
  }

  public isTaxed() {
    return this.taxTiming !== TaxTiming.None;
  }
}