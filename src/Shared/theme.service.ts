import { Injectable, signal } from '@angular/core';



export enum Theme {
  Light = 'light',
  Dark  = 'dark',
}

@Injectable()
export class ThemeService {
  public readonly theme = signal<Theme>(Theme.Dark);

  private _lastTheme: Theme;


  public constructor() {
    this._lastTheme = this.theme();
  }

  public toggleTheme() {
    this._lastTheme = this.theme();

    this.theme.set(this.theme() === Theme.Light ? Theme.Dark : Theme.Light);
  }

  public lastTheme() {
    return this._lastTheme;
  }
}
