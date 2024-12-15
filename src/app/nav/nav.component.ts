import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;
  isScrolled: boolean = false;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 100;
  }

  checkAuthentication() {
    this.isAuthenticated = !!localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');

    this.isAuthenticated = false;

    this.router.navigate(['/']);
  }
}
