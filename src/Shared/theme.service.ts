import {
  computed,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { LoggerService } from './logger';



export enum ThemeEnum {
  Dark  = 'dark',
  Light = 'light',
  System  = 'system',
}

@Injectable()
export class ThemeService {
  private _systemThemeMediaQuery: MediaQueryList;

  /// Can be dark, light and system. It is the element the user can change
  private _userTheme: WritableSignal<ThemeEnum>;
  /// Can be dark or light. Initial value .System is to be immediately replaced
  /// with detected value
  private _systemTheme: WritableSignal<ThemeEnum>;
  /// Can be dark or light
  private _appTheme: Signal<ThemeEnum>;



  public constructor(private _logger: LoggerService) {
    this._systemThemeMediaQuery = inject(MediaMatcher).matchMedia(
      '(prefers-color-scheme: light)'
    );

    const systemTheme = this._systemThemeMediaQuery.matches
      ? ThemeEnum.Light
      : ThemeEnum.Dark

    this._userTheme   = signal<ThemeEnum>(ThemeEnum.System);
    this._systemTheme = signal<ThemeEnum>(systemTheme);

    this._appTheme = computed(
      () => this._userTheme() === ThemeEnum.System
        ? this._systemTheme()
        : this._userTheme()
    );



    this._systemThemeMediaQuery.addEventListener('change', event => {
      /// Keep track of system theme
      this._systemTheme.set(event.matches ? ThemeEnum.Light : ThemeEnum.Dark);
    });
  }

  public cycleUserTheme() {
    let nextUserTheme = this._userTheme();
    switch (nextUserTheme) {
      case ThemeEnum.System:  nextUserTheme = ThemeEnum.Dark; break;
      case ThemeEnum.Dark:    nextUserTheme = ThemeEnum.Light; break;
      case ThemeEnum.Light:   nextUserTheme = ThemeEnum.System; break;
    }

    this.setUserTheme(nextUserTheme);
  }

  /**
   * Actual theme switching 2-step process
  **/
  public setUserTheme(theme: ThemeEnum) {
    this._userTheme.set(theme);
  }

  public canDetectTheme() {
    const canDetectTheme = typeof window.matchMedia !== 'undefined';

    if (!canDetectTheme) {
      this._logger.e(`Unable to detect preferred theme`, 'ThemeService');
    }

    return canDetectTheme;
  }

  public appTheme() {
    return this._appTheme();
  }

  public userTheme() {
    return this._userTheme();
  }
}