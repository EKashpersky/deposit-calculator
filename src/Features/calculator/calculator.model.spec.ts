import { inflateToPresentByYears } from './model/calculator.model';

describe('inflateToPresentByYears', () => {
  it('discounts a partial first year and the following full year', () => {
    const nominal = 10_000;
    const factor = Math.pow(1.1, 2 / 12) * 1.08;

    const real = inflateToPresentByYears(nominal, 2026, 11, 14, [
      { year: 2026, value: 110 },
      { year: 2027, value: 108 },
    ]);

    expect(real).toBeCloseTo(nominal / factor);
  });

  it('reads an index of 103.3 as 3.3 percent', () => {
    const nominal = 10_000;

    const real = inflateToPresentByYears(nominal, 2026, 1, 12, [
      { year: 2026, value: 103.3 },
    ]);

    expect(real).toBeCloseTo(nominal / 1.033);
  });

  it('throws when a calendar year in the term has no rate', () => {
    expect(() => inflateToPresentByYears(10_000, 2026, 11, 14, [
      { year: 2026, value: 110 },
    ])).toThrow(/No inflation for 2027/);
  });
});
