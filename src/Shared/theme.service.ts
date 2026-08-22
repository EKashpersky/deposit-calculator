import { Injectable, signal } from '@angular/core';

import { LoggerService } from './logger';



export enum Theme {
  Light = 'light',
  Dark  = 'dark',
}

@Injectable()
export class ThemeService {
  private _lastTheme: Theme;

  private _theme        = signal<Theme>(Theme.Dark);
  public readonly theme = this._theme.asReadonly();



  public constructor(private _logger: LoggerService) {
    this._lastTheme = this._theme();
  }

  public toggleTheme() {
    this._lastTheme = this.theme();

    this._theme.set(this.theme() === Theme.Light ? Theme.Dark : Theme.Light);
  }

  public lastTheme() {
    return this._lastTheme;
  }

  public detectPreferredTheme() {
    if (typeof window.matchMedia !== 'undefined') {
      this._initMatchMedia();
    } else {
      this._logger.e(`Unable to detect preferred theme`, 'ThemeService');
    }
  }

  private _initMatchMedia() {
    const darkTheme  = matchMedia('(prefers-color-scheme: dark)').matches;
    const lightTheme = matchMedia('(prefers-color-scheme: light)').matches;

    if (darkTheme) {
      this._theme.set(Theme.Dark)
    } else if (lightTheme) {
      this._theme.set(Theme.Light);
    } else {
      this._theme.set(Theme.Light);
      this._logger.w(`Unknown preferred color scheme`, 'ThemeService');
    }
  }
}