import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  userRole: string = '';
  firstName: string = '';
  lastName: string = '';

  ngOnInit(): void {
    this.userRole = ''
    this.firstName = ''; 
    this.lastName = ''
  }
}
