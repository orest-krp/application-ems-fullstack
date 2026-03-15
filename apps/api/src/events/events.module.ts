import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EventsDetailsService } from './events-details.service';
import { JWTProviders } from 'src/utils/types/jwt';

@Module({
  imports: [],
  providers: [
    EventsService,
    EventsDetailsService,
    PrismaService,
    {
      provide: JWTProviders.EVENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new JwtService({
          secret: config.getOrThrow('jwt.invitationToken'),
        }),
    },
  ],
  controllers: [EventsController],
})
export class EventsModule {}
