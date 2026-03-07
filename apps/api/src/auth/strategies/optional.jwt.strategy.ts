import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { getCookie } from 'src/utils/helpers';
import { AuthUser } from '@ems-fullstack/utils';
import { AuthService } from '../auth.service';

@Injectable()
export class OptionalJwtStrategy extends PassportStrategy(
  Strategy,
  'optional-jwt',
) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.getOrThrow<string>('jwt.accessSecret'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => getCookie(req, 'accessToken'),
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AuthUser) {
    if (payload) {
      return await this.authService.validateJwtUser(payload.id);
    }
    return null;
  }
}
