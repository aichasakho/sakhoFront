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
  biensToShow: Bien[] = [];
  itemsPerPage: number = 8;
  currentPage: number = 1;

  constructor(private biensService: BiensService) {}

  ngOnInit(): void {
    this.loadBiens();
  }

  loadBiens(): void {
    this.biensService.getBiens().subscribe(
      (data: Bien[]) => {
        this.biens = data;
        this.biensToShow = this.biens.slice(0, this.itemsPerPage); 
      },
      (error) => {
        console.error('Erreur lors du chargement des biens', error);
      }
    );
  }

  loadMore(): void {
    const nextPage = this.currentPage + 1;
    const startIndex = this.itemsPerPage * nextPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.biensToShow = this.biens.slice(0, endIndex); 

    this.currentPage = nextPage;
  }
}
