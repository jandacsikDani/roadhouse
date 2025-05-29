import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string }>{
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password});
  }
}
