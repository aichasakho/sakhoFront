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
  bien: any;

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

  reserverWhatsApp(): void {
    const message = `Je souhaite réserver le bien: ${this.bien.titre} avec le prix de ${this.bien.prix} FCFA.`;
    const phoneNumber = '+221776819474';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  reserverEmail(): void {
    const subject = `Réservation pour ${this.bien.titre}`;
    const body = `Je souhaite réserver le bien suivant :\n\nTitre: ${this.bien.titre}\nPrix: ${this.bien.prix} FCFA\nDescription: ${this.bien.description}`;
    const email = 'sakhoaichatou11@gmail.com.com';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
