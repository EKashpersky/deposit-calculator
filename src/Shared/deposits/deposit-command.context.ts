import { WritableSignal } from '@angular/core';

import { DepositModel } from '@features/calculator/model';
import { DomainStorage } from '@shared/Storage';

import { DepositPOJO } from './storage.models';
import { DepositStorage } from './deposit-storage.model';



export class DepositCommandContext {
  public readonly storage: DepositStorage;
  public readonly deposits: WritableSignal<DepositModel[]>;

  public constructor(
    storage: DomainStorage<DepositModel, DepositPOJO>,
    deposits: WritableSignal<DepositModel[]>,
  ) {
    this.storage = storage;
    this.deposits = deposits;
  }
}