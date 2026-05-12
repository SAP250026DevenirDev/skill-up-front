import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./category-list/category-list')
      .then(c => c.CategoryList)
  },
  {
    path: 'update/:id',
    loadComponent: () => import('./update-category/update-category')
      .then(c => c.UpdateCategory)
  },
  {
    path: 'add',
    loadComponent: () => import('./add-category/add-category')
      .then(c => c.AddCategory)
  }
];