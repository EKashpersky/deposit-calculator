import { round } from '@utils/round';
import { CurrencyShape, getDefaultCurrency } from '@shared/Currency';


import { DepositResult } from './deposit-result.model';
import { DepositInput } from './deposit-input.model';



export class DepositModel {
  public static Empty(): DepositModel {
    return new DepositModel(
      '',
      getDefaultCurrency(),
      false,
      DepositInput.Empty(),
      DepositResult.Empty()
    );
  }



  private _name: string;
  private _currency: CurrencyShape;
  private _autoConversion: boolean;
  private _input: DepositInput;
  private _result: DepositResult;



  public constructor(
    name: string,
    currency: CurrencyShape,
    autoConversion: boolean,
    input: DepositInput,
    result: DepositResult
  ) {
    this._name           = name;
    this._currency       = currency;
    this._autoConversion = autoConversion;

    this._input  = input;
    this._result = result;
  }

  /**
   * Method aimed upon updating deposit input, when the currency
   * conversion happens.
   * So we need to update all deposit input values that are currency-dependent.
  **/
  public setInput(principal: number, monthlyDeposit: number) {
    this._input = this._input.withCurrencyUpdate(principal, monthlyDeposit);

    return this;
  }

  public setCurrency(currency: CurrencyShape) {
    this._currency = currency
    return this;
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

  public currency() {
    return this._currency;
  }

  public setAutoconversion(autoConversion: boolean) {
    this._autoConversion = autoConversion;
    return this;
  }

  public autoConversion() {
    return this._autoConversion;
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
    return this._input.taxRate;
  }

  public timesDeposited(): number {
    return (this._input.duration.durationInMonths()
     - this._input.noEndDeposits
     - this._input.noStartDeposits
    );
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