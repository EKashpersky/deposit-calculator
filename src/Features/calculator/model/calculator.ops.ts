import { DepositInput } from './deposit-input.model';



/**
 * Returns amount of months when user will put money on deposit
**/
export function depositMonths(begin: number, end: number): number {
  return end - begin + 1;
}

export function isDepositMonth(month: number, begin: number, end: number): boolean {
  return month >= begin && month <= end;
}

export function remainingMonthsAfterDeposit(
  month: number,
  termMonths: number,
  depositAtMonthStart: boolean,
): number {
  return termMonths - month + +depositAtMonthStart;
}

export function effectiveMonthlyRate(
  annualRate: number,
  accrualFrequency: number,
): number {
  return Math.pow(1 + annualRate / accrualFrequency, accrualFrequency / 12) - 1;
}

export function futurePrincipal(
  principal: number,
  monthlyRate: number,
  months: number,
): number {
  return principal * Math.pow(1 + monthlyRate, months);
}

/**
 * Future annuity for simple and compound interests
**/
export function futureAnnuity(
  payment: number,
  monthlyRate: number,
  payments: number,
): number {
  if (monthlyRate === 0) {
    return payment * payments;
  }

  return payment * (Math.pow(1 + monthlyRate, payments) - 1) / monthlyRate;
}

export function futureAnnuityToTerm(
  payment: number,
  monthlyRate: number,
  begin: number,
  end: number,
  termMonths: number,
  depositAtMonthStart: boolean,
): number {
  const payments = depositMonths(begin, end);
  const tail = remainingMonthsAfterDeposit(end, termMonths, depositAtMonthStart);

  return futurePrincipal(
    futureAnnuity(payment, monthlyRate, payments),
    monthlyRate,
    tail,
  );
}


export function simplePrincipalInterest(
  principal: number,
  annualRate: number,
  termMonths: number,
): number {
  return principal * annualRate * (termMonths / 12);
}

/**
 * Each deposit in k month (end of month) lives (term - k) months.
 * Sum of tails: payment * ((noEndDeposits + term - noStartDeposits - 1) / 2
**/
export function simpleAnnuityInterest(
  payment: number,
  annualRate: number,
  termMonths: number,
  begin: number,
  end: number,
  depositAtMonthStart: boolean,
): number {
  const payments = depositMonths(begin, end);
  if (payments <= 0) {
    return 0;
  }

  const due = +depositAtMonthStart;
  const remainingSum =
    payments * (2 * termMonths - begin - end + 2 * due) / 2;

  return payment * (annualRate / 12) * remainingSum;
}

export function futureValueGross(input: DepositInput): {
  deposited: number;
  interest: number;
  fvGross: number;
} {
  const termMonths = input.duration.durationInMonths();
  const begin = input.depositingMonthBegin;
  const end = input.depositingMonthEnd;
  const due = input.depositAtMonthStart;

  const deposited = input.monthlyDeposit * depositMonths(begin, end);

  let interest: number;

  if (!input.capitalize) {
    interest =
      simplePrincipalInterest(input.principal, input.annualRate, termMonths) +
      simpleAnnuityInterest(
        input.monthlyDeposit,
        input.annualRate,
        termMonths,
        begin,
        end,
        due,
      );
  } else {
    const rate = effectiveMonthlyRate(input.annualRate, input.accrualFrequency);
    const fv =
      futurePrincipal(input.principal, rate, termMonths) +
      futureAnnuityToTerm(
        input.monthlyDeposit,
        rate,
        begin,
        end,
        termMonths,
        due,
      );
    interest = fv - input.principal - deposited;
  }

  return {
    deposited,
    interest,
    fvGross: input.principal + deposited + interest,
  };
}

export function simulateCapitalized(
  input: DepositInput,
  monthlyRate: number,
  taxPerPayout: boolean,
): { net: number; withheld: number } {
  const taxRate = taxPerPayout ? input.taxRate : 0;
  let balance = input.principal;
  let withheld = 0;
  const termMonths = input.duration.durationInMonths();
  const begin = input.depositingMonthBegin;
  const end = input.depositingMonthEnd;

  for (let month = 1; month <= termMonths; month++) {
    if (input.depositAtMonthStart && isDepositMonth(month, begin, end)) {
      balance += input.monthlyDeposit;
    }

    const interest = balance * monthlyRate;
    const tax = interest * taxRate;
    withheld += tax;
    balance += interest - tax;

    if (!input.depositAtMonthStart && isDepositMonth(month, begin, end)) {
      balance += input.monthlyDeposit;
    }
  }

  return { net: balance, withheld };
}