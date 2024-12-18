<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, HostListener } from '@angular/core';
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
<<<<<<< HEAD
  title = 'sakho_immoFront';
=======

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event:Event) {
    const navbar = document.querySelector('app-nav') as HTMLElement;
    if (window.pageYOffset > 10) {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      navbar.style.transition = 'background-color 0.3s ease';
    } else {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
  }
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a
}
