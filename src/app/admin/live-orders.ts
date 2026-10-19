import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { OrderService } from '../services/order-service';

@Component({
  selector: 'app-live-orders',
  imports: [AsyncPipe, CurrencyPipe, DatePipe],
  templateUrl: './live-orders.html',
})
export class LiveOrders implements OnInit {
  private readonly orderService = inject(OrderService);
  protected readonly commandes$ = new BehaviorSubject<Order[]>([]);
  protected readonly miseAJour$ = new BehaviorSubject<Date | null>(null);
  private position = 0;

  ngOnInit(): void {
    this.charger();
    setInterval(() => this.charger(), 5000);
  }

  private charger(): void {
    // Simulation : l'API de démonstration ne reçoit pas de nouvelles commandes, on fait défiler ses paniers
    this.position = (this.position + 5) % 200;
    this.orderService.latest(this.position).subscribe((page) => {
      this.commandes$.next(page.carts);
      this.miseAJour$.next(new Date());
    });
  }
}
