import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from "../services/auth-service.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;
  isScrolled: boolean = false;
  dropdownOpen: boolean = false;
  activeLink: string = '';
  user: any;
  constructor(public router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
  
    });

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 100;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.isAuthenticated = false;
      this.router.navigate(['/']);
    });
  }

  isActiveLink(link: string): boolean {
    return this.activeLink === link;
  }
}
