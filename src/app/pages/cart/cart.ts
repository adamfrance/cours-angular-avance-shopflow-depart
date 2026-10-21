import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartLine } from '@shopflow/models';
import { CartService } from '@shopflow/data-access';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
})
export class Cart {
  private readonly cart = inject(CartService);
  protected readonly lignes$ = this.cart.lines$;
  protected readonly total$ = this.cart.total$;

  protected changer(ligne: CartLine, delta: number): void {
    this.cart.setQuantity(ligne.productId, ligne.quantity + delta);
  }

  protected retirer(ligne: CartLine): void {
    this.cart.remove(ligne.productId);
  }

  protected vider(): void {
    this.cart.clear();
  }
}
