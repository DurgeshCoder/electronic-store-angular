import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProductWithCategory(product: Product) {
    return this.http.post<Product>(
      `${environment.apiUrl}/categories/${product.category.categoryId}/products`,
      product
    );
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.apiUrl}/products`, product);
  }
}
