import { Injectable, signal } from '@angular/core';

import { DepositModel } from '@features/calculator/model';

import { DepositsStorageService } from './deposits-storage.service';



@Injectable()
export class DepositsManagerService {
  private _deposits = signal<DepositModel[]>([]);
  public deposits = this._deposits.asReadonly();

  public constructor(private _depositStorage: DepositsStorageService) {}

  public fromName(name: string) {
    return this._depositStorage.getItem(name);
  }

  public getUserDeposits() {
    return this._depositStorage.getItems().then(deposits => {
      if (deposits.length > 0) {
        this._deposits.set(deposits);
      }

      return deposits;
    });
  }

  public removeDeposit(name: string) {
    this._depositStorage.removeItem(name);
    this._deposits.update(prev =>
      prev.filter(deposit => deposit.name() !== name)
    );
  }

  public addDeposit(deposit: DepositModel) {
    this._depositStorage.setItem(deposit);
    this._deposits.update(prev => (prev.push(deposit), prev));
  }

  public addDeposits(deposits: DepositModel[]) {
    this._depositStorage.setItems(deposits);
    this._deposits.update(prev => (prev.push(...deposits), prev));
  }

  public renameDeposit(newName: string, deposit: DepositModel) {
    this.removeDeposit(deposit.name());
    deposit.setName(newName);
    this.addDeposit(deposit);
  }
}