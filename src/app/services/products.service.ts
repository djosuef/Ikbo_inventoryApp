import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8080/api'; // this endpoint was generated in Step 3
  http = inject(HttpClient);

  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(this.apiUrl + '/products');
  }

  getProduct(id: string): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: product): Observable<product> {
    return this.http.post<product>(this.apiUrl + '/product_insert', product);
  }
}
