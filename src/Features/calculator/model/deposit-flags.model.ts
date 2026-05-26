export class DepositFlags {
  public static readonly FLAG_TAXED = 1 << 0;
  public static readonly FLAG_NO_FIRST_MONTH_DEPOSIT = 1 << 1;



  public static Create(taxed: boolean, noFirstMonthDeposit: boolean) {
    return 0 | (+taxed << DepositFlags.FLAG_TAXED >> 1)
    | (+noFirstMonthDeposit << DepositFlags.FLAG_NO_FIRST_MONTH_DEPOSIT >> 1);
  }

  public static IsTaxed(flags: number) {
    return Boolean(flags & DepositFlags.FLAG_TAXED);
  }

  public static IsNoFirstMonthDeposit(flags: number) {
    return Boolean(flags & DepositFlags.FLAG_NO_FIRST_MONTH_DEPOSIT);
  }
}