export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SUPERADMIN = 'SUPERADMIN',
  }
  
  export interface User {
    id: number;
    email: string;
    role: UserRole;
  }
  
  