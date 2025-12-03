import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Food } from '../../models/Food';
import { FoodType } from '../../models/FoodType';

@Injectable({
  providedIn: 'root'
})
export class MenuService{
  private apiUrl = 'https://roadhousepizzeria.com/api/menu';

  constructor(private http: HttpClient) { }

  getFoodTypes(): Observable<{id: number, name: string, type_order: number}[]>{
    return this.http.get<{id: number, name: string, type_order: number}[]>(`${this.apiUrl}/foodTypes`);
  }

  getAllFood(): Observable<{id: number, typeid: number, name: string, description: string, price: string}[]>{
    return this.http.get<{id: number, typeid: number, name: string, description: string, price: string}[]>(`${this.apiUrl}`);
  }

  getFoodsByTypeId(id: string | null | undefined): Observable<{id: number, typeid: number, name: string, description: string, price: string}[]>{
    return this.http.get<{id: number, typeid: number, name: string, description: string, price: string}[]>(`${this.apiUrl}/foodTypes/${id}`);
  }

  addNewFood(newFood: Food): Observable<Food>{
    return this.http.post<Food>(`${this.apiUrl}`, JSON.stringify(newFood));
  }

  deleteFood(food: Food): Promise<{response: string, error?: string}>{
    return firstValueFrom(this.http.delete<{response: string, error?: string}>(`${this.apiUrl}/${food.id}`));
  }

  updateFood(food: Food): Promise<{response: string, error?: string}>{
    return firstValueFrom(this.http.put<{response: string, error?: string}>(`${this.apiUrl}/${food.id}`, JSON.stringify(food)));
  }

  addType(type: FoodType): Observable<FoodType>{
    return this.http.post<FoodType>(`${this.apiUrl}/foodTypes`, JSON.stringify(type));
  }

  deleteType(id: number | undefined): Promise<{response: string, error?: string}>{
    return firstValueFrom(this.http.delete<{response: string, error?: string}>(`${this.apiUrl}/foodTypes/${id}`));
  }

  updateTypes(types: FoodType[]): Promise<{response: string}>{
    return firstValueFrom(this.http.put<{response:string}>(`${this.apiUrl}/foodTypes`, JSON.stringify(types)));
  }
}
