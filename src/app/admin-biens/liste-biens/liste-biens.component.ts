import { Component } from '@angular/core';
import {BiensService} from "../../services/bien.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-biens',
  templateUrl: './liste-biens.component.html',
  styleUrls: ['./liste-biens.component.css']
})
export class ListeBiensComponent {
  biens: any[] = [];

  constructor(private biensService: BiensService ,
              private router: Router) {}


  ngOnInit(): void {
    this.loadBiens();
  }


  onEdit(bienId: number) {
    this.router.navigate(['/edit-bien', bienId]);
  }

  onDelete(bien: any) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce bien ?');

    if (confirmation) {
      this.biensService.deleteBien(bien.id).subscribe(() => {
        // Supprimez le bien de la liste
        this.biens = this.biens.filter(b => b.id !== bien.id);
        alert('Bien supprimé avec succès');
      }, error => {
        console.error('Erreur lors de la suppression du bien', error);
        alert('Une erreur est survenue lors de la suppression du bien.');
      });
    }
  }

  private loadBiens() {
    this.biensService.getBiens().subscribe(
      (data: any[]) => {
        this.biens = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des biens', error);
      }
    );
  }
}
