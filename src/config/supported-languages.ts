import ukLocaleData from '@angular/common/locales/uk';
import enLocaleData from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';



export interface LanguageShape {
  readonly name: string;   /// Language name in the language itself
  readonly locale: string; /// Path to the language
}

export const SUPPORTED_LANGUAGES = [
  {
    locale: 'en',
    name: 'English',
  },
  {
    locale: 'uk',
    name: 'Українська',
  },
  // {
  //   locale: 'ru',
  //   name: 'Русский',
  // },
] as LanguageShape[];



export const FALLBACK_LANGUAGES = {
  'de': [ 'en' ],
  'ru': [ 'en' ],
};


registerLocaleData(ukLocaleData, 'uk');
registerLocaleData(enLocaleData, 'en');