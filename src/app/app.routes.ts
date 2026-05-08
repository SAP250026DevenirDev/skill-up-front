import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuardGuard } from './core/guards/auth-guard';
import { Profil } from './shared/accueil/profil/profil';

export const routes: Routes = [
<<<<<<< HEAD
<<<<<<< HEAD
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: 'login', component: Login },
    { path: 'profil', component: Profil, canActivate: [authGuardGuard] },
=======
=======
>>>>>>> 1eb4e326692a50823c4b1032bd34965e6233bf66
    {
        path: 'newSkill',
        title: 'Création d\'un skill',

        loadComponent: () => import("./features/layout/skill/new/new")
            .then(s => s.New)
    }
<<<<<<< HEAD
>>>>>>> 1eb4e32 (intial commit)
=======
>>>>>>> 1eb4e326692a50823c4b1032bd34965e6233bf66
];
