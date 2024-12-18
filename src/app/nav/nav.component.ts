import { Component, OnInit, HostListener } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
import {NavigationEnd, Router} from '@angular/router';
import { AuthService } from "../services/auth-service.service";
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;
  isScrolled: boolean = false;
<<<<<<< HEAD

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication();
=======
  dropdownOpen: boolean = false;
  activeLink: string = '';

  constructor(public router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 100;
  }

<<<<<<< HEAD
  checkAuthentication() {
    this.isAuthenticated = !!localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');

    this.isAuthenticated = false;

    this.router.navigate(['/']);
=======
  logout() {
    this.authService.logout().subscribe(() => {
      this.isAuthenticated = false;
      this.router.navigate(['/']);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.isScrolled = window.scrollY > 50;
  }

  isActiveLink(link: string): boolean {
    return this.activeLink === link;
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a
  }
}
