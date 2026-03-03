export interface AuthUser {
  id: string;
  email: string;
}

export interface FetchError {
  statusCode: number;
  error: string;
  messages: string[];
}

export interface AuthReq {
  user: AuthUser;
}
