import { LoggerShape } from './logger.model';



export class ScopedLogger {
  public constructor(private _scope: string, private _logger: LoggerShape) {}

  public a(condition: boolean, message: string, param?: any) {
    this._logger.a(condition, message, this._scope);
  }

  public t(message: string, ...params: any): void {
    this._logger.t(message, this._scope, ...params);
  }

  public d(message: string, ...params: any): void {
    this._logger.d(message, this._scope, ...params);
  }

  public i(message: string, ...params: any): void {
    this._logger.i(message, this._scope, ...params);
  }

  public e(message: string, ...params: any): void {
    this._logger.e(message, this._scope, ...params);
  }

  public f(message: string, ...params: any): void {
    this._logger.f(message, this._scope, ...params);
  }

  public w(message: string, ...params: any): void {
    this._logger.w(message, this._scope, ...params);
  }
}
