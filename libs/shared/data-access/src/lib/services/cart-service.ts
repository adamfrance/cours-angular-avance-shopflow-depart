import { computed, effect, Service, signal } from '@angular/core';
import { CartLine, Product, prixRemise } from '@shopflow/models';

/** Clé sous laquelle le panier est enregistré dans le localStorage du navigateur. */
const CLE_STOCKAGE = 'shopflow-panier';

function lire(): CartLine[] {
  const brut = localStorage.getItem(CLE_STOCKAGE);
  return brut ? JSON.parse(brut) : [];
}

/**
 * État du panier de l'utilisateur, en signaux.
 *
 * Les composants lisent `lignes()`, `nbArticles()` et `total()` ; ils ne modifient le panier
 * qu'au travers des méthodes de ce service.
 */
@Service()
export class CartService {
  private readonly etat = signal<CartLine[]>(lire());

  /** Lignes du panier (lecture seule). */
  readonly lignes = this.etat.asReadonly();

  /** Nombre total d'articles (somme des quantités). */
  readonly nbArticles = computed(() => this.etat().reduce((n, l) => n + l.quantity, 0));

  /** Montant total du panier, prix remisés compris. */
  readonly total = computed(() => this.etat().reduce((s, l) => s + l.price * l.quantity, 0));

  constructor() {
    effect(() => localStorage.setItem(CLE_STOCKAGE, JSON.stringify(this.etat())));
  }

  /**
   * Ajoute un exemplaire du produit ; si le produit est déjà présent, sa quantité augmente de 1.
   * @param product Produit à ajouter, tel que renvoyé par l'API
   */
  add(product: Product): void {
    this.etat.update((lignes) =>
      lignes.some((l) => l.productId === product.id)
        ? lignes.map((l) => (l.productId === product.id ? { ...l, quantity: l.quantity + 1 } : l))
        : [...lignes, { productId: product.id, title: product.title, price: prixRemise(product), quantity: 1, thumbnail: product.thumbnail }],
    );
  }

  /**
   * Modifie la quantité d'une ligne. Une quantité nulle ou négative retire la ligne.
   * @param productId Identifiant du produit
   * @param quantity Nouvelle quantité
   */
  setQuantity(productId: number, quantity: number): void {
    this.etat.update((lignes) =>
      quantity <= 0 ? lignes.filter((l) => l.productId !== productId) : lignes.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
    );
  }

  /**
   * Retire une ligne du panier.
   * @param productId Identifiant du produit à retirer
   */
  remove(productId: number): void {
    this.etat.update((lignes) => lignes.filter((l) => l.productId !== productId));
  }

  /** Vide le panier (après une commande). */
  clear(): void {
    this.etat.set([]);
  }
}
