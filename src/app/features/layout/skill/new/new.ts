import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SkillService } from '../../../../core/services/skill';

@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class New {

  newSkillForm: FormGroup;

  categoryList = [
    { id: 0, cat: 'Backend'},
    { id: 1, cat: 'Frontend'},
    { id: 2, cat: 'DevOps'},
    { id: 3, cat: 'Security'},
    { id: 4, cat: 'Soft Skills'}
  ]

  constructor(
    private fb: FormBuilder,
    private skillService: SkillService){
      this.newSkillForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        category: ['', Validators.required],
      })
    }
  
  

  onSubmitNewSkill() {
    console.log('Form values : >> ', this.newSkillForm.value);
    if(this.newSkillForm.valid){
      this.skillService.creerSkill(this.newSkillForm.value).subscribe({
        next: (response) => {
          console.log('Succès:', response);

          this.newSkillForm.reset();
        },
        error: (error) => {
          console.error('Erreur: ', error);
        }
      })
    }
  }
}
