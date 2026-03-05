import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthUser, loginUserSchema } from '@ems-fullstack/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    loginUserSchema.validateSync({ email, password });
    return await this.authService.validateLocalUser(email, password);
  }
}
