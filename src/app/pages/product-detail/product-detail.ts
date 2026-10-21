import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '@shopflow/models';
import { CartService, ProductService } from '@shopflow/data-access';
import { Note } from '@shopflow/ui';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, Note, RouterLink],
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
