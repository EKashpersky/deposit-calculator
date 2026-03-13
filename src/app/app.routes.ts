import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../Features/home/home.page').then(m => m.HomePage),
  },

  {
    path: 'calculator',
    loadComponent: () => import('../Features/calculator/calculator.page').then(m => m.CalculatorPage),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
