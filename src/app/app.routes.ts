import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'newSkill',
        title: 'Création d\'un skill',

        loadComponent: () => import("./features/layout/skill/new/new")
            .then(s => s.New)
    }
];
