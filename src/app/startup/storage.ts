import { inject } from '@angular/core';

import { DepositsManagerService, DepositsStorageService } from '@shared/deposits';



export function appStartupSetupStorage() {
  const DB_NAME = 'dc';
  const DB_VERSION = 1;

  const storage = inject(DepositsStorageService);
  const manager = inject(DepositsManagerService);

  return storage.initStorage(DB_NAME, DB_VERSION).then(() => {
    return manager.getUserDeposits();
  });
}