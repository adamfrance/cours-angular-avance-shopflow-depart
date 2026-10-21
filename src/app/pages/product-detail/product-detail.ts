import { Component, inject, input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '@shopflow/models';
import { CartService } from '@shopflow/data-access';
import { Note } from '@shopflow/ui';
import { ProductReviews } from './product-reviews';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, NgOptimizedImage, Note, ProductReviews, RouterLink],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private readonly cart = inject(CartService);
  readonly produit = input.required<Product>();

  protected ajouter(p: Product): void {
    this.cart.add(p);
  }
}
