import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bien } from '../models/bien.model';
import { environment } from '../../environments/environment'; // Import de l'environnement

@Injectable({
  providedIn: 'root'
})
export class BiensService {
  private apiUrl = `${environment.apiUrl}/biens`; // URL de base pour les biens
  private venteUrl = `${environment.apiUrl}/vente`; // URL pour les ventes
  private locationUrl = `${environment.apiUrl}/location`; // URL pour les locations
  private updateUrl = `${environment.apiUrl}/update`; // URL pour les mises à jour

  constructor(private http: HttpClient) {}

  // Tous les biens
  getBiens(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.apiUrl);
  }

  // Biens en vente
  getVente(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.venteUrl);
  }

  // Biens en location
  getLocation(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.locationUrl);
  }

  // Détail d'un bien
  getBien(id: string | null): Observable<Bien> {
    return this.http.get<Bien>(`${this.apiUrl}/${id}`);
  }

  // Création d'un bien
  createBien(bien: FormData): Observable<Bien> {
    return this.http.post<Bien>(this.apiUrl, bien);
  }

  // Mise à jour d'un bien
  updateBien(bien: FormData): Observable<Bien> {
    return this.http.post<Bien>(this.updateUrl, bien);
  }

  // Suppression d'un bien
  deleteBien(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Appeler pour un bien
  appelBien(bien: Bien): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${bien.id}/appeler`, {});
  }

  // Contacter pour un bien
  contacterBien(bien: Bien): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${bien.id}/contacter`, {});
  }

  // Récupérer un bien par ID (identique à getBien, à supprimer si redondant)
  getBienById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}