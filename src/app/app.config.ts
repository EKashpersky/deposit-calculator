import {
  ApplicationConfig,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  lumberjackLogDriverToken,
  provideLumberjack,
} from '@ngworker/lumberjack';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  CurrencyConverterService,
  CurrencyRatesService,
  CurrencyService
} from '@shared/Currency';
import {
  DepositBridgeService,
  DepositsManagerService,
} from '@shared/deposits';
import { HistoryService } from '@shared/history';
import { ColoredConsoleDriver, LoggerService } from '@shared/logger';
import { PreferencesService } from '@shared/preferences';
import { ShortcutsService } from '@shared/shortcuts.service';
import { StorageService } from '@shared/Storage';

import { appStartup } from './app-startup';
import { routes } from './app.routes';
import { ThemeService } from '@shared/theme.service';



export const appConfig: ApplicationConfig = {
  providers: [
    StorageService,

    provideLumberjack({
      levels: isDevMode() ? [
        'critical',
        'error',
        'info',
        'trace',
      ] : [],
    }),

    {
      provide: lumberjackLogDriverToken,
      useClass: ColoredConsoleDriver,
      multi: true,
    },

    LoggerService,

    provideAppInitializer(appStartup),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: 'i18n/',
        suffix: '.json',
        useHttpBackend: true,
      })
    }),

    ThemeService,

    PreferencesService,
    DepositsManagerService,
    CurrencyService,
    CurrencyRatesService,
    CurrencyConverterService,

    DepositBridgeService,
    HistoryService,
    ShortcutsService,
  ]
};
