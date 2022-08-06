export interface LoginRequest {
  user: user;
}

interface user {
  email: string;
  password: string;
}
