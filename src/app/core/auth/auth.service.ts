import { LoginRequest } from '../models/LoginRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiURL: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: LoginRequest): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${this.apiURL}/auth/login`, loginRequest)
      .pipe(
        tap((res) => localStorage.setItem('access_token', res.access_token))
      );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return of(false);
    }

    return this.http
      .get<{ isValid: boolean }>(`${this.apiURL}/auth/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((res) => res.isValid),
        catchError(() => of(false))
      );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['auth/login'])
  }
}
