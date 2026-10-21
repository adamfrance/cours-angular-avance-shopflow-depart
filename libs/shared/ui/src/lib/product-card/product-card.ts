import { Component, input, output } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, prixRemise } from '@shopflow/models';
import { Note } from '../note/note';
import { PrixRemisePipe } from '../prix-remise/prix-remise-pipe';

/**
 * Carte d'un produit dans une liste : image
 *
 * Composant de présentation : il n'utilise aucun service
 */

@Component({
  selector: 'sf-product-card',
  imports: [CurrencyPipe, Note, RouterLink, NgOptimizedImage, PrixRemisePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  /** Produit à afficher */
  readonly product = input.required<Product>();
  readonly ajout = output<Product>();

  readonly prioritaire = input(false);

  protected prixFinal(): number {
    return prixRemise(this.product());
  }

  protected ajouter(): void {
    this.ajout.emit(this.product());
  }
}
