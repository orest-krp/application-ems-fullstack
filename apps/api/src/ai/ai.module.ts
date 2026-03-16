import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';

@Module({
  providers: [AIService, PrismaService],
  controllers: [AIController],
})
export class AIModule {}
