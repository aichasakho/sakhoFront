import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 /* hasAnyRole(arg0: string[]): boolean {
      throw new Error('Method not implemented.');
  }*/

  private apiUrl = 'http://127.0.0.1:8000/api';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  constructor(private http: HttpClient) { }


  register(nomComplet: string, email: string, password: string, passwordConfirmation: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      nom_complet: nomComplet,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    });
  }


  checkAuthentication(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
  
        if (response.user) { 
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
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


  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    if (!user) {
      return null; 
    }
  
    try {
      return JSON.parse(user).role;
    } catch (error) {
      console.error('Erreur de parsing JSON:', error);
      return null;
    }
  }
  

  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    console.log('User role:', userRole); 
    return userRole === role;
  }  

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return roles.includes(userRole!);
  }


}
