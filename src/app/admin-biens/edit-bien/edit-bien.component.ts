import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiensService } from '../../services/bien.service';
import { Bien } from '../../models/bien.model';

@Component({
  selector: 'app-edit-bien',
  templateUrl: './edit-bien.component.html',
  styleUrls: ['./edit-bien.component.css']
})
export class EditBienComponent implements OnInit {
  bien: any;
  selectedFile: File | null = null;
  constructor(private route: ActivatedRoute, private bienService: BiensService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bienService. getBien(id).subscribe(data => {
      this.bien = data;
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('titre', this.bien.titre);
    formData.append('description', this.bien.description); // Ajoutez ce champ
    formData.append('prix', this.bien.prix.toString());
    formData.append('superficie', this.bien.superficie ? this.bien.superficie.toString() : ''); // Ajoutez une vérification
    formData.append('nombre_chambres', this.bien.nombre_chambres ? this.bien.nombre_chambres.toString() : ''); // Idem
    formData.append('nombre_douches', this.bien.nombre_douches ? this.bien.nombre_douches.toString() : ''); // Idem
    formData.append('disponible', this.bien.disponible.toString());

    if (this.selectedFile) {
      formData.append('imagePath', this.selectedFile);
    }

    this.bienService.updateBien(this.bien.id, formData).subscribe(() => {
      console.log('Bien mis à jour avec succès');
    }, error => {
      console.error('Erreur lors de la mise à jour du bien', error);
      if (error.error.errors) {
        alert('Erreurs de validation : ' + JSON.stringify(error.error.errors));
      } else {
        alert(`Erreur: ${error.message}`);
      }
    });
  }

}
