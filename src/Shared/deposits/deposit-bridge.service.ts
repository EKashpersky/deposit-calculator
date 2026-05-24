import { Injectable, signal } from '@angular/core';

import { DepositModel } from '@features/calculator/model';
import { BehaviorSubject, Observable } from 'rxjs';



/**
 * The service should serve as a bridge between root component domain logic
 * and components that emit data, but due to they are routes it's impossible
 * for them to emit values in templates.
**/
@Injectable()
export class DepositBridgeService {
  private _deposit$: BehaviorSubject<DepositModel | null>;
  public deposit: Observable<DepositModel | null>;

  public constructor() {
    this._deposit$ = new BehaviorSubject<DepositModel | null>(null);
    this.deposit   = this._deposit$.asObservable();
  }



  public getDepositToUpdate(): DepositModel | null {
    const deposit = this._deposit$.value;
    this._deposit$.next(null);
    return deposit;
  }

  public updateDeposit(deposit: DepositModel) {
    this._deposit$.next(deposit);
  }
}
