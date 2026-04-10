import { inject } from '@angular/core';

import { DepositsStorageService } from '@shared/deposits';



export function appStartupSetupStorage() {
  const DB_NAME = 'dc';
  const DB_VERSION = 1;

  return inject(DepositsStorageService).initStorage(DB_NAME, DB_VERSION);
}