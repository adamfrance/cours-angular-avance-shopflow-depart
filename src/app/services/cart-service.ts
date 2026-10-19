import { Service } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartLine } from '../models/cart';
import { Product, prixRemise } from '../models/product';

const CLE_STOCKAGE = 'shopflow-panier';

@Service()
export class CartService {
  private readonly lignes = new BehaviorSubject<CartLine[]>(this.lire());
  readonly lines$ = this.lignes.asObservable();
  readonly count$ = this.lines$.pipe(map((lignes) => lignes.reduce((n, l) => n + l.quantity, 0)));
  readonly total$ = this.lines$.pipe(map((lignes) => lignes.reduce((s, l) => s + l.price * l.quantity, 0)));

  add(product: Product): void {
    const lignes = this.lignes.value;
    const existante = lignes.find((l) => l.productId === product.id);
    const suivantes = existante
      ? lignes.map((l) => (l.productId === product.id ? { ...l, quantity: l.quantity + 1 } : l))
      : [...lignes, { productId: product.id, title: product.title, price: prixRemise(product), quantity: 1, thumbnail: product.thumbnail }];
    this.publier(suivantes);
  }

  setQuantity(productId: number, quantity: number): void {
    const suivantes =
      quantity <= 0
        ? this.lignes.value.filter((l) => l.productId !== productId)
        : this.lignes.value.map((l) => (l.productId === productId ? { ...l, quantity } : l));
    this.publier(suivantes);
  }

  remove(productId: number): void {
    this.publier(this.lignes.value.filter((l) => l.productId !== productId));
  }

  clear(): void {
    this.publier([]);
  }

  snapshot(): CartLine[] {
    return this.lignes.value;
  }

  private publier(lignes: CartLine[]): void {
    this.lignes.next(lignes);
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(lignes));
  }

  private lire(): CartLine[] {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    return brut ? JSON.parse(brut) : [];
  }
}
