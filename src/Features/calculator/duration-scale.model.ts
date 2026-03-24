export class InterestResult {
  public readonly fvNet: number;
  public readonly interest: number;
  public readonly deposited: number;
  public readonly taxed: number;

  public static build(
    fvNet: number,
    deposited: number,
    interest: number,
    taxed: number
  ): InterestResult {
    return new InterestResult(fvNet, interest, deposited, taxed);
  }

  public constructor(
    fvNet: number,
    interest: number,
    deposited: number,
    taxed: number
  ) {
    this.fvNet = fvNet;
    this.interest = interest;
    this.deposited = deposited;
    this.taxed = taxed;
  }
}

export interface DurationScaleShape {
  readonly name: 'years' | 'months';

  calculateSimpleInterestWithTax(
    p: number, /// principal
    r: number, /// annual interest rate (e.g. 0.16 for 16%)
    d: number, /// duration (years or months depending on scale)
    m: number, /// monthly deposit
    t: number, /// tax rate (e.g. 0.23 for 23%)
  ): InterestResult;

  calculateCompoundInterestWithTax(
    p: number, /// principal
    r: number, /// annual interest rate (e.g. 0.16 for 16%)
    d: number, /// duration (years or months depending on scale)
    m: number, /// monthly deposit
    t: number, /// tax rate (e.g. 0.23 for 23%)
    c: number, /// compound frequency per year (1=yearly, 12=monthly, 365.25=daily)
  ): InterestResult;
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
  m: number, /// monthly deposit
  t: number, /// tax rate
): InterestResult {
  const interest = p * r * D + m * (r / 12) * (d * (d + 1)) / 2;
  const taxed = interest * t;
  const donated = d * m;
  const fvNet = p + donated + interest - taxed;

  return InterestResult.build(fvNet, donated, interest, taxed);
}



/**
 * Compound interest with tax deducted each compounding period.
 * Converts nominal rate with compounding frequency `c` to effective monthly rate,
 * then applies standard compound + annuity formulas.
**/
function computeCompound(
  p: number, /// principal
  r: number, /// annual interest rate
  d: number, /// duration in months
  m: number, /// monthly deposit
  t: number, /// tax rate
  c: number, /// compound frequency
): InterestResult {
  const rate = Math.pow(1 + r / c, c / 12) - 1;

  const principalGross = p * (1 + rate) ** d;
  const monthlyGross = m * ((1 + rate) ** d - 1) / rate;

  const deposited = d * m;
  const fvGross = principalGross + monthlyGross;
  const interest = fvGross - (p + deposited);
  const taxed = interest * t;
  const fvNet = fvGross - taxed;

  return InterestResult.build(fvNet, deposited, interest, taxed);
}



export class DurationInYears implements DurationScaleShape {
  public readonly name = 'years';

  public calculateSimpleInterestWithTax(
    p: number, r: number, d: number, m: number, t: number,
  ): InterestResult {
    return computeSimpleInterest(p, r, d, d * 12, m, t);
  }

  public calculateCompoundInterestWithTax(
    p: number, r: number, d: number, m: number, t: number, c: number,
  ): InterestResult {
    return computeCompound(p, r, d * 12, m, t, c);
  }
}

export class DurationInMonths implements DurationScaleShape {
  public readonly name = 'months';

  public calculateSimpleInterestWithTax(
    p: number, r: number, d: number, m: number, t: number,
  ): InterestResult {
    return computeSimpleInterest(p, r, d / 12, d, m, t);
  }

  public calculateCompoundInterestWithTax(
    p: number, r: number, d: number, m: number, t: number, c: number,
  ): InterestResult {
    return computeCompound(p, r, d, m, t, c);
  }
}
