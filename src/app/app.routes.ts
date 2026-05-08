import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuardGuard } from './core/guards/auth-guard';
import { Profil } from './shared/accueil/profil/profil';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: 'login', component: Login },
    { path: 'profil', component: Profil, canActivate: [authGuardGuard] },
    { path: 'register', component: Register}
];
