import { WritableSignal } from '@angular/core';

import { DepositModel } from '@features/calculator/model';

import { DepositsStorageService } from './deposits-storage.service';



export class DepositCommandContext {
  public readonly storage: DepositsStorageService;
  public readonly deposits: WritableSignal<DepositModel[]>;

  public constructor(
    storage: DepositsStorageService,
    deposits: WritableSignal<DepositModel[]>,
  ) {
    this.storage = storage;
    this.deposits = deposits;
  }
}