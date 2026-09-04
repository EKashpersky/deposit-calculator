import { round } from '@utils/round';

import {
  AccrualFrequency,
  DepositInput,
  DepositResult,
  Duration,
  TaxTiming,
} from '.';
import {
  depositMonths,
  effectiveMonthlyRate,
  futureAnnuityToTerm,
  futurePrincipal,
  futureValueGross,
  simulateCapitalized
} from '.';



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

  accrualFrequency: AccrualFrequency,
  capitalize: boolean,

  taxRate: number,
  taxTiming: TaxTiming,

  noStartDeposits: number,
  noEndDeposits: number,
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

    noStartDeposits,
    noEndDeposits,
  );
}

export function computeInterest(input: DepositInput) {
  const termMonths = input.duration.durationInMonths();

  const { deposited, interest, fvGross } = futureValueGross(input);

  if (input.taxTiming === TaxTiming.None || input.taxRate === 0) {
    /// Simple interest no tax
    return DepositResult.build(deposited, interest, 0, fvGross);
  } else if (input.taxTiming === TaxTiming.AtMaturity || !input.capitalize) {
    /// Simple interest with tax
    const taxed = interest * input.taxRate;
    return DepositResult.build(deposited, interest, taxed, fvGross - taxed);
  }

  // Compound interest + tax/no tax
  const rate      = effectiveMonthlyRate(input.annualRate, input.accrualFrequency);
  const netRate   = rate * (1 - input.taxRate);
  const payments  = depositMonths(termMonths, input.noStartDeposits, input.noEndDeposits);
  const net       =
    futurePrincipal(input.principal, netRate, termMonths) +
    futureAnnuityToTerm(input.monthlyDeposit, netRate, payments, input.noEndDeposits);

  const { withheld } = simulateCapitalized(input, rate, true);

  return DepositResult.build(deposited, interest, withheld, net);
}

export function calculateDeposit(depositInput: DepositInput): DepositResult {
  return computeInterest(depositInput)
}