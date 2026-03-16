import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation.shema';
import base from './config/base';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { AIModule } from './ai/ai.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EventsModule,
    AIModule,
    ConfigModule.forRoot({
      load: [base],
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
