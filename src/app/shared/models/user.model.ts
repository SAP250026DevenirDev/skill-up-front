export interface UserLogin {
  email: string;
  hashedPassword: string;
}
export interface UserRegister {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
export interface PasswordRequestUpdateDto {
  currentPassword: string;
  newPassword: string;
}

