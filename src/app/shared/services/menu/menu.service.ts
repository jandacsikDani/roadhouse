import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../../models/Food';

@Injectable({
  providedIn: 'root'
})
export class MenuService{
  private apiUrl = 'http://localhost:3000/api/menu';

  constructor(private http: HttpClient) { }

  getFoodTypes(): Observable<{id: number, name: string}[]>{
    return this.http.get<{id: number, name: string}[]>(`${this.apiUrl}/foodTypes`);
  }

  getAllFood(): Observable<{id: number, typeid: number, name: string, description: string, price: string}[]>{
    return this.http.get<{id: number, typeid: number, name: string, description: string, price: string}[]>(`${this.apiUrl}`);
  }

  getFoodsByTypeId(id: string | null | undefined): Observable<{id: number, typeid: number, name: string, description: string, price: string}[]>{
    return this.http.get<{id: number, typeid: number, name: string, description: string, price: string}[]>(`${this.apiUrl}/foodTypes/${id}`);
  }

  addNewFood(newFood: Food): Observable<any>{
    return this.http.post(`${this.apiUrl}`, JSON.stringify(newFood));
  }
}
