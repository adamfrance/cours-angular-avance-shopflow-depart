import { Component, inject, input } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, prixRemise } from '../../models/product';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, DecimalPipe, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();
  private readonly cart = inject(CartService);

  protected prixFinal(): number {
    return prixRemise(this.product());
  }

  protected ajouter(): void {
    this.cart.add(this.product());
  }
}
