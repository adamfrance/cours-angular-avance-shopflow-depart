import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Product } from '../models/product';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-stock-table',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './stock-table.html',
})
export class StockTable {
  protected readonly page$ = inject(ProductService).getAll();

  protected etatStock(p: Product): string {
    return p.stock === 0 ? 'Rupture' : p.stock < 10 ? 'Stock faible' : 'En stock';
  }

  protected valeur(p: Product): number {
    return p.price * p.stock;
  }
}
