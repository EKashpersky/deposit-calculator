import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('../Features/dashboard/dashboard.page').then(m => m.DashboardPage),
  },

  {
    path: 'calculator',
    loadChildren: () => import('../Features/calculator/calculator.routes')
      .then(m => m.CALCULATOR_ROUTES),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];
