import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Category, Product, ProductPage } from '@shopflow/models';
import { API_URL } from './api';

/**
 * Accès au catalogue de l'API DummyJSON.
 *
 * Le catalogue complet est demandé une seule fois, puis partagé entre tous les composants.
 */
@Service()
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly catalogue$ = this.http.get<ProductPage>(`${API_URL}/products?limit=0`).pipe(
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  /**
   * Tout le catalogue (194 produits), demandé à l'API au premier appel seulement.
   * @returns La page de résultats : produits et nombre total
   */
  getAll(): Observable<ProductPage> {
    return this.catalogue$;
  }

  /**
   * Un produit, avec ses avis.
   * @param id Identifiant du produit
   */
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  /** Les catégories du catalogue, pour le filtre. */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/products/categories`);
  }
}
