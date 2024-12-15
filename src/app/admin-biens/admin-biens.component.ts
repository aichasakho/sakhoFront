import { Component, OnInit } from '@angular/core';
import { BiensService } from '../services/bien.service';
import { FormsModule } from '@angular/forms';
import { Bien } from '../models/bien.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-biens',
  templateUrl: './admin-biens.component.html',
  styleUrls: ['./admin-biens.component.css']
})
export class AdminBiensComponent implements OnInit {
  biens: Bien[] = [];
  bien: Bien = {id:0 , titre: '', description: '', prix: 0, disponible: true, type: '', type_annonce: '' };
  selectedFile: File | null = null;

  constructor(private biensService: BiensService, private router: Router) {}

  ngOnInit(): void {
    this.loadBiens();
  }

  loadBiens(): void {
    this.biensService.getBiens().subscribe((data: Bien[]) => {
      this.biens = data;
    },
      (error) => {
        console.error('Erreur lors du chargement des biens', error);
      });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.bien.imagePath = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.bien.titre || !this.bien.description || !this.bien.prix || !this.bien.type || !this.bien.type_annonce ) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.bien.titre);
    formData.append('description', this.bien.description);
    formData.append('prix', this.bien.prix.toString());
    formData.append('disponible', this.bien.disponible ? '1' : '0');
    formData.append('type', this.bien.type);
    formData.append('type_annonce', this.bien.type_annonce);


    if (this.selectedFile) {
      formData.append('imagePath', this.selectedFile, this.selectedFile.name);
    }

    console.log('FormData:', {
      titre: this.bien.titre,
      description: this.bien.description,
      prix: this.bien.prix,
      disponible: this.bien.disponible,
      type: this.bien.type,
      type_annonce: this.bien.type_annonce,

      imagePath: this.selectedFile ? this.selectedFile.name : 'Aucune image',
    });

    const request = this.bien.id
      ? this.biensService.updateBien(this.bien.id, formData)
      : this.biensService.createBien(formData);

    request.subscribe(
      () => {
        this.loadBiens();
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de la soumission du bien', error);
        if (error.error && error.error.errors) {
          let errorMessage = 'Erreur lors de la soumission du bien : ';
          for (const key in error.error.errors) {
            errorMessage += `${key}: ${error.error.errors[key].join(', ')}; `;
          }
          alert(errorMessage);
        } else {
          alert('Une erreur inconnue est survenue.');
        }
      }
    );
  }

  editBien(bien: Bien): void {
    this.router.navigate(['/edit-bien', bien.id]);
  }

  deleteBien(id?: number): void {
    if (id !== undefined) {
      this.biensService.deleteBien(id).subscribe(
        () => {
          this.loadBiens();
        },
        (error) => {
          console.error('Erreur lors de la suppression du bien', error);
          alert('Une erreur est survenue lors de la suppression du bien. Veuillez réessayer.');
        }
      );
    } else {
      console.error("ID est undefined. Impossible de supprimer le bien.");
      alert("Erreur : l'identifiant du bien est manquant.");
    }
  }
  resetForm(): void {
    this.bien = {id:0, titre: '', description: '', prix: 0, disponible: true, type: '', imagePath: '', type_annonce: '' };
    this.selectedFile = null;
  }


}
