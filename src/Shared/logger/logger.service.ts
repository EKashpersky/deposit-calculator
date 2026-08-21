import { Injectable } from '@angular/core';
import { LumberjackService } from '@ngworker/lumberjack';



@Injectable()
export class LoggerService {
  public constructor(private _lumberjack: LumberjackService) {}

  public a(
    condition: boolean,
    message: string,
    scope?: string,
    payload?: any,
  ): asserts condition {
    if (condition === false) {
      this._lumberjack.logCritical(message, payload, scope);
    }
  }

  public t(message: string, scope?: string, payload?: any) {
    this._lumberjack.logTrace(message, payload, scope);
  }

  public d(message: string, scope?: string, payload?: any) {
    this._lumberjack.logDebug(message, payload, scope);
  }

  public i(message: string, scope?: string, payload?: any) {
    this._lumberjack.logInfo(message, payload, scope);
  }

  public e(message: string, scope?: string, payload?: any) {
    this._lumberjack.logError(message, payload, scope);
  }

  public f(message: string, scope?: string, payload?: any) {
    this._lumberjack.logCritical(message, payload, scope);
  }

  public w(message: string, scope?: string, payload?: any) {
    this._lumberjack.logWarning(message, payload, scope);
  }
}