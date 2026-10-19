import { Routes } from '@angular/router';
import { Catalogue } from './pages/catalogue/catalogue';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Confirmation } from './pages/checkout/confirmation';
import { Login } from './pages/login/login';
import { Orders } from './pages/orders/orders';
import { AdminLayout } from './admin/admin-layout';
import { AdminDashboard } from './admin/admin-dashboard';
import { StockTable } from './admin/stock-table';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
  { path: 'catalogue', component: Catalogue },
  { path: 'catalogue/:id', component: ProductDetail },
  { path: 'panier', component: Cart },
  { path: 'commande', component: Checkout },
  { path: 'commande/confirmation', component: Confirmation },
  { path: 'connexion', component: Login },
  { path: 'mes-commandes', component: Orders },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: AdminDashboard },
      { path: 'stock', component: StockTable },
    ],
  },
  { path: '**', redirectTo: 'catalogue' },
];
