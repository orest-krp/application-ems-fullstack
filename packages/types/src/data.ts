export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface FetchError {
  statusCode: number;
  error: string;
  message: string[] | string;
}

export interface AuthReq {
  user: AuthUser;
}

export enum EventVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export enum EventStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}
