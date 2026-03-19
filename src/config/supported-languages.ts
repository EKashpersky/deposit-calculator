import ukLocaleData from '@angular/common/locales/uk';
import enLocaleData from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';



export interface LanguageShape {
  readonly name: string;   /// Language name in the language itself
  readonly locale: string; /// Path to the language
}

export const SUPPORTED_LANGUAGES = [
  {
    locale: 'uk',
    name: 'Українська',
  },
  // {
  //   locale: 'ru',
  //   name: 'Русский',
  // },
  {
    locale: 'en',
    name: 'English',
  }
] as LanguageShape[];


registerLocaleData(ukLocaleData, 'uk');
registerLocaleData(enLocaleData, 'en');