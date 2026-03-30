import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('../Features/dashboard/dashboard.page').then(m => m.DashboardPage),
  },

  {
    path: 'calculator',
    loadComponent: () => import('../Features/calculator/calculator.page').then(m => m.CalculatorPage),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];
