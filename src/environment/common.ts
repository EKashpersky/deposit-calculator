import { signal } from '@angular/core';



const version = signal('');

export const environment = {
  version: version.asReadonly()
};

import('../../package.json').then(x => version.set(x.version));
