import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatcherValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return newPassword && confirmPassword && newPassword !== confirmPassword 
    ? { passwordMismatch: true } 
    : null;
};