import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { appStartup } from './app-startup';
import { DepositsStorageService } from '../Shared/deposits/deposits-storage.service';



export const appConfig: ApplicationConfig = {
  providers: [
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
    DepositsStorageService
  ]
};
