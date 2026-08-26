import { CurrencyCodeEnum } from '@config/supported-currencies';
import { DomainSerializer } from '@shared/Storage';
import { ThemeEnum } from '@shared/theme.service';

import { PreferencesPOJO } from './preferences-pojo.model';
import { PreferencesModel } from './preferences.model';



export class PreferencesSerializer implements DomainSerializer<PreferencesModel, PreferencesPOJO> {
  public deserialize(name: string, pojo: PreferencesPOJO): PreferencesModel {
    return new PreferencesModel(pojo);
  }

  public serialize(model: PreferencesModel): PreferencesPOJO {
    return model.get();
  }
}