import { loginUserSchema, registerUserShema } from "../shemas/auth.js";
import yup from "yup";

export type LoginUserDTO = yup.InferType<typeof loginUserSchema>;
export type RegisterUserDto = yup.InferType<typeof registerUserShema>;

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

export interface TokensResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface LogOutResponseDto {
  message: string;
}
