import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from '@ems-fullstack/utils';
import { RegisterUserDto } from 'src/utils/dto/auth.dto';
import { JWTProviders } from 'src/utils/types/jwt';
import { UsersService } from 'src/users/users.service';
import { UserResponseDto } from 'src/utils/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @Inject(JWTProviders.ACCESS) private readonly accessJwt: JwtService,
    @Inject(JWTProviders.REFRESH) private readonly refreshJwt: JwtService,
  ) {}

  async register(newUser: RegisterUserDto): Promise<UserResponseDto> {
    return await this.userService.create(newUser);
  }

  async generateTokens(userId: string, email: string) {
    const payload = { id: userId, email };

    const accessToken = await this.accessJwt.signAsync(payload);
    const refreshToken = await this.refreshJwt.signAsync(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateLocalUser(email: string, password: string): Promise<AuthUser> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Bad credentials');
    }

    const isPasswordMatched = await argon2.verify(user.password, password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Bad credentials');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async validateJwtUser(id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new UnauthorizedException('Bad credentials');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}
