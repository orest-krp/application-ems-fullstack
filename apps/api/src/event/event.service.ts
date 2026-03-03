import { CreateEventDto } from '@ems-fullstack/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}
  async createEvent(event: CreateEventDto, userId: string) {
    return await this.prismaService.event.create({
      data: { ...event, organizerId: userId },
    });
  }

  async getAll() {
    return await this.prismaService.event.findMany();
  }
}
