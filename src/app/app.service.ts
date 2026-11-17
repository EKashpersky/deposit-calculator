import { Injectable, signal } from '@angular/core';



@Injectable()
export class AppService {
  private _appLoaded = signal(false);
  public readonly appLoaded = this._appLoaded.asReadonly();

  public constructor() {}

  public markAsLoaded() {
    if (this._appLoaded() === false) {
      this._appLoaded.set(true);
    }
  }
}
