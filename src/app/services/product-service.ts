import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product, ProductPage } from '../models/product';
import { API_URL } from './api';

@Service()
export class ProductService {
  private readonly http = inject(HttpClient);

  // Tout le catalogue en une requête (194 produits)
  getAll(): Observable<ProductPage> {
    return this.http.get<ProductPage>(`${API_URL}/products?limit=0`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/products/categories`);
  }
}
