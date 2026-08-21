export interface LoggerShape {
  a(condition: boolean, message: string, scope?: string, payload?: any): void;
  t(message: string, scope?: string, payload?: any): void;
  d(message: string, scope?: string, payload?: any): void;
  i(message: string, scope?: string, payload?: any): void;
  e(message: string, scope?: string, payload?: any): void;
  f(message: string, scope?: string, payload?: any): void;
  w(message: string, scope?: string, payload?: any): void;
}