import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-contact-button',
  templateUrl: './contact-button.component.html',
  styleUrls: ['./contact-button.component.css']
})
export class ContactButtonComponent {
  showForm = false; // Contrôle l'affichage du formulaire

  toggleForm() {
    this.showForm = !this.showForm;
  }

 contactForm!: FormGroup;
   private notyf: Notyf;
   isLoading = false;
 
   constructor(private fb: FormBuilder, private contactService: ContactService) {
     this.notyf = new Notyf();
   }
 
   ngOnInit(): void {
     this.contactForm = this.fb.group({
       name: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       message: ['', Validators.required]
     });
   }
 
 
   onSubmitContact(): void {
     if (this.contactForm.valid) {
 
       this.isLoading = true;
       const {name, email, message} = this.contactForm.value;
 
       this.contactService.sendMessage(name, email, message).subscribe(
         (response) => {
           console.log('Message envoyé avec succès:', response);
           this.notyf.success('Votre message a été envoyé avec succès !');
           this.contactForm.reset();
           this.isLoading = false;
         },
         (error) => {
           console.error('Erreur lors de l\'envoi du message:', error);
           const errorMessage = error.error.message || 'Une erreur est survenue';
           this.notyf.error(errorMessage);
           this.isLoading = false;
         }
       );
     } else {
       this.notyf.error('Veuillez remplir tous les champs requis.');
 
 
     }
 
 
   }
}