import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://roadhousepizzeria.com/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string }>{
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password});
  }
}
