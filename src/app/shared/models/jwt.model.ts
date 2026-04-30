export interface TokenInfo {
  token: string;
}

export interface JwtPayload {
  sub: string;        
  email: string;
  role: string;
  exp: number;
  token: string;        
}