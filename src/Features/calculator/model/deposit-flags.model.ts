export class DepositFlags {
  public static readonly FLAG_TAXED = 0;
  public static readonly FLAG_NO_FIRST_MONTH_DEPOSIT = 1;



  public static Create(isTaxed: boolean, noFirstMonthDeposit: boolean) {
    return (+isTaxed << DepositFlags.FLAG_TAXED)
         | (+noFirstMonthDeposit << DepositFlags.FLAG_NO_FIRST_MONTH_DEPOSIT);
  }

  public static IsTaxed(flags: number) {
    return Boolean(flags & (1 << DepositFlags.FLAG_TAXED));
  }

  public static IsNoFirstMonthDeposit(flags: number) {
    return Boolean(flags & (1 << DepositFlags.FLAG_NO_FIRST_MONTH_DEPOSIT));
  }
}