import {
  ApplicationConfig,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import {
  lumberjackLogDriverToken,
  provideLumberjack,
} from '@ngworker/lumberjack';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { CalculatorGuard } from '@features/calculator/calculator.guard';
import { DepositResolver } from '@features/calculator/deposit.resolver';
import {
  CurrencyBankService,
  CurrencyOpsService,
  CurrencyService
} from '@shared/Currency';
import {
  DepositBridgeService,
  DepositsManagerService,
} from '@shared/deposits';
import { HistoryService } from '@shared/history';
import { ColoredConsoleDriver, LoggerService } from '@shared/logger';
import { PaneManagerService } from '@shared/pane-manager.service';
import { PreferencesService } from '@shared/preferences';
import { ShortcutsService } from '@shared/shortcuts.service';
import { StorageService } from '@shared/Storage';
import { ThemeService } from '@shared/theme.service';

import { appStartup } from './app-startup';
import { routes } from './app.routes';
import { AppService } from './app.service';


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
      provide: MAT_ICON_DEFAULT_OPTIONS,
      useValue: { fontSet: 'material-symbols-outlined' },
    },

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
    CurrencyBankService,
    CurrencyOpsService,

    DepositResolver,
    AppService,
    CalculatorGuard,

    DepositBridgeService,
    HistoryService,
    ShortcutsService,
    PaneManagerService,
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ]
};
