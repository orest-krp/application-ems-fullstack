import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config.ts/env.validation.shema';
import base from './config.ts/base';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
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
