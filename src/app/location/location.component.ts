import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Bien } from '../models/bien.model';
import { BiensService } from '../services/bien.service';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
 biens: Bien[] = [];
  biensToShow: Bien[] = [];
  itemsPerPage: number = 8;
  currentPage: number = 1;
  user: any;  isAuthenticated: boolean = false;


  constructor(
    private biensService: BiensService,
    private authService : AuthService,

  ) {}

  ngOnInit(): void {
    this.loadBiens();
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
  
    });
    this.user = this.authService.getUser();

  }

  loadBiens(): void {
    this.biensService.getLocation().subscribe(
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

  delete(id:any){
    console.log(id)
    Swal.fire({
      title: "Etes vous Sure?",
      text: "vous aller supprimer cet article!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "oui , supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.biensService.deleteBien(id).subscribe(
          ()=>{
           
            this.loadBiens();
          },
          ()=>{
    
          }
        )
        Swal.fire({
          
          title: "Supprimer !",
          text: "l'article a été supprimer",
          icon: "success"
        });
      }
    });
    
  }
}
