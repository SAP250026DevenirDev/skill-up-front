import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'update/:id',
    loadComponent: () => import('./update-category/update-category')
      .then(c => c.UpdateCategory)
  }
];