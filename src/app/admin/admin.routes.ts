import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout';
import { AdminDashboard } from './admin-dashboard';
import { StockTable } from './stock-table';
import { adminGuard } from '../guards/admin-guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivateChild: [adminGuard],
    children: [
      { path: '', component: AdminDashboard },
      { path: 'stock', component: StockTable },
    ],
  },
];
