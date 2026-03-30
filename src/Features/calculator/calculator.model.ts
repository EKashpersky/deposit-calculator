import { DepositInput } from './deposit-input.model';
import { DepositResult } from './deposit-result.model';



export function calculateDeposit(depositInput: DepositInput): DepositResult {
  if (depositInput.compoundRate === 0) {
    return computeSimpleInterest(
      depositInput.principal,
      depositInput.annualRate,
      depositInput.duration.durationInYears(),
      depositInput.duration.durationInMonths(),
      depositInput.monthlyDeposit,
      depositInput.tax,
      depositInput.noFirstMonthDeposit,
    );
  }

  return computeCompoundInterest(
    depositInput.principal,
    depositInput.annualRate,
    depositInput.duration.durationInMonths(),
    depositInput.monthlyDeposit,
    depositInput.tax,
    depositInput.compoundRate,
    depositInput.noFirstMonthDeposit,
  );
}



/**
 * No capitalization — interest is paid out, not added to principal.
 * Each monthly deposit earns simple interest for remaining months.
**/
function computeSimpleInterest(
  p: number, /// principal
  r: number, /// annual interest rate
  D: number, /// duration in years
  d: number, /// duration in months
  m: number, /// monthly deposit amount
  t: number, /// tax rate
  n: boolean, /// no first month deposit
): DepositResult {
  /// Amount of months user makes additional deposits
  const mm = n ? d - 1 : d;

  const principalInterest = p * r * D;
  const monthlyInterest   = m * (r / 12) * (mm * (mm - 1)) / 2;

  const interest = principalInterest + monthlyInterest;
  const depositedAmount = mm * m;

  const taxed = interest * t;
  const fvNet = p + depositedAmount + interest - taxed;

  return DepositResult.build(p, depositedAmount, interest, taxed, fvNet);
}

/**
 * Compound interest with tax deducted each compounding period.
 * Converts nominal rate with compounding frequency `c` to effective monthly rate,
 * then applies standard compound + annuity formulas.
**/
function computeCompoundInterest(
  p: number, /// principal
  r: number, /// annual interest rate
  d: number, /// duration in months
  m: number, /// monthly deposit
  t: number, /// tax rate
  c: number, /// compound frequency
  n: boolean, /// no first month deposit
): DepositResult {
  /// Amount of months user makes additional deposits
  const mm = n ? d - 1 : d;

  const rate = Math.pow(1 + r / c, c / 12) - 1;

  const principalGross = p * (1 + rate) ** d;
  const monthlyGross = m * ((1 + rate) ** mm - 1) / rate;

  const deposited = mm * m;
  const fvGross   = principalGross + monthlyGross;
  const interest  = fvGross - (p + deposited);
  const taxed     = interest * t;
  const fvNet     = fvGross - taxed;

  return DepositResult.build(p, deposited, interest, taxed, fvNet);
}