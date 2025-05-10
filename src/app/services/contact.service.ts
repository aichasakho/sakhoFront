import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import de l'environnement

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contact`; // URL de base pour les biens

  constructor(private http: HttpClient) { }

  sendMessage(name: string, email: string, message: string): Observable<any> {
    const payload = { name, email, message };
    return this.http.post(this.apiUrl, payload);
  }
}
