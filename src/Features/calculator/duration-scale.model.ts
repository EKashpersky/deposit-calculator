export class InterestResult {
  private static readonly EMPTY_INTEREST_RESULT = new InterestResult(0, 0, 0, 0, 0);



  public readonly principal: number;
  public readonly deposited: number;
  public readonly interest: number;
  public readonly taxed: number;
  public readonly net: number;

  public static empty(): InterestResult {
    return InterestResult.EMPTY_INTEREST_RESULT;
  }

  public static build(
    principal: number,
    deposited: number,
    interest: number,
    taxed: number,
    net: number,
  ): InterestResult {
    return new InterestResult(principal, deposited, interest, taxed, net);
  }

  public constructor(
    principal: number,
    deposited: number,
    interest: number,
    taxed: number,
    fvNet: number,
  ) {
    this.principal = principal;
    this.deposited = deposited;
    this.interest = interest;
    this.taxed = taxed;
    this.net = fvNet;
  }
}

/**
 * No capitalization — interest is paid out, not added to principal.
 * Each monthly deposit earns simple interest for remaining months.
**/
export function computeSimpleInterest(
  p: number, /// principal
  r: number, /// annual interest rate
  D: number, /// duration in years
  d: number, /// duration in months
  m: number, /// monthly deposit amount
  t: number, /// tax rate
  n: boolean, /// no first month deposit
): InterestResult {
  /// Amount of months user makes additional deposits
  const mm = n ? d - 1 : d;

  const principalInterest = p * r * D;
  const monthlyInterest   = m * (r / 12) * (mm * (mm - 1)) / 2;

  const interest = principalInterest + monthlyInterest;
  const depositedAmount = mm * m;

  const taxed = interest * t;
  const fvNet = p + depositedAmount + interest - taxed;

  return InterestResult.build(p, depositedAmount, interest, taxed, fvNet);
}

/**
 * Compound interest with tax deducted each compounding period.
 * Converts nominal rate with compounding frequency `c` to effective monthly rate,
 * then applies standard compound + annuity formulas.
**/
export function computeCompound(
  p: number, /// principal
  r: number, /// annual interest rate
  d: number, /// duration in months
  m: number, /// monthly deposit
  t: number, /// tax rate
  c: number, /// compound frequency
  n: boolean, /// no first month deposit
): InterestResult {
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

  return InterestResult.build(p, deposited, interest, taxed, fvNet);
}