export class InterestResult {
  public readonly gross: number;
  public readonly interest: number;
  public readonly deposited: number;

  public constructor(gross: number, interest: number, deposited: number) {
    this.gross = gross;
    this.interest = interest;
    this.deposited = deposited;
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


function buildResult(gross: number, deposited: number): InterestResult {
  return new InterestResult(
    Number(gross.toFixed(2)),
    Number((gross - deposited).toFixed(2)),
    Number(deposited.toFixed(2)),
  );
}

/**
 * No capitalization — interest is paid out, not added to principal.
 * Each monthly deposit earns simple interest for remaining months.
**/
function computeSimple(
  p: number,
  r: number,
  d: number,
  m: number,
  tax: number
): InterestResult {
  const rMonthly = r / 12 * (1 - tax);

  const fvPrincipal     = p * (1 + rMonthly * d);
  const fvContributions = m * d + m * rMonthly * d * (d - 1) / 2;

  return buildResult(fvPrincipal + fvContributions, p + m * d);
}

/**
 * Compound interest with tax deducted each compounding period.
 * Converts nominal rate with compounding frequency `c` to effective monthly rate,
 * then applies standard compound + annuity formulas.
**/
function computeCompound(
  p: number,
  r: number,
  d: number,
  m: number,
  t: number,
  c: number,
): InterestResult {
  const rPerPeriod    = r / c;
  const periodsPerMonth = c / 12;
  const rNet = (1 + rPerPeriod * (1 - t)) ** periodsPerMonth - 1;

  const power = (1 + rNet) ** d;

  const fvPrincipal     = p * power;
  const fvContributions = rNet > 0
    ? m * (power - 1) / rNet
    : m * d;

  return buildResult(fvPrincipal + fvContributions, p + m * d);
}



export class DurationInYears implements DurationScaleShape {
  public readonly name = 'years';

  public calculateSimpleInterestWithTax(
    p: number, r: number, d: number, m: number, t: number,
  ): InterestResult {
    return computeSimple(p, r, d * 12, m, t);
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
    return computeSimple(p, r, d, m, t);
  }

  public calculateCompoundInterestWithTax(
    p: number, r: number, d: number, m: number, t: number, c: number,
  ): InterestResult {
    return computeCompound(p, r, d, m, t, c);
  }
}
