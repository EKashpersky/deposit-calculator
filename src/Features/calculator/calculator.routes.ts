import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { CalculatorPage } from './calculator.page';
import { DepositResolver } from './deposit.resolver';



export const CALCULATOR_ROUTES = [
  {
    path: 'new',
    component: CalculatorPage,
  },
  {
    path: ':id',
    component: CalculatorPage,

    providers: [ DepositResolver ],

    resolve: {
      calculator: (route: ActivatedRouteSnapshot) => inject(DepositResolver).resolve(route),
    }
  },


  {
    path: '**',
    redirectTo: 'new',
  },
] as Routes;