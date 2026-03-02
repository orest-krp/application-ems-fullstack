import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JWTProviders } from 'src/constants';
import { AuthUser, CreateUserDto, User } from '@ems-fullstack/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(JWTProviders.ACCESS) private readonly accessJwt: JwtService,
    @Inject(JWTProviders.REFRESH) private readonly refreshJwt: JwtService,
  ) {}

  async register(newUser: CreateUserDto): Promise<User> {
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
