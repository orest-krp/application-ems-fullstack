export interface LoginUser {
  email: string;
  password: string;
}
export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthReq {
  user: AuthUser;
}

export interface OptionalAuthReq {
  user: AuthUser | null;
}

export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogOutResponse {
  message: string;
}
