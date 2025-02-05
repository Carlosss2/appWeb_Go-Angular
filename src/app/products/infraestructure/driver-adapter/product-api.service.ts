import { Injectable } from '@angular/core';
import { ProductGateway } from '../../domain/models/gateway/product-gateway';
import { Product } from '../../domain/models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends ProductGateway {

  private apiUrl = 'http://localhost:8080/products'; 

  constructor(private http: HttpClient) {super();}

  create(name: string, price: number): Observable<Product> {
    const payload = { name, price };  // Crear objeto JSON correcto
    return this.http.post<Product>(this.apiUrl, payload, {
        headers: { 'Content-Type': 'application/json' }
    });
}



  getAll(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`${this.apiUrl}/`)
      .pipe(map(response => response.products));
  }
  
  

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.Id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
