import { Duration } from './duration.model';



export class DepositInput {
  public readonly principal: number;
  public readonly annualRate: number;
  public readonly duration: Duration;
  public readonly monthlyDeposit: number;
  public readonly tax: number;
  public readonly compoundRate: number;
  public readonly noFirstMonthDeposit: boolean;

  public constructor(
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
