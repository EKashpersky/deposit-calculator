import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Routes
} from '@angular/router';

import { DepositResolver } from '@features/calculator/deposit.resolver';
import { canDeactivateCalculator } from '@features/dashboard/calculator-cd';
import { DepositsManagerService } from '@shared/deposits';



export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('../Features/dashboard/dashboard.page')
      .then(m => m.DashboardPage),

    children: [
      {
        path: ':name/calculator',
        loadComponent: () => import('../Features/calculator/calculator.page').then(m => m.CalculatorPage),
        providers: [ DepositResolver, DepositsManagerService ],
        resolve: {
          calculator: (route: ActivatedRouteSnapshot) => inject(DepositResolver).resolve(route),
        },

        canDeactivate: [ canDeactivateCalculator ]
      }
    ],
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

if (ngDevMode) {
  routes.push({
    path: 'playground',
    /// @ts-ignore
    loadComponent: () => import('../Features/playground/playground.page')
      .then(m => m.PlaygroundPage)
  });
}
