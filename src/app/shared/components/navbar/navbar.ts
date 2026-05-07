import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  user = this.authService.connectedUser;
  //userRole = signal<string>('');

  ngOnInit(): void {
    // sera connecté au AuthService quand US06 sera terminée
    //this.userRole = 'Collaborator'; // temporaire
    console.log(this.user()?.role)
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}