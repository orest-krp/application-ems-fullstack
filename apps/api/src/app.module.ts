import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation.shema';
import base from './config/base';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EventModule,
    ConfigModule.forRoot({
      load: [base],
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
      isGlobal: true,
    }),
  ],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
