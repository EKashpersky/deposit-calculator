import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { CalculatorPage } from './calculator.page';
import { DepositResolver } from './deposit.resolver';
import { DepositsManagerService } from '@shared/deposits';



export const CALCULATOR_ROUTES = [
  {
    path: 'new',
    component: CalculatorPage,
  },
  {
    path: ':name',
    component: CalculatorPage,

    providers: [ DepositResolver, DepositsManagerService ],

    resolve: {
      calculator: (route: ActivatedRouteSnapshot) => inject(DepositResolver).resolve(route),
    }
  },


  {
    path: '**',
    redirectTo: 'new',
  },
] as Routes;