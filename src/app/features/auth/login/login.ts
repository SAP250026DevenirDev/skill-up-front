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
  isLoading = signal<boolean>(false);


  form = this.fb.group({
    email: ['', [Validators.required, emailValidators()]],
    hashedPassword: ['', [Validators.required, Validators.minLength(4)]]
  });

  onSubmit(): void {

  if (this.form.invalid) return;

  this.isLoading.set(true);
  this.errorMessage.set(null);

  this.authService.login(this.form.value as UserLogin)
    .subscribe({
      next: () => {
        this.isLoading.set(false);

        if (!this.authService.isActive()) {
          this.authService.logout();
          this.errorMessage.set('Votre compte est désactivé, contactez un administrateur');//Affiche un message d'erreur si le compte n'est pas actif
          return;
        }

        if (!this.authService.isPasswordChanged()) {
          this.router.navigate(['']); //Redirige vers la page de changement de mot de passe
          return;
        }

        this.router.navigate(['/profil']);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 401) {
          this.errorMessage.set('Email ou mot de passe incorrect');
        } else {
          this.errorMessage.set('Une erreur est survenue, réessayez plus tard');
        }
      }
    });
}
}

