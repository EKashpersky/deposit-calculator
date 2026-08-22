import { LocalSpaceInstance } from 'localspace';

import { DepositModel } from '@features/calculator/model';
import { DomainStorage } from '@shared/Storage';

import { DepositPOJO } from './storage.models';
import { DepositSerializer } from './serialization.model';



export class DepositStorage extends DomainStorage<DepositModel, DepositPOJO> {
  public static New(storage: LocalSpaceInstance) {
    return new DepositStorage(storage, new DepositSerializer());
  }
}