import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isCliForm: boolean = false; // Détermine si le formulaire est pour un client ou utilisateur
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom_complet: ['', Validators.required], // Obligatoire seulement pour les clients
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmed_password: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmed_password')?.value ? null : { mismatch: true };
  }

  toggleAccountType(): void {
    this.isCliForm = !this.isCliForm;
    if (!this.isCliForm) {
      this.registerForm.get('nom_complet')?.clearValidators();
      this.registerForm.get('nom_complet')?.updateValueAndValidity();
    } else {
      this.registerForm.get('nom_complet')?.setValidators([Validators.required]);
      this.registerForm.get('nom_complet')?.updateValueAndValidity();
    }
  }

  // La méthode manquante
  onSubmit(): void {
    if (this.registerForm.valid) {
      const { nom_complet, email, password, confirmed_password } = this.registerForm.value;

      // Appel au service avec les arguments requis
      this.authService.register(nom_complet, email, password, confirmed_password).subscribe(
        (response) => {
          console.log('Inscription réussie:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          this.errorMessage = error.error.message || 'Une erreur est survenue';
        }
      );
    }
  }

}
