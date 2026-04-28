import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  userRole: string = '';

  ngOnInit(): void {
    // sera connecté au AuthService quand US06 sera terminée
    this.userRole = 'Collaborator'; // temporaire
  }

  logout(): void {
    // sera connecté au AuthService quand US06 sera terminée
  }
}