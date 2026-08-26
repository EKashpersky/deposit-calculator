import { LocalSpaceInstance } from 'localspace';

import { DomainStorage } from '@shared/Storage';

import { PreferencesModel } from './preferences.model';
import { PreferencesPOJO } from './preferences-pojo.model';
import { PreferencesSerializer } from './preferences-serializer.model';



export class PreferencesStorage extends DomainStorage<PreferencesModel, PreferencesPOJO> {
  public static New(storage: LocalSpaceInstance) {
    return new DomainStorage(storage, new PreferencesSerializer());
  }
}