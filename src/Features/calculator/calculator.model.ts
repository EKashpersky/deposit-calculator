import { DurationScaleShape, InterestResult } from "./duration-scale.model";



export class DepositInput {
  public readonly principal: number;
  public readonly annualRate: number;
  public readonly durationInMonths: number;
  public readonly monthlyDeposit: number;
  public readonly tax: number;
  public readonly compoundRate: number;
  public readonly noFirstMonthDeposit: boolean;

  public constructor(
    principal: number,
    annualRate: number,
    durationInMonths: number,
    monthlyDeposit: number,
    tax: number,
    compoundRate: number,
    noFirstMonthDeposit: boolean,
  ) {
    this.principal        = principal;
    this.annualRate       = annualRate;
    this.durationInMonths = durationInMonths;
    this.monthlyDeposit   = monthlyDeposit;
    this.tax              = tax;
    this.compoundRate     = compoundRate;
    this.noFirstMonthDeposit = noFirstMonthDeposit;
  }
}




export function calculateDeposit(
  durationScale: DurationScaleShape,
  depositInput: DepositInput,
) {
  if (depositInput.compoundRate === 0) {
    return durationScale.calculateSimpleInterestWithTax(
      depositInput.principal,
      depositInput.annualRate,
      depositInput.durationInMonths,
      depositInput.monthlyDeposit,
      depositInput.tax,
      depositInput.noFirstMonthDeposit,
    );
  }

  return durationScale.calculateCompoundInterestWithTax(
    depositInput.principal,
    depositInput.annualRate,
    depositInput.durationInMonths,
    depositInput.monthlyDeposit,
    depositInput.tax,
    depositInput.compoundRate,
    depositInput.noFirstMonthDeposit,
  );
}