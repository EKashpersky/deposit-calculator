import { DepositInput } from './deposit-input.model';

export function depositMonths(
  termMonths: number,
  noStartDeposits: number,
  noEndDeposits: number
): number {
  return termMonths - noStartDeposits - noEndDeposits;
}

export function isDepositMonth(
  month: number,
  termMonths: number,
  noStartDeposits: number,
  noEndDeposits: number
): boolean {
  return month > noStartDeposits && month <= termMonths - noEndDeposits;
}

/** i = (1 + r/f)^(f/12) - 1 */
export function effectiveMonthlyRate(
  annualRate: number,
  accrualFrequency: number
): number {
  return Math.pow(1 + annualRate / accrualFrequency, accrualFrequency / 12) - 1;
}

export function futurePrincipal(
  principal: number,
  monthlyRate: number,
  months: number
): number {
  return principal * Math.pow(1 + monthlyRate, months);
}

/**
 * Future annuity for simple and compound interests
**/
export function futureAnnuity(
  payment: number,
  monthlyRate: number,
  payments: number
): number {
  if (monthlyRate === 0) {
    return payment * payments;
  }

  return payment * (Math.pow(1 + monthlyRate, payments) - 1) / monthlyRate;
}

export function futureAnnuityToTerm(
  payment: number,
  monthlyRate: number,
  payments: number,
  noEndDeposits: number,
): number {
  return futurePrincipal(
    futureAnnuity(payment, monthlyRate, payments),
    monthlyRate,
    noEndDeposits
  );
}

export function simplePrincipalInterest(
  principal: number,
  annualRate: number,
  termMonths: number
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
  noStartDeposits: number,
  noEndDeposits: number,
): number {
  const payments = depositMonths(termMonths, noStartDeposits, noEndDeposits);
  if (payments <= 0) {
    return 0;
  }

  const remainingSum = payments * (
    noEndDeposits + termMonths - noStartDeposits - 1
  ) / 2;
  return payment * (annualRate / 12) * remainingSum;
}

export function futureValueGross(input: DepositInput): {
  deposited: number;
  interest: number;
  fvGross: number
} {
  const termMonths = input.duration.durationInMonths();

  const deposited = input.monthlyDeposit * depositMonths(
    termMonths,
    input.noStartDeposits,
    input.noEndDeposits,
  );

  let interest: number;

  if (!input.capitalize) {
    interest =
      simplePrincipalInterest(input.principal, input.annualRate, termMonths) +
      simpleAnnuityInterest(
        input.monthlyDeposit,
        input.annualRate,
        termMonths,
        input.noStartDeposits,
        input.noEndDeposits,
      );
  } else {
    const rate = effectiveMonthlyRate(input.annualRate, input.accrualFrequency);
    const payments = depositMonths(
      termMonths,
      input.noStartDeposits,
      input.noEndDeposits
    );
    const fv =
      futurePrincipal(input.principal, rate, termMonths) +
      futureAnnuityToTerm(input.monthlyDeposit, rate, payments, input.noEndDeposits);
    interest = fv - input.principal - deposited;
  }

  return {
    deposited,
    interest,
    fvGross: input.principal + deposited + interest,
  };
}

/**
 * Місяць: спочатку відсоток (і податок, якщо PerPayout), потім внесок.
 * Тому внесок цього місяця відсотка ще не бачить.
 */
export function simulateCapitalized(
  input: DepositInput,
  monthlyRate: number,
  taxPerPayout: boolean,
): { net: number; withheld: number } {
  const taxRate = taxPerPayout ? input.taxRate : 0;
  let balance = input.principal;
  let withheld = 0;

  const termMonths = input.duration.durationInMonths();

  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * monthlyRate;
    const tax = interest * taxRate;
    withheld += tax;
    balance += interest - tax;

    if (isDepositMonth(month, termMonths, input.noStartDeposits, input.noEndDeposits)) {
      balance += input.monthlyDeposit;
    }
  }

  return { net: balance, withheld };
}