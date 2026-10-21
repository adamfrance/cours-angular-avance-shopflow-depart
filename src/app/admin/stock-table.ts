import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ProductService } from '@shopflow/data-access';
import { EtatStockPipe } from './etat-stock-pipe';

@Component({
  selector: 'app-stock-table',
  imports: [AsyncPipe, CurrencyPipe, EtatStockPipe],
  templateUrl: './stock-table.html',
})
export class StockTable {
  protected readonly page$ = inject(ProductService).getAll();
}
