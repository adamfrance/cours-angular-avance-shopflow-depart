export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role?: 'admin' | 'moderator' | 'user';
}

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}
