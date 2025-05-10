import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import de l'environnement

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerClient(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-client`, data);
  }

  registerOwner(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-proprietaire`, data);
  }
}
