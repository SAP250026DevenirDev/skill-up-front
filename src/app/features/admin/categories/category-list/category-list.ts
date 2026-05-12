import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit {
  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      console.log(data)
      this.categories = data;
    });
  }

  goToUpdate(id: string): void {
    this.router.navigate(['/skills-manager/categories/update', id]);
  }

  goToAdd(): void {
  this.router.navigate(['/skills-manager/categories/add']);
  } 
}
