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
