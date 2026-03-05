import { CreateEventDto } from '@ems-fullstack/utils';
import { Injectable } from '@nestjs/common';
import { EventVisibility } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}
  async createEvent(event: CreateEventDto, userId: string) {
    return await this.prismaService.event.create({
      data: { ...event, organizerId: userId },
    });
  }

  async getAllPublic() {
    return await this.prismaService.event.findMany({
      where: { visibility: EventVisibility.PUBLIC },
    });
  }
}
