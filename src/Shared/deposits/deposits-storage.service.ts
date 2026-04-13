import { Injectable } from '@angular/core';
import localspace, { LocalSpaceInstance } from 'localspace';

import { DepositModel } from '@features/calculator/model';

import { DepositPOJO } from './storage.models';
import { DepositSerializer } from './serialization.model';



@Injectable()
export class DepositsStorageService {
  private _storage: LocalSpaceInstance;

  public constructor() {
    this._storage = localspace;
  }

  /// Init the storage and return promise for when the storage is ready
  public initStorage(name: string, version: number) {
    this._storage = localspace.createInstance({
      name,
      storeName: 'deposits',
      driver: localspace.LOCALSTORAGE,
      version,
    });

    return this._storage.ready();
  }



  public getItem(name: string): Promise<DepositModel | null> {
    return this._storage.getItem<DepositPOJO>(name).then(item => {
      return item ? DepositSerializer.deserialize(name, item) : null;
    });
  }

  public getItems(): Promise<DepositModel[]> {
    return this._storage.keys().then(
      keys => this._storage.getItems<DepositPOJO>(keys)
    ).then(items =>
      items.map(
        item => item && DepositSerializer.deserialize(item.key, item.value!) || null
      )
    );
  }

  public setItem(name: string, deposit: DepositModel) {
    this._storage.setItem(name, DepositSerializer.serialize(deposit));
  }

  public setItems(deposits: DepositModel[]) {
    let deposit: DepositPOJO;

    const mappedDeposits = deposits.map(depositx => {
      deposit = DepositSerializer.serialize(depositx);

      return {
        key: depositx.name(),
        value: deposit,
      };
    });

    this._storage.setItems(mappedDeposits);
  }

  public removeItem(name: string) {
    return this._storage.removeItem(name);
  }
}
