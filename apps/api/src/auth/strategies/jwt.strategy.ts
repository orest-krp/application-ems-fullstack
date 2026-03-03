import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { getCookie } from 'src/utils/helpers';
import { AuthUser } from '@ems-fullstack/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.getOrThrow<string>('jwt.accessSecret'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          return getCookie(req, 'accessToken');
        },
      ]),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthUser) {
    return await this.authService.validateJwtUser(payload.id);
  }
}
