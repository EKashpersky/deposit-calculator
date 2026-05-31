import { round } from '@utils/round';

import {
  DepositFlags,
  DepositInput,
  DepositResult,
  Duration,
} from './model';



export function createDepositInput(
  principal: number,
  annualRate: number,
  duration: Duration,
  monthlyDeposit: number,
  tax: number,
  compoundRateValue: number,
  noFirstMonthDeposit: boolean,
  isTaxed: boolean,
) {
  return DepositInput.New(
    round(principal),
    annualRate,
    duration,
    round(monthlyDeposit),
    tax,
    compoundRateValue,
    DepositFlags.Create(isTaxed, noFirstMonthDeposit),
  );
}

export function calculateDeposit(depositInput: DepositInput): DepositResult {
  if (depositInput.compoundRate === 0) {
    return computeSimpleInterest(
      depositInput.principal,
      round(depositInput.annualRate / 100),
      depositInput.duration.durationInYears(),
      depositInput.duration.durationInMonths(),
      depositInput.monthlyDeposit,
      round(depositInput.tax / 100),
      depositInput.isNoFirstMonthDeposit(),
      depositInput.isTaxed()
    );
  }

  return computeCompoundInterest(
    depositInput.principal,
    round(depositInput.annualRate / 100),
    depositInput.duration.durationInMonths(),
    depositInput.monthlyDeposit,
    round(depositInput.tax / 100),
    depositInput.compoundRate,
    depositInput.isNoFirstMonthDeposit(),
    depositInput.isTaxed()
  );
}



/**
 * No capitalization — interest is paid out, not added to principal.
 * Each monthly deposit earns simple interest for remaining months.
**/
function computeSimpleInterest(
  pn: number, /// principal
  ra: number, /// annual interest rate
  dy: number, /// duration in years
  dm: number, /// duration in months
  ml: number, /// monthly deposit amount
  tx: number, /// tax rate
  nd: boolean, /// no first month deposit
  td: boolean, /// taxed
): DepositResult {
  /// Amount of months user makes additional deposits
  const mm = nd ? dm - 1 : dm;
  /// Tax rate
  const tr = tx * +td;

  const principalInterest = pn * ra * dy;
  const monthlyInterest   = ml * (ra / 12) * (mm * (mm - 1)) / 2;

  const grossInterest  = principalInterest + monthlyInterest;
  const totalDeposited = mm * ml;

  const taxed = grossInterest * tr;
  const fvNet = pn + totalDeposited + grossInterest - taxed;

  return DepositResult.build(totalDeposited, grossInterest, taxed, fvNet);
}

/**
 * Compound interest with tax deducted each compounding period.
 * Converts nominal rate with compounding frequency `c` to effective monthly rate,
 * then applies standard compound + annuity formulas.
**/
function computeCompoundInterest(
  pn: number, /// principal
  ra: number, /// annual interest rate
  da: number, /// duration in months
  ml: number, /// monthly deposit
  tx: number, /// tax percentage
  cp: number, /// compound frequency
  nd: boolean, /// no first month deposit
  td: boolean, /// taxed
): DepositResult {
  /// Amount of months user makes additional deposits
  const mm = nd ? da - 1 : da;
  /// Tax rate
  const tr = tx * +td;

  const rate = Math.pow(1 + ra / cp, cp / 12) - 1;

  const principalGross = pn * (1 + rate) ** da;
  const monthlyGross = ml * ((1 + rate) ** mm - 1) / rate;

  const fvGross       = principalGross + monthlyGross;

  const totalDeposited = mm * ml;
  const grossInterest  = fvGross - (pn + totalDeposited);
  const taxed = grossInterest * tr;
  const fvNet = fvGross - taxed;

  return DepositResult.build(totalDeposited, grossInterest, taxed, fvNet);
}