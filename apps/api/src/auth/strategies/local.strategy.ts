import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthUser } from '@ems-fullstack/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    return await this.authService.validateLocalUser(email, password);
  }
}
