import { appStartupSetupLocale } from './startup/locale';
import { appStartupSetupStorage } from './startup/storage';



export function appStartup(): Promise<void> | void {
  return new Promise(resolve => {
    Promise.all([
      appStartupSetupLocale(),
      appStartupSetupStorage(),
    ]).then(() => resolve())
  });
}