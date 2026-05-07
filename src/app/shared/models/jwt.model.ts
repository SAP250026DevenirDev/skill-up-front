export interface TokenInfo {
  token: string;
  isPasswordChanged: boolean;
  isActive: boolean; 
}

export interface JwtPayload {
  sub: string;        
  email: string;
  role: string;
  exp: number;
  token: string;        
}