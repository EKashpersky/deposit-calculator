import { round } from '@utils/round';

import {
  DepositFlags,
  DepositInput,
  DepositResult,
  Duration,
} from './model';

// Input validation
export function validateDepositInput(
  principal: number,
  annualRate: number,
  monthlyDeposit: number,
  durationInMonths: number,
): void {
  if (principal < 0) {
    throw new Error(`Principal can't be negative`);
  } else if (annualRate <= 0 || annualRate > 100) {
    throw new Error(`Annual rate is out of range`);
  } else if (monthlyDeposit < 0) {
    throw new Error(`Monthly deposit can't be negative`);
  } else if (durationInMonths <= 0) {
    throw new Error(`Duration can't be negative`);
  }
}

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
  const durationInMonths = duration.durationInMonths();
  validateDepositInput(principal, annualRate, monthlyDeposit, durationInMonths);

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

  const principalInterest = calculateSimpleInterestOnPrincipal(pn, ra, dy);
  const monthlyInterest = calculateSimpleInterestOnAnnuity(ml, ra / 12, mm);

  const grossInterest = principalInterest + monthlyInterest;
  const totalDeposited = mm * ml;

  const taxed = calculateTaxAmount(grossInterest, tr, td);
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

  const monthlyRate = calculateEffectiveMonthlyRate(ra, cp);

  const principalGrowth = calculatePrincipalGrowth(pn, monthlyRate, da);
  const annuityGrowth = calculateAnnuityGrowth(ml, monthlyRate, mm);

  const fvGross = principalGrowth + annuityGrowth;
  const totalDeposited = mm * ml;
  const grossInterest = fvGross - (pn + totalDeposited);
  const taxed = calculateTaxAmount(grossInterest, tr, td);
  const fvNet = fvGross - taxed;

  return DepositResult.build(totalDeposited, grossInterest, taxed, fvNet);
}




// aosteuhsaoetnhu

//
//
//
//
//
//
//
//
//
//
//
// --- ATOMIC MATH FUNCTIONS ---

/**
 * Converts a nominal annual rate to an effective monthly rate based on compounding frequency.
 */
export function calculateEffectiveMonthlyRate(annualRate: number, compoundFrequency: number): number {
  return Math.pow(1 + annualRate / compoundFrequency, compoundFrequency / 12) - 1;
}

/**
 * Calculates how much an initial sum grows over time.
 */
export function calculatePrincipalGrowth(principal: number, monthlyRate: number, periods: number): number {
  return principal * Math.pow(1 + monthlyRate, periods);
}

/**
 * Calculates the future value of a series of regular monthly deposits (Annuity).
 */
export function calculateAnnuityGrowth(monthlyDeposit: number, monthlyRate: number, periods: number): number {
  if (monthlyRate === 0) return monthlyDeposit * periods;
  return monthlyDeposit * ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate);
}

/**
 * Calculates the interest earned on a principal sum under simple interest rules.
 */
export function calculateSimpleInterestOnPrincipal(principal: number, annualRate: number, years: number): number {
  return principal * annualRate * years;
}

/**
 * Calculates the interest earned on a series of monthly deposits under simple interest rules.
 */
export function calculateSimpleInterestOnAnnuity(monthlyDeposit: number, monthlyRate: number, months: number): number {
  return monthlyDeposit * monthlyRate * (months * (months - 1)) / 2;
}

/**
 * Calculates the tax to be deducted from interest.
 */
export function calculateTaxAmount(grossInterest: number, taxRate: number, isTaxed: boolean): number {
  return isTaxed ? grossInterest * taxRate : 0;
}

//
//
//
//
//
//
//
//
//
//
// --- V2 COMPUTATION FUNCTIONS ---

/**
 * Computes simple interest using atomic math functions.
 */
export function computeSimpleInterestV2(
  pn: number,
  ra: number,
  dy: number,
  dm: number,
  ml: number,
  tx: number,
  nd: boolean,
  td: boolean,
): DepositResult {
  const mm = nd ? dm - 1 : dm;
  const principalInterest = calculateSimpleInterestOnPrincipal(pn, ra, dy);
  const monthlyInterest = calculateSimpleInterestOnAnnuity(ml, ra / 12, mm);
  const grossInterest = principalInterest + monthlyInterest;
  const totalDeposited = mm * ml;
  const taxed = calculateTaxAmount(grossInterest, tx, td);
  const fvNet = pn + totalDeposited + grossInterest - taxed;

  return DepositResult.build(totalDeposited, grossInterest, taxed, fvNet);
}

/**
 * Computes compound interest using atomic math functions.
 */
export function computeCompoundInterestV2(
  pn: number,
  ra: number,
  da: number,
  ml: number,
  tx: number,
  cp: number,
  nd: boolean,
  td: boolean,
): DepositResult {
  const mm = nd ? da - 1 : da;
  const monthlyRate = calculateEffectiveMonthlyRate(ra, cp);
  const principalGrowth = calculatePrincipalGrowth(pn, monthlyRate, da);
  const annuityGrowth = calculateAnnuityGrowth(ml, monthlyRate, mm);

  const fvGross = principalGrowth + annuityGrowth;
  const totalDeposited = mm * ml;
  const grossInterest = fvGross - (pn + totalDeposited);
  const taxed = calculateTaxAmount(grossInterest, tx, td);
  const fvNet = fvGross - taxed;

  return DepositResult.build(totalDeposited, grossInterest, taxed, fvNet);
}
