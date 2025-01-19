import { Component } from '@angular/core';
import {BiensService} from "../../services/bien.service";

@Component({
  selector: 'app-liste-biens',
  templateUrl: './liste-biens.component.html',
  styleUrls: ['./liste-biens.component.css']
})
export class ListeBiensComponent {
  biens: any[] = [];

  constructor(private biensService: BiensService) {}


  ngOnInit(): void {
    this.loadBiens();
  }


  onEdit(bien: any) {

  }

  onDelete(bien: any) {

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
