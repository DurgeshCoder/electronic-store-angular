import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductsReponse } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { applyStyles } from '@popperjs/core';

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

  uploadProductImage(productId: string, imageData: File) {
    const formData = new FormData();
    formData.append('productImage', imageData);
    return this.http.post(
      `${environment.apiUrl}/products/image/${productId}`,
      formData
    );
  }

  getLiveProducts(
    pageNumber = 0,
    pageSize = 10,
    sortBy = 'title',
    sortDir = 'asc'
  ) {
    return this.http.get<ProductsReponse>(
      `${environment.apiUrl}/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
  }

  getAllProducts(
    pageNumber = 0,
    pageSize = 10,
    sortBy = 'title',
    sortDir = 'asc'
  ) {
    return this.http.get<ProductsReponse>(
      `${environment.apiUrl}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
  }

  getProductImageUrl(productId: string) {
    return `${environment.apiUrl}/products/image/${productId}`;
  }
}
