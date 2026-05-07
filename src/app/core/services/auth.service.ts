import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLogin } from '../../shared/models/user.model';
import { JwtPayload, TokenInfo } from '../../shared/models/jwt.model';
import { jwtDecode } from 'jwt-decode';
import { environment } from '@env/environment';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storage: StorageService = inject(StorageService);

  constructor() {
  this.connectedUser.set(this.storage.getLocal<JwtPayload>('payload') ?? null); //Vérifie si un utilisateur était déjà connecté
}

  connectedUser = signal<JwtPayload | null>(null);//Signal qui contient l'utilisateur connecté.
  isActive = signal<boolean>(false);           
  isPasswordChanged = signal<boolean>(false);


  login(credentials: UserLogin): Observable<TokenInfo> {
  return this.http.post<TokenInfo>(`${environment.apiUrl}/auth/login`, credentials)
  .pipe(
    tap((tokenInfo: TokenInfo) => this.decodeToken(tokenInfo))
  );
}

private decodeToken(token: TokenInfo): void {
  const claims = jwtDecode<JwtPayload>(token.token);//Décode le token JWT 
  
  const payload: JwtPayload = {
    sub: claims.sub,
    email: claims.email,
    role: claims.role,
    exp: claims.exp,
    token: token.token,
  };

  this.connectedUser.set(payload);
  this.isActive.set(token.isActive);
  this.isPasswordChanged.set(token.isPasswordChanged);

  this.storage.setLocal<string>('token', token.token);
  this.storage.setLocal<JwtPayload>('payload', payload);//Sauvegarde le token et le payload 
  }

  logout(): void {
    this.connectedUser.set(null);
    this.storage.removeLocal('token');   
    this.storage.removeLocal('payload');
  }

  isLoggedIn(): boolean {
    return this.connectedUser() !== null; // true si quelqu'un est connecté
  }

}
