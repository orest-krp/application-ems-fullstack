import {
  LoginUser,
  LogOutResponse,
  RegisterUser,
  TokensResponse,
} from '@ems-fullstack/utils';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto implements LoginUser {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterUserDto implements RegisterUser {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class TokensResponseDto implements TokensResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class LogOutResponseDto implements LogOutResponse {
  @ApiProperty()
  message: string;
}
