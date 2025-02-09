import { Component, OnInit } from '@angular/core';
import { BiensService } from '../services/bien.service';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Bien } from '../models/bien.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-biens',
  templateUrl: './admin-biens.component.html',
  styleUrls: ['./admin-biens.component.css']
})
export class AdminBiensComponent implements OnInit {
  biens: Bien[] = [];
  veriForm = false;
  bienForm = this.formBuilder.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
    prix: ['', Validators.required],
    imagePath: [null],
    disponible: ['1'],
    type: ['', Validators.required],
    type_annonce: ['', Validators.required],
    nombre_chambres: ['', Validators.required],
    nombre_douches: ['', Validators.required],
    superficie: ['', Validators.required],
  });

  constructor(
    private biensService: BiensService,
     private router: Router,
     private formBuilder: FormBuilder,
    ) {}

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
 
 
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bienForm.patchValue({
        imagePath: file
      });
    }
  }

  addBien() {
    this.veriForm = true;
    if (this.bienForm.invalid) {
      return;
    } else {
      const formData = new FormData();
      formData.append('titre', this.bienForm.get('titre')?.value || '');
      formData.append('description', this.bienForm.get('description')?.value || '');
      formData.append('prix', this.bienForm.get('prix')?.value || '');
      formData.append('imagePath', this.bienForm.get('imagePath')?.value || '');
      formData.append('disponible', this.bienForm.get('disponible')?.value || '1');
      formData.append('type', this.bienForm.get('type')?.value || '');
      formData.append('type_annonce', this.bienForm.get('type_annonce')?.value || '');
      formData.append('nombre_chambres', this.bienForm.get('nombre_chambres')?.value || '');
      formData.append('nombre_douches', this.bienForm.get('nombre_douches')?.value || '');
      formData.append('superficie', this.bienForm.get('superficie')?.value || '');

      this.biensService.createBien(formData).subscribe(
        (data) => {
          
          console.log(data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Ajout avec success",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['biens']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
