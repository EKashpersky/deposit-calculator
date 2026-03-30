export class DepositResult {
  private static readonly _EMPTY_RESULT = new DepositResult(0, 0, 0, 0);



  public readonly deposited: number;
  public readonly interest: number;
  public readonly taxed: number;
  public readonly net: number;

  public static empty(): DepositResult {
    return DepositResult._EMPTY_RESULT;
  }

  public static build(
    deposited: number,
    interest: number,
    taxed: number,
    net: number,
  ): DepositResult {
    return new DepositResult(deposited, interest, taxed, net);
  }

  private constructor(
    deposited: number,
    interest: number,
    taxed: number,
    fvNet: number,
  ) {
    this.deposited = deposited;
    this.interest = interest;
    this.taxed = taxed;
    this.net = fvNet;
  }
}