import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
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
    }
  }
}
