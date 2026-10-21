import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Order, User } from '@shopflow/models';
import { AuthService, OrderService } from '@shopflow/data-access';

interface EtatCommandes {
  chargement: boolean;
  erreur?: string;
  utilisateur?: User;
  commandes: Order[];
  totalDepense: number;
}

@Component({
  selector: 'app-orders',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './orders.html',
})
export class Orders implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly orderService = inject(OrderService);

  protected readonly etat$ = new BehaviorSubject<EtatCommandes>({ chargement: true, commandes: [], totalDepense: 0 });

  ngOnInit(): void {
    this.auth.me().subscribe({
      next: (utilisateur) => {
        this.orderService.byUser(utilisateur.id).subscribe({
          next: (page) =>
            this.etat$.next({
              chargement: false,
              utilisateur,
              commandes: page.carts,
              totalDepense: page.carts.reduce((s, c) => s + c.discountedTotal, 0),
            }),
          error: () =>
            this.etat$.next({ chargement: false, erreur: 'Impossible de charger vos commandes.', commandes: [], totalDepense: 0 }),
        });
      },
      error: () =>
        this.etat$.next({ chargement: false, erreur: 'Connectez-vous pour voir vos commandes.', commandes: [], totalDepense: 0 }),
    });
  }
}
