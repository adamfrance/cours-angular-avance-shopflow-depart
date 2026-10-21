import { Routes } from '@angular/router';
import { Catalogue } from './pages/catalogue/catalogue';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
  { path: 'catalogue', component: Catalogue },
  {
    path: 'catalogue/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  { path: 'panier', loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart) },
  {
    path: 'commande',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
  },
  {
    path: 'commande/confirmation',
    loadComponent: () => import('./pages/checkout/confirmation').then((m) => m.Confirmation),
  },
  { path: 'connexion', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
  {
    path: 'mes-commandes',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/orders/orders').then((m) => m.Orders),
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes) },
  { path: '**', redirectTo: 'catalogue' },
];
