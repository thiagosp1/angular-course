import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products';
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',
      {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 3000
      });
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  read(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(url);
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.httpClient.put<Product>(url, product);
  }

  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`
    return this.httpClient.delete<void>(url);
  }

}
