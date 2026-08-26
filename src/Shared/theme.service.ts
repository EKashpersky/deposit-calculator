import { Injectable, signal } from '@angular/core';

import { LoggerService } from './logger';



export enum ThemeEnum {
  Light = 'light',
  Dark  = 'dark',
}

@Injectable()
export class ThemeService {
  private _lastTheme: ThemeEnum;

  private _theme = signal<ThemeEnum>(ThemeEnum.Dark);



  public constructor(private _logger: LoggerService) {
    this._lastTheme = this._theme();
  }

  public cycleTheme() {
    this._lastTheme = this._theme();

    this._theme.set(
      this._lastTheme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light
    );
  }

  public lastTheme() {
    return this._lastTheme;
  }

  public canDetectTheme() {
    const canDetectTheme = typeof window.matchMedia !== 'undefined';

    if (!canDetectTheme) {
      this._logger.e(`Unable to detect preferred theme`, 'ThemeService');
    }

    return canDetectTheme;
  }

  public setTheme(theme: ThemeEnum) {
    this._lastTheme = this._theme();

    this._theme.set(theme);
  }

  public theme() {
    return this._theme();
  }

  public detectTheme() {
    const darkTheme  = matchMedia('(prefers-color-scheme: dark)').matches;
    const lightTheme = matchMedia('(prefers-color-scheme: light)').matches;

    if (darkTheme) {
      return ThemeEnum.Dark;
    } else if (lightTheme) {
      return ThemeEnum.Light;
    } else {
      this._logger.w(`Unknown preferred color scheme`, 'ThemeService');
      return ThemeEnum.Light;
    }
  }
}