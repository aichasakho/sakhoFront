import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
=======
import { Notyf } from 'notyf';
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';
<<<<<<< HEAD

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }
=======
  isLoading: boolean = false;
  private notyf: Notyf;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.notyf = new Notyf();
  }
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
<<<<<<< HEAD
      const loginData = this.loginForm.value;
      this.authService.login(loginData.email, loginData.password)
        .subscribe(
          (response) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            this.errorMessage = error.error.message || 'Identifiants incorrects';
          }
        );
=======
      this.isLoading = true;
      const loginData = this.loginForm.value;
      this.authService.login(loginData.email, loginData.password).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.isLoading = false;
          this.router.navigate(['/']);

          setTimeout(() => {
            this.isLoading = false;
            this.notyf.success('Connexion réussie !');
          }, 2000);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.error.message || 'Identifiants incorrects';
          this.notyf.error('Identifiants incorrects !');
        }
      );
>>>>>>> d83c29b5f98a106ed5257b197daa479c0d9e830a
    }
  }
}
