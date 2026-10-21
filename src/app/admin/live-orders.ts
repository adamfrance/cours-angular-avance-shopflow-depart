import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, EMPTY, map, switchMap, timer } from 'rxjs';
import { OrderService } from '@shopflow/data-access';

@Component({
  selector: 'app-live-orders',
  imports: [AsyncPipe, CurrencyPipe, DatePipe],
  templateUrl: './live-orders.html',
})
export class LiveOrders {
  private readonly orderService = inject(OrderService);
  protected readonly actif$ = new BehaviorSubject(true);

  protected readonly flux$ = this.actif$.pipe(
    switchMap((actif) => (actif ? timer(0, 5000) : EMPTY)),
    map((n) => ((n + 1) * 5) % 200),
    switchMap((position) => this.orderService.latest(position)),
    map((page) => ({ commandes: page.carts, date: new Date() })),
  );

  protected basculer(): void {
    this.actif$.next(!this.actif$.value);
  }
}
