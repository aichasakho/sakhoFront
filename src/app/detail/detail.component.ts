import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiensService } from '../services/bien.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  bien: any;

  constructor(
    private route: ActivatedRoute,
    private biensService: BiensService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getBienDetail(id);
    }
  }

  getBienDetail(id: string): void {
    this.biensService.getBienById(id).subscribe(
      (data) => {
        this.bien = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du bien', error);
      }
    );
  }

  reserver(): void {
    alert('Réservation en cours...');
  }

  reserverWhatsApp(): void {
    const message = `Je souhaite réserver le bien: ${this.bien.type_bien} avec le prix de ${this.bien.prix} FCFA.`;
    const phoneNumber = '+221778727942';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  reserverEmail(): void {
    const subject = `Réservation pour ${this.bien.type_bien}`;
    const body = `Je souhaite réserver le bien suivant :\n\nType: ${this.bien.type_bien}\nPrix: ${this.bien.prix} FCFA\nDescription: ${this.bien.description}`;
    const email = 'contact@votre-email.com';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
