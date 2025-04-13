import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private notyf: Notyf;
  private readonly SECRET_CODE = "0987654321234567890"; 

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.notyf = new Notyf();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      nom_complet: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(form: FormGroup): {[key: string]: boolean} | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.notyf.error('Veuillez remplir correctement tous les champs');
      return;
    }

    const enteredCode = this.registerForm.get('code')?.value;
    
    if (enteredCode !== this.SECRET_CODE) {
      Swal.fire({
        title: "Permission refusée",
        text: "code d'autorisation invalide",
        icon: "error",
        confirmButtonText: 'OK'
      });
      return;
    }

    const { nom_complet, email, password, password_confirmation } = this.registerForm.value;

    this.authService.register(nom_complet, email, password, password_confirmation).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);
        this.notyf.success('Inscription réussie !');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        const errorMessage = error.error?.message || 'Une erreur est survenue lors de l\'inscription';
        this.notyf.error(errorMessage);
        
        if (error.status === 409) { 
          Swal.fire({
            title: "Email déjà utilisé",
            text: "L'adresse email est déjà associée à un compte",
            icon: "warning"
          });
        }
      }
    });
  }
}