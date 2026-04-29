import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  imports: [ReactiveFormsModule],
  templateUrl: './update-category.html',
  styleUrl: './update-category.css'
})
export class UpdateCategory implements OnInit {
  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    // sera connecté à l'API
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      // sera connecté à l'API
    }
  }
}