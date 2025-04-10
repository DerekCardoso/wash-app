export interface AppUser {
  id: string;
  email: string;
  name: string;
  userType: 'customer' | 'owner';
} 