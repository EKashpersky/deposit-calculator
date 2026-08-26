import { PreferencesPOJO } from './preferences-pojo.model';



export const PREFS_TEMPLATE = {
  currency: null,
  language: null,
  theme: null,
} as PreferencesPOJO;

export class PreferencesModel {
  private _preferences: PreferencesPOJO;

  public static Partial(prefs: Partial<PreferencesPOJO>) {
    return {
      ...PREFS_TEMPLATE,
      ...prefs,
    }
  }

  public constructor(prefs: Partial<PreferencesPOJO>) {
    this._preferences = PreferencesModel.Partial(prefs);
  }

  public patch(newPrefs: Partial<PreferencesPOJO>) {
    this._preferences = { ...this._preferences, ...newPrefs };
  }

  public get() {
    return this._preferences;
  }
}