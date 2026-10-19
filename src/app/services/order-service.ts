import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CartLine } from '../models/cart';
import { Order, OrderPage } from '../models/order';
import { API_URL } from './api';

@Service()
export class OrderService {
  private readonly http = inject(HttpClient);

  // Commandes (paniers validés) d'un utilisateur
  byUser(userId: number): Observable<OrderPage> {
    return this.http.get<OrderPage>(`${API_URL}/carts/user/${userId}`);
  }

  // Enregistre une commande ; DummyJSON simule l'écriture et renvoie la commande créée
  create(userId: number, lignes: CartLine[]): Observable<Order> {
    return this.http.post<Order>(`${API_URL}/carts/add`, {
      userId,
      products: lignes.map((l) => ({ id: l.productId, quantity: l.quantity })),
    });
  }

  // Cinq commandes à partir d'une position, pour le tableau de bord
  latest(skip: number): Observable<OrderPage> {
    return this.http.get<OrderPage>(`${API_URL}/carts?limit=5&skip=${skip}`);
  }
}
