import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { ProductCard } from './product-card';

type Tri = 'nom' | 'prix-croissant' | 'prix-decroissant';

@Component({
  selector: 'app-catalogue',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './catalogue.html',
})
export class Catalogue {
  private readonly productService = inject(ProductService);

  protected readonly page$ = this.productService.getAll();
  protected readonly categories$ = this.productService.getCategories();
  protected recherche = '';
  protected categorie = '';
  protected tri: Tri = 'nom';

  protected produitsAffiches(produits: Product[]): Product[] {
    const terme = this.recherche.trim().toLowerCase();
    const filtres = produits.filter(
      (p) => p.title.toLowerCase().includes(terme) && (!this.categorie || p.category === this.categorie),
    );
    return [...filtres].sort((a, b) =>
      this.tri === 'nom' ? a.title.localeCompare(b.title) : this.tri === 'prix-croissant' ? a.price - b.price : b.price - a.price,
    );
  }

  protected onRecherche(event: Event): void {
    this.recherche = (event.target as HTMLInputElement).value;
  }

  protected onCategorie(event: Event): void {
    this.categorie = (event.target as HTMLSelectElement).value;
  }

  protected onTri(event: Event): void {
    this.tri = (event.target as HTMLSelectElement).value as Tri;
  }
}
