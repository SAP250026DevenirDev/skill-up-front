import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  private readonly adminService = inject(AdminService);

  // État du composant
  users = signal<any[]>([]); // On stockera les utilisateurs ici
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
   this.isLoading.set(true);
    this.adminService.getUsers().subscribe({
      next: (data) => {
        console.log(data)
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  onDisable(userId: string): void {
    if (confirm('Voulez-vous vraiment désactiver cet utilisateur ?')) {
      this.isLoading.set(true);

      this.adminService.disableUser(userId).subscribe({
        next: () => {
          // Mise à jour réactive du Signal
          this.users.update(all => 
            all.map(u => u.id === userId ? { ...u, isActive: false } : u)
          );
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.isLoading.set(false);
          alert('Erreur lors de la désactivation.');
        }
      });
    }
  }
}