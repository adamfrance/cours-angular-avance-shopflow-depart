import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Product } from '../models/product';
import { ProductService } from '../services/product-service';
import { LiveOrders } from './live-orders';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AsyncPipe, CurrencyPipe, LiveOrders],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  protected readonly page$ = inject(ProductService).getAll();

  protected valeurStock(produits: Product[]): number {
    return produits.reduce((s, p) => s + p.price * p.stock, 0);
  }

  protected nbStockFaible(produits: Product[]): number {
    return produits.filter((p) => p.stock > 0 && p.stock < 10).length;
  }

  protected nbRuptures(produits: Product[]): number {
    return produits.filter((p) => p.stock === 0).length;
  }
}
