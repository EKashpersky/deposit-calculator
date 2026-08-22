import { Injectable, signal } from '@angular/core';

import { DepositModel } from '@features/calculator/model';
import { StorageService } from '@shared/Storage';

import {
  AddDepositCommand,
  RemoveDepositCommand,
  RenameDepositCommand,
  UpdateDepositCommand
} from './commands';
import { DepositCommandContext } from './deposit-command.context';
import { DepositStorage } from './deposit-storage.model';



@Injectable()
export class DepositsManagerService {
  private _deposits = signal<DepositModel[]>([]);
  public deposits = this._deposits.asReadonly();

  private _depositStorage: DepositStorage;

  private _context: DepositCommandContext;



  public constructor(private _storage: StorageService) {
    this._depositStorage = DepositStorage.New(
      this._storage.createInstance('deposits')
    );

    this._depositStorage.getItems().then(value => this._deposits.set(value));

    this._context = new DepositCommandContext(
      this._depositStorage,
      this._deposits
    );
  }

  public fromName(name: string) {
    return this._depositStorage!.getItem(name);
  }

  public addDepositsBulk(deposits: DepositModel[]) {
    this._depositStorage.setItems(deposits, deposit => deposit.name());
    this._deposits.update(prev => (prev.push(...deposits), prev));
  }

  public findDeposit(name: string) {
    return this._deposits().find(d => d.name() === name) || null;
  }

  /*============================================================================
   * Undoable actions
   *============================================================================
  */
  public addDeposit(newDeposit: DepositModel) {
    return new AddDepositCommand(this._context, newDeposit);
  }

  public updateDeposit(newDeposit: DepositModel) {
    const oldDeposit = this.findDeposit(newDeposit.name())!;

    return new UpdateDepositCommand(this._context, oldDeposit, newDeposit);
  }

  public removeDeposit(depositToRemove: DepositModel) {
    return new RemoveDepositCommand(this._context, depositToRemove);
  }

  public renameDeposit(oldName: string, newName: string) {
    return new RenameDepositCommand(this._context, oldName, newName);
  }
}