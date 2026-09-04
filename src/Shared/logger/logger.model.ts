export interface LoggerShape {
  a(condition: boolean, message: string, payload?: any): void;
  t(message: string, payload?: any): void;
  d(message: string, payload?: any): void;
  i(message: string, payload?: any): void;
  e(message: string, payload?: any): void;
  f(message: string, payload?: any): void;
  w(message: string, payload?: any): void;
}