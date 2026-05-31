import { round } from '@utils/round';

import { DepositInput } from './deposit-input.model';
import { DepositResult } from './deposit-result.model';



export class DepositModel {
  public static Empty(): DepositModel {
    return new DepositModel('', DepositInput.Empty(), DepositResult.Empty());
  }



  private _name: string;
  private _input: DepositInput;
  private _result: DepositResult;



  public constructor(name: string, input: DepositInput, result: DepositResult) {
    this._name = name;
    this._input = input;
    this._result = result;
  }

  public setName(name: string) {
    this._name = name;
  }

  public input() {
    return this._input;
  }

  public result() {
    return this._result;
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

  public tax(): number {
    return this._input.tax;
  }

  public timesDeposited(): number {
    return this._input.duration.durationInMonths() - +this._input.isNoFirstMonthDeposit();
  }



  public deposited(): number {
    return this._result.deposited;
  }

  public interest(): number {
    return round(this._result.interest);
  }

  public taxed(): number {
    return round(this._result.taxed);
  }

  public net() {
    return round(this._result.net);
  }
}