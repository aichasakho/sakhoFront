import { Component, OnInit } from '@angular/core';
import { BiensService } from '../services/bien.service';
import { Bien } from '../models/bien.model';
@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.css']
})
export class BienComponent implements OnInit {
  biens: Bien[] = [];

  constructor(private biensService: BiensService) {}

  ngOnInit(): void {
    this.loadBiens();

  }
  loadBiens(): void {
    this.biensService.getBiens().subscribe((data: Bien[]) => {
      this.biens = data;
        console.log(this.biens);
      },
      (error) => {
        console.error('Erreur lors du chargement des biens', error);

      });
  }
  appelBien(bien: Bien): void {
    this.biensService.appelBien(bien).subscribe(
      (response) => {
        console.log(response.message);
      },
      (error) => {
        console.error('Erreur lors de la demande d\'appel', error);
      }
    );
  }

  contacterBien(bien: Bien): void {
    this.biensService.contacterBien(bien).subscribe(
      (response) => {
        console.log(response.message);
      },
      (error) => {
        console.error('Erreur lors de la demande de contact', error);
      }
    );
  }




}
