export class DepositResult {
  private static readonly _EMPTY_RESULT = new DepositResult(0, 0, 0, 0, 0);



  /// Total monthly deposits
  public readonly deposited: number;
  /// Total interest earned
  public readonly interest: number;
  /// Total tax applied
  public readonly taxed: number;
  /// After interest added taxes
  public readonly net: number;
  /// After inflation impact
  public readonly realNet: number;

  public static Empty(): DepositResult {
    return DepositResult._EMPTY_RESULT;
  }

  public static build(
    deposited: number,
    interest: number,
    taxed: number,
    net: number,
    realNet: number
  ): DepositResult {
    return new DepositResult(deposited, interest, taxed, net, realNet);
  }

  private constructor(
    deposited: number,
    interest: number,
    taxed: number,
    net: number,
    realNet: number
  ) {
    this.deposited  = deposited;
    this.interest   = interest;
    this.taxed      = taxed;
    this.net        = net;
    this.realNet    = realNet;
  }
}