import { round } from '@utils/round';

import {
  AccrualFrequency,
  DepositInput,
  DepositResult,
  Duration,
  effectiveMonthlyRate,
  futureAnnuityToTerm,
  futurePrincipal,
  futureValueGross,
  inflateToPresent,
  simulateCapitalized,
  TaxTiming,
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
    return DepositResult.build(deposited, interest, 0, fvGross, 0);
  }

  if (input.taxTiming === TaxTiming.AtMaturity || !input.capitalize) {
    const taxed = interest * input.taxRate;
    return DepositResult.build(deposited, interest, taxed, fvGross - taxed, 0);
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
  return DepositResult.build(deposited, interestOnAccount, withheld, net, 0);
}

export function calculateDeposit(
  depositInput: DepositInput,
  inflationRate: number,
): DepositResult {
  const nominal = computeInterest(depositInput)
  const realNet  = inflateToPresent(
    nominal.net,
    inflationRate,
    depositInput.duration.durationInMonths()
  );

  return DepositResult.build(
    nominal.deposited,
    nominal.interest,
    nominal.taxed,
    nominal.net,
    realNet
  );
}