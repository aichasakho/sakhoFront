import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8000/api/contact'; // Remplacez par votre URL API

  constructor(private http: HttpClient) { }

  sendMessage(name: string, email: string, message: string): Observable<any> {
    const payload = { name, email, message };
    return this.http.post(this.apiUrl, payload);
  }
}
