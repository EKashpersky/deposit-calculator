import { RateInflationYear } from 'dc-api-types';

import { round } from '@utils/round';

import {
  effectiveMonthlyRate,
  futureAnnuityToTerm,
  futurePrincipal,
  futureValueGross,
  inflateToPresent,
  simulateCapitalized
} from './calculator.ops';
import { AccrualFrequency, TaxTiming } from './common.enum';
import { DepositInput } from './deposit-input.model';
import { DepositResult } from './deposit-result.model';
import { Duration } from './duration.model';




// Input validation
export function validateDepositInput(
  principal: number,
  annualRate: number,
  monthlyDeposit: number,
  durationInMonths: number,
): void {
  if (principal < 0) {
    throw new Error(`Principal can't be negative`);
  } else if (annualRate < 0 || annualRate > 100) {
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

  accrualFrequency: AccrualFrequency,
  capitalize: boolean,

  taxRate: number,
  taxTiming: TaxTiming,

  depositingMonthBegin: number,
  depositingMonthEnd: number,
  depositAtMonthBeginning: boolean,
) {
  const durationInMonths = duration.durationInMonths();
  validateDepositInput(principal, annualRate, monthlyDeposit, durationInMonths);

  return new DepositInput(
    round(principal),
    round(annualRate / 100),
    duration,
    round(monthlyDeposit),

    accrualFrequency,
    capitalize,

    round(taxRate / 100),
    taxTiming,

    depositingMonthBegin,
    depositingMonthEnd,
    depositAtMonthBeginning
  );
}

export function computeInterest(input: DepositInput) {
  const termMonths = input.duration.durationInMonths();
  const { deposited, interest, fvGross } = futureValueGross(input);

  if (input.taxTiming === TaxTiming.None || input.taxRate === 0) {
    return DepositResult.build(
      round(deposited, 2),
      round(interest, 2),
      0,
      round(fvGross, 2),
      0
    );
  }

  if (input.taxTiming === TaxTiming.AtMaturity || !input.capitalize) {
    const taxed = interest * input.taxRate;
    return DepositResult.build(
      round(deposited, 2),
      round(interest, 2),
      round(taxed, 2),
      round(fvGross - taxed, 2),
      0
    );
  }

  const rate = effectiveMonthlyRate(input.annualRate, input.accrualFrequency);
  const netRate = rate * (1 - input.taxRate);
  const net =
    futurePrincipal(input.principal, netRate, termMonths) +
    futureAnnuityToTerm(
      input.monthlyDeposit,
      netRate,
      input.depositingMonthBegin,
      input.depositingMonthEnd,
      termMonths,
      input.depositAtMonthStart,
    );
  const { withheld } = simulateCapitalized(input, rate, true);

  const interestOnAccount = net - input.principal - deposited + withheld;
  return DepositResult.build(
    round(deposited, 2),
    round(interestOnAccount, 2),
    round(withheld, 2),
    round(net, 2),
    0
  );
}

/** 108 → 0.08, 103.3 → 0.033, 100 → 0. Index base is 100. */
export function inflationIndexToRate(index: number): number {
  return index / 100 - 1;
}

/**
 * startMonth is 1..12. Rates are calendar years, not "year 1 of the deposit".
 * value is an index with base 100 (108 is 8%). A year the deposit touches
 * and has no rate is a hole, not 0%.
 */
export function inflateToPresentByYears(
  nominal: number,
  startYear: number,
  startMonth: number,
  termMonths: number,
  rates: readonly RateInflationYear[],
): number {
  if (termMonths === 0 || rates.length === 0) {
    return nominal;
  }

  const rateOf = new Map(rates.map(entry => [entry.year, entry.value]));
  let factor = 1;
  let year = startYear;
  let month = startMonth;
  let left = termMonths;

  while (left > 0) {
    const monthsLeftInYear = 12 - month + 1;
    const chunk = Math.min(left, monthsLeftInYear);
    const rate = rateOf.get(year);

    if (rate === undefined) {
      throw new Error(`No inflation for ${year}`);
    }

    factor *= Math.pow(1 + inflationIndexToRate(rate), chunk / 12);
    left -= chunk;
    year += 1;
    month = 1;
  }

  return nominal / factor;
}

export function calculateDeposit(
  depositInput: DepositInput,
  inflationRate: number,
  inflationYears: readonly RateInflationYear[],
  startedAt: { year: number; month: number },
): DepositResult {
  const nominal = computeInterest(depositInput);
  const termMonths = depositInput.duration.durationInMonths();

  const realNet = inflationYears.length > 0
    ? inflateToPresentByYears(
        nominal.net,
        startedAt.year,
        startedAt.month,
        termMonths,
        inflationYears,
      )
    : inflateToPresent(nominal.net, inflationRate, termMonths);

  return DepositResult.build(
    round(nominal.deposited, 2),
    round(nominal.interest, 2),
    round(nominal.taxed, 2),
    round(nominal.net, 2),
    round(realNet, 2),
  );
}