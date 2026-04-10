import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  Router,
} from '@angular/router';

import { DepositsManagerService } from '@shared/deposits';

import { DepositModel } from './model';



@Injectable()
export class DepositResolver implements Resolve<DepositModel> {
  public constructor() {}

  public resolve(route: ActivatedRouteSnapshot): MaybeAsync<DepositModel | RedirectCommand> {
    const depositName = route.paramMap.get('id')!;

    return inject(DepositsManagerService).fromName(depositName)
    .then(deposit => {
      if (deposit === null) {
        return new RedirectCommand(inject(Router).parseUrl('calculator/new'));
      } else {
        return deposit;
      }
    });
  }
}