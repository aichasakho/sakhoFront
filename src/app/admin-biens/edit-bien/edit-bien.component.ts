import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiensService } from '../../services/bien.service';
import { Bien } from '../../models/bien.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-bien',
  templateUrl: './edit-bien.component.html',
  styleUrls: ['./edit-bien.component.css']
})
export class EditBienComponent implements OnInit {

    idBien!:any
    biens: Bien[] = [];
  veriForm = false;
  bienForm = this.formBuilder.group({
    id :[''],
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
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private bienService: BiensService,

    ) {}

    ngOnInit(): void {
      // Récupérer le paramètre 'id' depuis l'URL
      this.route.paramMap.subscribe(params => {
        this.idBien = params.get('id');
        this.bienService.getBienById(this.idBien).subscribe(
          (data)=>{
            console.log(data)
            this.bienForm.get("titre")?.setValue(""+data.titre)
            this.bienForm.get("description")?.setValue(""+data.description)
            this.bienForm.get("prix")?.setValue(""+data.prix)
            this.bienForm.get("type")?.setValue(""+data.type)
            this.bienForm.get("type_annonce")?.setValue(""+data.type_annonce)
            this.bienForm.get("nombre_chambres")?.setValue(""+data.nombre_chambres)
            this.bienForm.get("nombre_douches")?.setValue(""+data.nombre_douches)
            this.bienForm.get("superficie")?.setValue(""+data.superficie)
          },
          (Error)=>{

          }
        )
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

    modifiBien() {
      this.veriForm = true;
      if (this.bienForm.invalid) {
        return;
      } else {
           const formData = new FormData();

           formData.append('id', this.idBien);
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

           for (const pair of (formData as any).entries()) {
              console.log(pair[0] + ': ' + pair[1]);
            }
           this.bienService.updateBien(formData).subscribe(
            (data) => {
               console.log(data);
               Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Modifié  avec success",
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
