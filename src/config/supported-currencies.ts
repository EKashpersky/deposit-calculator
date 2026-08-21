import { RegionEnum } from './region.enum';



/**
 * ISO 4217 currency alpha codes
**/
export enum CurrencyCodeEnum {
  AED = 'AED', /// UAE dirham
  AMD = 'AMD', /// Armenian dram
  AUD = 'AUD', /// Australian dollar
  AZN = 'AZN', /// Azerbaijani manat
  BRL = 'BRL', /// Brazilian real
  CAD = 'CAD', /// Canadian dollar
  CHF = 'CHF', /// Swiss franc
  CNY = 'CNY', /// China's renminbi
  CZK = 'CZK', /// Czech koruna
  DKK = 'DKK', /// Danish krone
  EGP = 'EGP', /// Egyptian pound
  EUR = 'EUR',
  GBP = 'GBP', /// Pound sterling
  GEL = 'GEL', /// Georgian lari
  HKD = 'HKD', /// Hong Kong dollar
  HUF = 'HUF', /// Hungarian forint
  IDR = 'IDR', /// Indonesian rupiah tenge
  ILS = 'ILS', /// Israeli shekel
  INR = 'INR', /// Indian rupee
  ISK = 'ISK', /// Icelandic krona
  JPY = 'JPY', /// Japanese yen
  KRW = 'KRW', /// South Korean won
  KZT = 'KZT', /// Kazakhstani tenge
  MDL = 'MDL', /// Moldovan leu
  MXN = 'MXN', /// Mexican peso
  MYR = 'MYR', /// Malaysian ringgit
  NOK = 'NOK', /// Norwegian krone
  NZD = 'NZD', /// New Zealand dollar
  PLN = 'PLN', /// Polish zloty
  RON = 'RON', /// Romanian leu
  SEK = 'SEK', /// Swedish krona
  TRY = 'TRY', /// Turkish lira
  UAH = 'UAH',
  USD = 'USD',
  ZAR = 'ZAR', /// South African rand
}



export enum CurrencySymbolEnum {
  AED = 'د.إ',       // UAE dirham
  AMD = '֏',        // Armenian dram
  AUD = 'A$',       // Australian dollar
  AZN = '₼',        // Azerbaijani manat
  BRL = 'R$',       // Brazilian real
  CAD = 'C$',       // Canadian dollar
  CHF = 'CHF',      // Swiss franc
  CNY = '¥',        // Chinese yuan
  CZK = 'Kč',       // Czech koruna
  DKK = 'kr',       // Danish krone
  EGP = 'E£',       // Egyptian pound
  EUR = '€',        // Euro
  GBP = '£',        // British pound
  GEL = '₾',        // Georgian lari
  HKD = 'HK$',      // Hong Kong dollar
  HUF = 'Ft',       // Hungarian forint
  IDR = 'Rp',       // Indonesian rupiah
  ILS = '₪',        // Israeli shekel
  INR = '₹',        // Indian rupee
  ISK = 'kr',       // Icelandic krona
  JPY = '¥',        // Japanese yen
  KRW = '₩',        // South Korean won
  KZT = '₸',        // Kazakhstani tenge
  MDL = 'L',        // Moldovan leu
  MXN = 'Mex$',     // Mexican peso
  MYR = 'RM',       // Malaysian ringgit
  NOK = 'kr',       // Norwegian krone
  NZD = 'NZ$',      // New Zealand dollar
  PLN = 'zł',       // Polish zloty
  RON = 'lei',      // Romanian leu
  SEK = 'kr',       // Swedish krona
  TRY = '₺',        // Turkish lira
  UAH = '₴',        // Ukrainian hryvnia
  USD = '$',        // US dollar
  ZAR = 'R',        // South African rand
}



/**
 * A map of supported currencies by the application.
 * If the final currency for that country is not the one defined, it means
 * it's been overridden due to lack of support rate-wise.
**/
export const LOCALE_2_CURRENCY_MAP: Record<string, CurrencyCodeEnum> = {
  [RegionEnum.Ukrainian]:                   CurrencyCodeEnum.UAH,

  /// European euro
  [RegionEnum.Bulgarian]:                   CurrencyCodeEnum.EUR,
  [RegionEnum.Croatian]:                    CurrencyCodeEnum.EUR,
  [RegionEnum.BelgianFrench]:               CurrencyCodeEnum.EUR,
  [RegionEnum.BelgianGerman]:               CurrencyCodeEnum.EUR,
  [RegionEnum.BelgianDutch]:                CurrencyCodeEnum.EUR,
  [RegionEnum.Czech]:                       CurrencyCodeEnum.CZK,
  [RegionEnum.Dutch]:                       CurrencyCodeEnum.EUR,
  [RegionEnum.Estonian]:                    CurrencyCodeEnum.EUR,
  [RegionEnum.Finnish]:                     CurrencyCodeEnum.EUR,
  [RegionEnum.French]:                      CurrencyCodeEnum.EUR,
  [RegionEnum.FrenchFrance]:                CurrencyCodeEnum.EUR,
  [RegionEnum.German]:                      CurrencyCodeEnum.EUR,
  [RegionEnum.Greek]:                       CurrencyCodeEnum.EUR,
  [RegionEnum.Hungarian]:                   CurrencyCodeEnum.HUF,
  [RegionEnum.Italian]:                     CurrencyCodeEnum.EUR,
  [RegionEnum.Latvian]:                     CurrencyCodeEnum.EUR,
  [RegionEnum.Lithuanian]:                  CurrencyCodeEnum.EUR,
  [RegionEnum.Luxembourgish]:               CurrencyCodeEnum.EUR,
  [RegionEnum.MoldovanRomanian]:            CurrencyCodeEnum.MDL,
  [RegionEnum.Polish]:                      CurrencyCodeEnum.PLN,
  [RegionEnum.Portuguese]:                  CurrencyCodeEnum.EUR,
  [RegionEnum.Romanian]:                    CurrencyCodeEnum.RON,
  [RegionEnum.Slovak]:                      CurrencyCodeEnum.EUR,
  [RegionEnum.Slovenian]:                   CurrencyCodeEnum.EUR,
  [RegionEnum.SpanishSpain]:                CurrencyCodeEnum.EUR,
  [RegionEnum.IrishEnglish]:                CurrencyCodeEnum.EUR,

  /// Switzerland & Liechtenstein
  [RegionEnum.SwitzerlandGerman]:           CurrencyCodeEnum.CHF,
  [RegionEnum.SwitzerlandFrench]:           CurrencyCodeEnum.CHF,
  [RegionEnum.SwitzerlandItalian]:          CurrencyCodeEnum.CHF,
  [RegionEnum.LiechtensteinGerman]:         CurrencyCodeEnum.CHF,

  /// Nordic
  [RegionEnum.Danish]:                      CurrencyCodeEnum.DKK,
  [RegionEnum.Norwegian]:                   CurrencyCodeEnum.NOK,
  [RegionEnum.Swedish]:                     CurrencyCodeEnum.SEK,
  [RegionEnum.SwedishSweden]:               CurrencyCodeEnum.SEK,

  /// British
  [RegionEnum.BritishEnglish]:              CurrencyCodeEnum.GBP,

  /// Middle East / Others
  [RegionEnum.Armenian]:                    CurrencyCodeEnum.AMD,
  [RegionEnum.Azerbaijani]:                 CurrencyCodeEnum.AZN,
  [RegionEnum.AzerbaijaniAzerbaijan]:       CurrencyCodeEnum.AZN,
  [RegionEnum.Chinese]:                     CurrencyCodeEnum.CNY,
  [RegionEnum.ChineseChina]:                CurrencyCodeEnum.CNY,
  [RegionEnum.Egypt]:                       CurrencyCodeEnum.EGP,
  [RegionEnum.Georgian]:                    CurrencyCodeEnum.GEL,
  [RegionEnum.GeorgianGeorgia]:             CurrencyCodeEnum.GEL,
  [RegionEnum.HongKongChinese]:             CurrencyCodeEnum.HKD,
  [RegionEnum.HongKongEnglish]:             CurrencyCodeEnum.HKD,
  [RegionEnum.IndianEnglish]:               CurrencyCodeEnum.INR,
  [RegionEnum.IndianHindi]:                 CurrencyCodeEnum.INR,
  [RegionEnum.Indonesian]:                  CurrencyCodeEnum.IDR,
  [RegionEnum.IndonesianIndonesia]:         CurrencyCodeEnum.IDR,
  [RegionEnum.IsraeliHebrew]:               CurrencyCodeEnum.ILS,
  [RegionEnum.Japanese]:                    CurrencyCodeEnum.JPY,
  [RegionEnum.JapaneseJapan]:               CurrencyCodeEnum.JPY,
  [RegionEnum.KazakhKazakhstani]:           CurrencyCodeEnum.KZT,
  [RegionEnum.Kazakhstani]:                 CurrencyCodeEnum.KZT,
  [RegionEnum.KoreanKorea]:                 CurrencyCodeEnum.KRW,
  [RegionEnum.Malaysian]:                   CurrencyCodeEnum.MYR,
  [RegionEnum.MalaysianEnglish]:            CurrencyCodeEnum.MYR,
  [RegionEnum.MalaysianMalaysia]:           CurrencyCodeEnum.MYR,
  [RegionEnum.RussianKazakhstani]:          CurrencyCodeEnum.KZT,
  [RegionEnum.Turkish]:                     CurrencyCodeEnum.TRY,
  [RegionEnum.UnitedArabEmirates]:          CurrencyCodeEnum.AED,
  [RegionEnum.UnitedArabEmiratesEnglish]:   CurrencyCodeEnum.AED,

  /// North America
  [RegionEnum.CanadianEnglish]:             CurrencyCodeEnum.CAD,
  [RegionEnum.MexicanSpanish]:              CurrencyCodeEnum.MXN,
  [RegionEnum.UnitedStatesEnglish]:         CurrencyCodeEnum.USD,
  [RegionEnum.UnitedStatesSpanish]:         CurrencyCodeEnum.USD,

  /// South America
  [RegionEnum.BrazilianPortuguese]:         CurrencyCodeEnum.BRL,

  /// Oceania
  [RegionEnum.AustralianEnglish]:           CurrencyCodeEnum.AUD,
  [RegionEnum.NewZealandEnglish]:           CurrencyCodeEnum.NZD,

  /// Africa
  [RegionEnum.SouthAfricanEnglish]:         CurrencyCodeEnum.ZAR,
};
