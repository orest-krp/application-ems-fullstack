import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { getCookie } from 'src/utils/helpers';
import { AuthUser } from '@ems-fullstack/types';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        return getCookie(req, 'refreshToken');
      },
      secretOrKey: config.getOrThrow<string>('jwt.refreshSecret'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthUser) {
    return await this.authService.validateJwtUser(payload.id);
  }
}
