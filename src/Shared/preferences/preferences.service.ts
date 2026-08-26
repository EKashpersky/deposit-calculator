import { inject, Injectable } from '@angular/core';

import { StorageService } from '@shared/Storage';

import { PreferencesStorage } from './preferences-storage.model';
import { PreferencesModel } from './preferences.model';



@Injectable()
export class PreferencesService extends PreferencesModel {
  private _storage: PreferencesStorage;

  public constructor() {
    super({});

    this._storage = PreferencesStorage.New(
      inject(StorageService).createInstance('preferences')
    );
  }

  public save() {
    this._storage.setItem('preferences', this);
  }

  public load() {
    return this._storage.getItems();
  }
}