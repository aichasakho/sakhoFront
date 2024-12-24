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
    this.biensService.getBiens().subscribe(
      (data: Bien[]) => {
        this.biens = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des biens', error);
      }
    );
  }
}
