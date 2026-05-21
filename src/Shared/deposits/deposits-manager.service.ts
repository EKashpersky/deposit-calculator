import { Injectable, signal } from '@angular/core';

import { DepositModel } from '@features/calculator/model';

import {
  AddDepositCommand,
  RemoveDepositCommand,
  RenameDepositCommand
} from './commands';
import { DepositCommandContext } from './deposit-command.context';
import { DepositsStorageService } from './deposits-storage.service';



@Injectable()
export class DepositsManagerService {
  private _deposits = signal<DepositModel[]>([]);
  public deposits = this._deposits.asReadonly();

  private _context: DepositCommandContext;



  public constructor(private _depositStorage: DepositsStorageService) {
    /// Use user browser locale for sorting deposits
    this._context = new DepositCommandContext(
      this._depositStorage,
      this._deposits,
    );
  }

  public fromName(name: string) {
    return this._depositStorage.getItem(name);
  }

  public addDepositsBulk(deposits: DepositModel[]) {
    this._depositStorage.setItems(deposits);
    this._deposits.update(prev => (prev.push(...deposits), prev));
  }

  /*============================================================================
   * Undoable actions
   *============================================================================
  */
  public addDeposit(newDeposit: DepositModel) {
    return new AddDepositCommand(this._context, newDeposit);
  }

  public removeDeposit(depositToRemove: DepositModel) {
    return new RemoveDepositCommand(this._context, depositToRemove);
  }

  public renameDeposit(oldName: string, newName: string) {
    return new RenameDepositCommand(this._context, oldName, newName);
  }
}