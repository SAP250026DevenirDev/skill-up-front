import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-update-category',
  imports: [ReactiveFormsModule],
  templateUrl: './update-category.html',
  styleUrl: './update-category.css'
})
export class UpdateCategory implements OnInit {
  updateForm: FormGroup;
  categoryId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.categoryService.getById(this.categoryId).subscribe(category => {
      this.updateForm.patchValue({
        name: category.name,
        description: category.description
      });
    });
  }

  onSubmit(): void {
   if (this.updateForm.valid) {
    this.categoryService.update(this.categoryId, this.updateForm.value).subscribe(() => {
      this.router.navigate(['/skills-manager']);
    });
    } 
  }

  onCancel(): void {
  this.router.navigate(['/skills-manager/categories']);
}
}