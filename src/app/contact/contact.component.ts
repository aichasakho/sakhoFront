import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Bien} from "../models/bien.model";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private http: HttpClient) {}

  appelBien(bien: Bien) {
    this.http.post(`/api/biens/${bien.id}/appeler`, {}).subscribe(
      (response) => {
        // console.log(response.message);
        // Afficher un message de succès à l'utilisateur
      },
      (error) => {
        console.error('Erreur lors de la demande d\'appel', error);
        // Afficher un message d'erreur à l'utilisateur
      }
    );
  }

  contactBien(bien: Bien) {
    this.http.post(`/api/biens/${bien.id}/contacter`, {}).subscribe(
      (response) => {
        // console.log(response.message);
        // Afficher un message de succès à l'utilisateur
      },
      (error) => {
        console.error('Erreur lors de la demande de contact', error);
        // Afficher un message d'erreur à l'utilisateur
      }
    );
  }
}



