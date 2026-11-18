import { Injectable } from '@angular/core';

import { APP_DB_NAME } from '@config/storage';

import { KeyValueStore } from './key-value-store.model';
import { LocalStorageStore } from './local-storage.store';



@Injectable()
export class StorageService {
  public constructor() {}

  public createInstance(storeName: string): KeyValueStore {
    return new LocalStorageStore(APP_DB_NAME, storeName);
  }
}
