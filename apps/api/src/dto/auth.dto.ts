import {
  LoginUser,
  LogOutResponse,
  RegisterUser,
  TokensResponse,
} from '@ems-fullstack/utils';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto implements LoginUser {
  @ApiProperty({ example: 'john.doe@example.com' })
  email!: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!' })
  password!: string;
}

export class RegisterUserDto implements RegisterUser {
  @ApiProperty({ example: 'John Doe' })
  name!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email!: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!' })
  password!: string;
}

export class TokensResponseDto implements TokensResponse {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken!: string;

  @ApiProperty({ example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg==' })
  refreshToken!: string;
}

export class LogOutResponseDto implements LogOutResponse {
  @ApiProperty({ example: 'Successfully logged out' })
  message!: string;
}
