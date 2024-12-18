import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
<<<<<<< HEAD
import { Observable } from 'rxjs';
=======
import {BehaviorSubject, Observable, tap} from 'rxjs';
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a

@Injectable({
  providedIn: 'root'
})
export class AuthService {

<<<<<<< HEAD
  private apiUrl = 'http://localhost:8000/api';

=======
  private apiUrl = 'http://127.0.0.1:8000/api';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a
  constructor(private http: HttpClient) { }


  register(nomComplet: string, email: string, password: string, passwordConfirmation: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      nom_complet: nomComplet,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    });
  }


<<<<<<< HEAD
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
=======
  checkAuthentication(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('authToken');
        this.isAuthenticatedSubject.next(false);
      })
    );
  }

>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a
}
