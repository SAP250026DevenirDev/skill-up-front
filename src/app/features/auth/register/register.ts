import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { emailValidators } from '../../../shared/validators/email-validator';
import { UserRegister } from '../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly _authService = inject(AuthService)
  private readonly _router: Router = inject(Router)

  registerForm: FormGroup;
  formInvalid = false;

  constructor(private fb: FormBuilder){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.max(250), emailValidators()]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required,  Validators.min(2), Validators.max(50)]],
      role: ['', [Validators.required]]
    });
  }

  OnSubmit(): void{
    if (this.registerForm.valid){
      const register : UserRegister = {
        email: this.registerForm.value.email,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        role: this.registerForm.value.role
      }

      this._authService.signup(register).subscribe({
        next: () => {
          alert('Register réussis');
        },
        error: () => {
          this.formInvalid = true;
        }
      })
    }
    else{
      this.formInvalid = true;
    }
  }

}
