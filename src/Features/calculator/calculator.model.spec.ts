import { round } from '@utils/round';
import {
  CompoundRate,
  DepositFlags,
  DepositInput,
  DepositResult,
  Duration,
} from './model';
import { calculateDeposit, validateDepositInput, calculateEffectiveMonthlyRate, createDepositInput, computeCompoundInterestV2 } from './calculator.model';

describe('Calculator new is calculator old', () => {
  const input = createDepositInput(
    10000,
    16,
    new Duration('months', 24),
    100,
    23,
    CompoundRate.MONTHLY,
    true,
    true,
  );

  test('Should be same result', () => {
    const resultOld = calculateDeposit(input);
    const resultNew = computeCompoundInterestV2(
      input.principal,
      input.annualRate,
      input.duration.durationInMonths(),
      input.monthlyDeposit,
      input.tax,
      input.compoundRate,
      input.isNoFirstMonthDeposit(),
      input.isTaxed()
    );

    expect(resultOld.deposited).toBe(resultNew.deposited);
    expect(resultOld.interest).toBe(resultNew.interest);
    expect(resultOld.taxed).toBe(resultNew.taxed);
    expect(resultOld.net).toBe(resultNew.net);
  })
});



// describe('validateDepositInput', () => {
//   it('should throw error for negative principal', () => {
//     expect(() => validateDepositInput(-100, 5, 100, 12, 10, 0)).toThrowError('Principal can\'t be negative');
//   });

//   it('should throw error for annual rate out of range', () => {
//     expect(() => validateDepositInput(100, -1, 100, 12, 10, 0)).toThrowError('Annual rate is out of range');
//     expect(() => validateDepositInput(100, 101, 100, 12, 10, 0)).toThrowError('Annual rate is out of range');
//   });

//   it('should throw error for negative monthly deposit', () => {
//     expect(() => validateDepositInput(100, 5, -50, 12, 10, 0)).toThrowError('Monthly deposit can\'t be negative');
//   });

//   it('should throw error for non-positive duration', () => {
//     expect(() => validateDepositInput(100, 5, 100, 0, 10, 0)).toThrowError('Duration can\'t be negative');
//     expect(() => validateDepositInput(100, 5, 100, -5, 10, 0)).toThrowError('Duration can\'t be negative');
//   });
// });

// describe('calculateEffectiveMonthlyRate', () => {
//   it('should calculate correct rate for annual rate 12% compounded monthly', () => {
//     const rate = calculateEffectiveMonthlyRate(12, 12);
//     expect(round(rate * 100, 2)).toBe(1.00);
//   });

//   it('should calculate correct rate for annual rate 10% compounded quarterly', () => {
//     const rate = calculateEffectiveMonthlyRate(10, 4);
//     expect(round(rate * 100, 2)).toBe(0.83);
//   });
// });

// describe('computeSimpleGrossFV', () => {
//   it('should calculate simple interest correctly', () => {
//     const [principalGross, monthlyGross] = computeSimpleGrossFV(1000, 12, 12, 100, 12);
//     expect(principalGross).toBe(1000 + 1000 * 0.12 * (12/12)); // 1000 + 120 = 1120
//     expect(monthlyGross).toBe(12 * 100 + 100 * 0.12 * (12 * (12 - 1))/2 / 12); // 1200 + 66 = 1266
//   });
// });

// describe('computeCompoundGrossFv', () => {
//   it('should calculate compound interest correctly', () => {
//     const [principalGross, monthlyGross] = computeCompoundGrossFv(1000, 12, 12, 100, 12, 12);
//     const rate = calculateEffectiveMonthlyRate(12, 12);
//     const principalGrossExpected = 1000 * (1 + rate) ** 12;
//     const monthlyGrossExpected = 100 * ((1 + rate) ** 12 - 1) / rate;
//     expect(round(principalGross, 2)).toBe(round(principalGrossExpected, 2));
//     expect(round(monthlyGross, 2)).toBe(round(monthlyGrossExpected, 2));
//   });
// });

// describe('calculateTaxes', () => {
//   it('should calculate taxes correctly', () => {
//     expect(calculateTaxes(100, 10)).toBe(10);
//     expect(calculateTaxes(0, 20)).toBe(0);
//   });
// });

// describe('computeInterest', () => {
//   it('should calculate interest and taxes correctly', () => {
//     const result = computeInterest(1120, 1266, 1000, 12, 100, 10);
//     expect(result.totalDeposited).toBe(12 * 100);
//     expect(result.grossInterest).toBe(1120 + 1266 - 1000 - 1200);
//     expect(result.taxes).toBe((1120 + 1266 - 1000 - 1200) * 10);
//     expect(result.fvNet).toBe(1120 + 1266 - (1120 + 1266 - 1000 - 1200) * 10);
//   });
// });

// describe('calculateSimpleInterest', () => {
//   it('should calculate simple interest for principal', () => {
//     expect(calculateSimpleInterest(1000, 12, 12)).toBe(1000 * 0.12 * 1);
//   });

//   it('should calculate simple interest for monthly deposits', () => {
//     expect(calculateSimpleInterest(100, 12, 12)).toBe(100 * 0.12 * 1);
//   });
// });

// describe('computeCompoundInterest', () => {
//   it('should calculate compound interest correctly', () => {
//     const result = computeCompoundInterest(1000, 12, 12, 100, 10, 12, false, true);
//     expect(result.totalDeposited).toBe(12 * 100);
//     expect(result.grossInterest).toBeGreaterThan(0);
// expect(result.taxed).toBeGreaterThan(0);
// expect(result.net).toBeGreaterThan(0);
//   });
// });

// describe('calculateDeposit', () => {
//   it('should calculate deposit result correctly', () => {
//     const input = DepositInput.New(1000, 12, Duration.New(1, 'year'), 100, 10, 0, DepositFlags.Create(true, false));
//     const result = calculateDeposit(input);
//     expect(result.totalDeposited).toBe(12 * 100);
//     expect(result.grossInterest).toBeGreaterThan(0);
// expect(result.taxed).toBeGreaterThan(0);
// expect(result.net).toBeGreaterThan(0);
//   });
// });