import { effect, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AppService } from '../../app/app.service';



@Injectable()
export class CalculatorGuard implements CanActivate {
  private _promise: Promise<boolean>;
  public constructor(private _appService: AppService) {
    this._promise = new Promise(resolve => {
      effect(() => {
        if (this._appService.appLoaded()) {
          resolve(true)
        }
      })
    });
  }

  public canActivate() {
    return this._promise;
  }
}