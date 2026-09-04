export enum TaxTiming {
  None = 0,
  AtMaturity = 1,
  PerPayout = 2,
}

export enum AccrualFrequency {
  ANNUALLY = 1,
  HALF_YEARLY = 2,
  QUARTERLY = 4,
  MONTHLY = 12,
  DAILY = 365.25,
}