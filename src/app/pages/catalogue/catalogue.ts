import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  Subject,
} from 'rxjs';
import { Product } from '@shopflow/models';
import { CartService, ProductService } from '@shopflow/data-access';
import { ProductCard } from '@shopflow/ui';

type Tri = 'nom' | 'prix-croissant' | 'prix-decroissant';

/** Filtre et trie les produits : fonction pure, sans état, facile à tester. */
function filtrerEtTrier(
  produits: Product[],
  terme: string,
  categorie: string,
  tri: Tri,
): Product[] {
  console.log('calcul de la liste')
  const filtres = produits.filter(
    (p) => p.title.toLowerCase().includes(terme) && (!categorie || p.category === categorie),
  );
  return [...filtres].sort((a, b) =>
    tri === 'nom'
      ? a.title.localeCompare(b.title)
      : tri === 'prix-croissant'
        ? a.price - b.price
        : b.price - a.price,
  );
}

@Component({
  selector: 'app-catalogue',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './catalogue.html',
})
export class Catalogue {
  private readonly productService = inject(ProductService);
  protected readonly panier = inject(CartService);
  protected readonly categories$ = this.productService.getCategories();

  private readonly saisie$ = new Subject<string>();
  private readonly categorie$ = new BehaviorSubject('');
  private readonly tri$ = new BehaviorSubject<Tri>('nom');

  private readonly terme$ = this.saisie$.pipe(
    debounceTime(300),
    map((t) => t.trim().toLowerCase()),
    distinctUntilChanged(),
    startWith(''),
  );

  protected readonly vue$ = combineLatest([
    this.productService.getAll(),
    this.terme$,
    this.categorie$,
    this.tri$,
  ]).pipe(
    map(([page, terme, categorie, tri]) => ({
      total: page.total,
      produits: filtrerEtTrier(page.products, terme, categorie, tri),
    })),
  );

  protected onRecherche(event: Event): void {
    this.saisie$.next((event.target as HTMLInputElement).value);
  }

  protected onCategorie(event: Event): void {
    this.categorie$.next((event.target as HTMLSelectElement).value);
  }

  protected onTri(event: Event): void {
    this.tri$.next((event.target as HTMLSelectElement).value as Tri);
  }
}
