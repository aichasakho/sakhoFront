import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private notyf: Notyf;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.notyf = new Notyf();
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom_complet: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('password_confirmation')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { nom_complet, email, password, password_confirmation } = this.registerForm.value;

      this.authService.register(nom_complet, email, password, password_confirmation).subscribe(
        (response) => {
          console.log('Inscription réussie:', response);
          this.notyf.success('Inscription réussie !');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          const errorMessage = error.error.message || 'Une erreur est survenue';
          this.notyf.error(errorMessage);
        }
      );
    }
  }
}
