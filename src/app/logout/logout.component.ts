import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

<<<<<<< HEAD
  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur de déconnexion', error);
      }
    );
  }
=======
  // constructor(private authService: AuthService, private router: Router) {}
  //
  // onLogout(): void {
  //   this.authService.logout().subscribe(
  //     (response: any) => {
  //       console.log('Déconnexion réussie', response);
  //       localStorage.removeItem('token');
  //       this.router.navigate(['/']);
  //     },
  //     (error: any) => {
  //       console.error('Erreur lors de la déconnexion', error);
  //     }
  //   );
  // }
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a
}
