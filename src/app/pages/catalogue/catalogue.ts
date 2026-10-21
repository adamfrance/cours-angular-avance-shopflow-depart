import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Product } from '@shopflow/models';
import { CartService, ProductService } from '@shopflow/data-access';
import { ProductCard } from '@shopflow/ui';

type Tri = 'nom' | 'prix-croissant' | 'prix-decroissant';

function filtrerEtTrier(produits: Product[], terme: string, categorie: string, tri: Tri): Product[] {
  const filtres = produits.filter((p) => p.title.toLowerCase().includes(terme) && (!categorie || p.category === categorie));
  return [...filtres].sort((a, b) =>
    tri === 'nom' ? a.title.localeCompare(b.title) : tri === 'prix-croissant' ? a.price - b.price : b.price - a.price,
  );
}

@Component({
  selector: 'app-catalogue',
  imports: [ProductCard],
  templateUrl: './catalogue.html',
})
export class Catalogue {
  private readonly productService = inject(ProductService);
  protected readonly panier = inject(CartService);

  protected readonly page = toSignal(this.productService.getAll());
  protected readonly categories = toSignal(this.productService.getCategories(), { initialValue: [] });

  protected readonly saisie = signal('');
  protected readonly categorie = signal('');
  protected readonly tri = signal<Tri>('nom');

  private readonly terme = toSignal(
    toObservable(this.saisie).pipe(debounceTime(300), map((t) => t.trim().toLowerCase()), distinctUntilChanged()),
    { initialValue: '' },
  );

  protected readonly produits = computed(() =>
    filtrerEtTrier(this.page()?.products ?? [], this.terme(), this.categorie(), this.tri()),
  );

  protected onRecherche(event: Event): void {
    this.saisie.set((event.target as HTMLInputElement).value);
  }

  protected onCategorie(event: Event): void {
    this.categorie.set((event.target as HTMLSelectElement).value);
  }

  protected onTri(event: Event): void {
    this.tri.set((event.target as HTMLSelectElement).value as Tri);
  }
}
