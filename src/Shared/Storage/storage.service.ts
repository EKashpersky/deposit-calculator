import { Injectable } from '@angular/core';
import localspace from 'localspace';

import { APP_DB_NAME, APP_DB_VERSION } from '@config/storage';



@Injectable()
export class StorageService {
  public constructor() {}

  public createInstance(storeName: string) {
    const tmp = localspace.createInstance({
      name: APP_DB_NAME,
      storeName,
      version: APP_DB_VERSION,
      driver: localspace.LOCALSTORAGE
    });

    console.debug('storage#createInstance', tmp)

    return tmp;
  }
}