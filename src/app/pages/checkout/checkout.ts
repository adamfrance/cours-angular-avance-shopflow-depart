import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-checkout',
  imports: [AsyncPipe, CurrencyPipe, FormsModule],
  templateUrl: './checkout.html',
})
export class Checkout {
  private readonly cart = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly total$ = this.cart.total$;
  protected client = { nom: '', email: '', adresse: '', codePostal: '', ville: '' };

  protected valider(): void {
    this.orderService.create(this.auth.userId ?? 1, this.cart.snapshot()).subscribe((commande) => {
      this.cart.clear();
      this.router.navigate(['/commande/confirmation'], { queryParams: { numero: commande.id, total: commande.total } });
    });
  }
}
