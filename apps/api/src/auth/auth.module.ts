import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { OptionalJwtStrategy } from './strategies/optional.jwt.strategy';
import { JWTProviders } from 'src/utils/types/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    LocalStrategy,
    OptionalJwtStrategy,
    RefreshStrategy,
    JwtStrategy,
    {
      provide: JWTProviders.ACCESS,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new JwtService({
          secret: config.get('jwt.accessSecret'),
          signOptions: {
            expiresIn: config.get('jwt.accessExpirationTime'),
          },
        }),
    },
    {
      provide: JWTProviders.REFRESH,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new JwtService({
          secret: config.get('jwt.refreshSecret'),
          signOptions: {
            expiresIn: config.get('jwt.refreshExpirationTime'),
          },
        }),
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
