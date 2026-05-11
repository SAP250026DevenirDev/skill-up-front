import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuardGuard } from './core/guards/auth-guard';
import { Profil } from './shared/accueil/profil/profil';
import { Register } from './features/auth/register/register';
import { UserListComponent } from './features/admin/user-list/user-list.component';
import { UsersManagerComponent } from './features/admin/users-manager/users-manager.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'profil', component: Profil, canActivate: [authGuardGuard] },
    {
      path: 'users-manager',
      component: UsersManagerComponent,
      children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: UserListComponent },
        { path: 'register', component: Register },
      ]
    }   
];
