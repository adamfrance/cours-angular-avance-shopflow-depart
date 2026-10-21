import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';
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
export class Orders {
  private readonly auth = inject(AuthService);
  private readonly orderService = inject(OrderService);

  protected readonly etat$: Observable<EtatCommandes> = this.auth.me().pipe(
    switchMap((utilisateur) =>
      this.orderService.byUser(utilisateur.id).pipe(
        map((page) => ({
          chargement: false,
          utilisateur,
          commandes: page.carts,
          totalDepense: page.carts.reduce((s, c) => s + c.discountedTotal, 0),
        })),
      ),
    ),
    catchError((erreur: HttpErrorResponse) =>
      of({
        chargement: false,
        erreur: erreur.status === 401 ? 'Connectez-vous pour voir vos commandes.' : 'Impossible de charger vos commandes.',
        commandes: [],
        totalDepense: 0,
      }),
    ),
    startWith({ chargement: true, commandes: [], totalDepense: 0 }),
  );
}
