import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserLogin } from '../../../shared/models/user.model';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidators } from '../../../shared/validators/email-validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
private readonly authService = inject(AuthService);
private readonly router = inject(Router);
private readonly fb = inject(FormBuilder);

  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, emailValidators()]],
    hashedPassword: ['', [Validators.required, Validators.minLength(4)]]
  });

  onSubmit(): void {
    //if (this.form.invalid) return;

    //this.authService.login(this.form.value as UserLogin)
     // .subscribe({
        //next: () => this.router.navigate(['']),
        //error: () => this.errorMessage.set('Email ou mot de passe incorrect')
      //});
  console.log('formulaire valide ?', this.form.valid);
  console.log('valeurs :', this.form.value);
  
  if (this.form.invalid) return;

  this.authService.login(this.form.value as UserLogin)
    .subscribe({
      next: (response) => {
        console.log('réponse API :', response);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log('erreur :', err);
        this.errorMessage.set('Email ou mot de passe incorrect');
      }
    });
  }
}

