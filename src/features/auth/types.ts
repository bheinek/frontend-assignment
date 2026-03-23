export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  id: string;
  username: string;
  createdAt: string;
}
