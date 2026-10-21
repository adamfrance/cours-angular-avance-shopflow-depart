import { Component, input, OnInit, output } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '@shopflow/models';
import { Note } from '../note/note';
import { PrixRemisePipe } from '../prix-remise/prix-remise-pipe';

/**
 * Carte d'un produit dans une liste : image, catégorie, titre, note, prix et bouton d'ajout.
 *
 * Composant de présentation : il n'utilise aucun service et signale le clic par `ajout`.
 *
 * Utilisation :
 * ```html
 * <sf-product-card [product]="p" [prioritaire]="$index < 4" (ajout)="panier.add($event)" />
 * ```
 */
@Component({
  selector: 'sf-product-card',
  imports: [CurrencyPipe, NgOptimizedImage, Note, PrixRemisePipe, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard implements OnInit {
  /** Produit à afficher. */
  readonly product = input.required<Product>();

  /** Vrai pour les cartes visibles sans faire défiler : leur image est téléchargée en priorité. */
  readonly prioritaire = input(false);

  /** Émis au clic sur « Ajouter au panier », avec le produit de la carte. */
  readonly ajout = output<Product>();

  protected prioriteInitiale = false;

  ngOnInit(): void {
    this.prioriteInitiale = this.prioritaire();
  }

  protected ajouter(): void {
    this.ajout.emit(this.product());
  }
}
