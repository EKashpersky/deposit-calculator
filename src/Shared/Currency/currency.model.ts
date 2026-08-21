import {
  CurrencyCodeEnum,
  CurrencySymbolEnum,
} from '@config/supported-currencies';



export interface CurrencyShape {
  code: CurrencyCodeEnum;
  symbol: CurrencySymbolEnum;
}


export function currencyShapeFromCode(currencyCode: CurrencyCodeEnum) {
  return {
    currencyCode,
    currencySymbol: CurrencySymbolEnum[currencyCode],
  };
}