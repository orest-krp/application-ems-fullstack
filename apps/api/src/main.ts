import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('port');
  const frontendUrl = configService.getOrThrow<string>('frontendUrl');

  const config = new DocumentBuilder()
    .setTitle('Event Management API')
    .setDescription('EMS API')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('refreshToken')
    .addCookieAuth('accessToken')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      withCredentials: true,
    },
  });

  app.enableCors({ origin: frontendUrl, credentials: true });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());
  await app.listen(port);
}
void bootstrap();
