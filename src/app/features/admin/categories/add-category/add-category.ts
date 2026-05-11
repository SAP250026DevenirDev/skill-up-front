import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory {
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.categoryService.add(this.addForm.value).subscribe({
        next: () => this.router.navigate(['/skills-manager/categories']),
        error: (err) => console.error(err)
      });
    }
  }
  onCancel(): void {
  this.router.navigate(['/skills-manager/categories']);
}
}