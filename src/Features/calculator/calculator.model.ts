import { DepositInput } from './deposit-input.model';
import { computeCompound, computeSimpleInterest } from './duration-scale.model';



export function calculateDeposit(depositInput: DepositInput) {
  if (depositInput.compoundRate === 0) {
    return computeSimpleInterest(
      depositInput.principal,
      depositInput.annualRate,
      depositInput.duration.durationInYears(),
      depositInput.duration.durationInMonths(),
      depositInput.monthlyDeposit,
      depositInput.tax,
      depositInput.noFirstMonthDeposit,
    );
  }

  return computeCompound(
    depositInput.principal,
    depositInput.annualRate,
    depositInput.duration.durationInMonths(),
    depositInput.monthlyDeposit,
    depositInput.tax,
    depositInput.compoundRate,
    depositInput.noFirstMonthDeposit,
  );
}