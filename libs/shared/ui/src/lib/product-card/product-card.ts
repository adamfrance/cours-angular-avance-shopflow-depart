import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, prixRemise } from '@shopflow/models';
import { Note } from '../note/note';

@Component({
  selector: 'sf-product-card',
  imports: [CurrencyPipe, Note, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly ajout = output<Product>();

  protected prixFinal(): number {
    return prixRemise(this.product());
  }

  protected ajouter(): void {
    this.ajout.emit(this.product());
  }
}
