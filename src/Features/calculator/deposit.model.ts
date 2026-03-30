import { DepositInput } from './deposit-input.model';
import { DepositResult } from './deposit-result.model';



export class DepositModel {

  private _name: string;
  private _input: DepositInput;
  private _result: DepositResult;



  public constructor(name: string, input: DepositInput, result: DepositResult) {
    this._name = name;
    this._input = input;
    this._result = result;
  }

  public name(): string {
    return this._name;
  }

  public principal(): number {
    return this._input.principal;
  }

  public annualRate(): number {
    return this._input.annualRate;
  }

  public durationValue(): number {
    return this._input.duration.duration();
  }

  public durationScale(): 'years' | 'months' {
    return this._input.duration.scale();
  }

  public monthlyDeposit(): number {
    return this._input.monthlyDeposit;
  }

  

}