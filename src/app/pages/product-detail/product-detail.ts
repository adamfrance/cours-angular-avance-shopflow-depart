import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart-service';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);

  protected readonly produit$ = this.route.paramMap.pipe(
    switchMap((params) => this.productService.getById(Number(params.get('id')))),
  );

  protected ajouter(p: Product): void {
    this.cart.add(p);
  }
}
