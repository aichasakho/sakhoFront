import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
}
