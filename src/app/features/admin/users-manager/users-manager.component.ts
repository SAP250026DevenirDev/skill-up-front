import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-manager',
  imports: [RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './users-manager.component.html',
  styleUrl: './users-manager.component.css',
})
export class UsersManagerComponent {

}
