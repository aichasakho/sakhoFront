import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  registerClient(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-client`, data);
  }

  registerOwner(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-proprietaire`, data);
  }
}
