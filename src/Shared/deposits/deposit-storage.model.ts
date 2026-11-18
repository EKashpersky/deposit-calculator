import { DepositModel } from '@features/calculator/model';
import { DomainStorage, KeyValueStore } from '@shared/Storage';

import { DepositPOJO } from './storage.models';
import { DepositSerializer } from './serialization.model';



export interface DepositStorageShape extends DomainStorage<DepositModel, DepositPOJO> {}

export class DepositStorage extends DomainStorage<DepositModel, DepositPOJO> {
  public static New(storage: KeyValueStore) {
    return new DepositStorage(storage, new DepositSerializer());
  }
}