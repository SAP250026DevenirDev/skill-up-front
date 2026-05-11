import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { passwordMatcherValidator } from '../../../shared/validators/passwordMatcher-validator'

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  private readonly _authService = inject(AuthService)
  private readonly _router: Router = inject(Router)
  private readonly fb = inject(FormBuilder);

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  readonly passwordChangeForm = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(4)]],
    newPassword: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required]]
  }, { 
    validators: [passwordMatcherValidator]
  });

  onSubmit() {
    const user = this._authService.connectedUser();

    if (user && user.sub && this.passwordChangeForm.valid ){
      this.isSubmitting.set(true);

      const userId = user.sub;
      const { currentPassword, newPassword } = this.passwordChangeForm.getRawValue();

      this._authService.passwordChange(userId, {currentPassword: currentPassword!, newPassword: newPassword!}).subscribe({
          next: () => {
        this._authService.isPasswordChanged.set(true);
        this._router.navigate(['/profil']);
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.errorMessage.set("Le mot de passe actuel est incorrect.");
        this.isSubmitting.set(false);
        }
      });
    }
  }
}
