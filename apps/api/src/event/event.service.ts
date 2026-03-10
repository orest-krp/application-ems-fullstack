import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventVisibility } from 'generated/prisma/enums';
import { EventRequestDto } from 'src/dto/event.dto';
import { PrismaService } from 'src/prisma.service';
import { JWTProviders } from 'src/utils/constants';

@Injectable()
export class EventService {
  constructor(
    private prismaService: PrismaService,
    @Inject(JWTProviders.EVENT) private readonly accessEventJwt: JwtService,
  ) {}
  async createEvent(event: EventRequestDto, organizerId: string) {
    return await this.prismaService.event.create({
      data: {
        ...event,
        organizerId: organizerId,
        participants: { create: { userId: organizerId } },
      },
    });
  }

  async joinEvent(eventId: string, userId: string, token?: string) {
    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: {
        participants: true,
      },
    });

    if (!event) {
      throw new NotFoundException('Event is not found');
    }

    const alreadyJoined = event.participants.some((p) => p.userId === userId);

    if (alreadyJoined) {
      throw new ForbiddenException('User already joined this event');
    }

    if (event.capacity && event.participants.length >= event.capacity) {
      throw new ForbiddenException('Event is full');
    }

    if (event.visibility === EventVisibility.PRIVATE) {
      if (!token) {
        throw new UnauthorizedException('Invitation token is required');
      }

      const eventIdFromToken = await this.getEventToken(token);

      if (eventIdFromToken !== eventId) {
        throw new UnauthorizedException('Invitation is not valid');
      }
    }

    return this.prismaService.participant.create({
      data: {
        userId,
        eventId,
      },
      include: {
        user: {
          omit: { password: true, updatedAt: true },
        },
      },
    });
  }

  async leaveEvent(eventId: string, userId: string) {
    const existingEvent = await this.prismaService.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      throw new NotFoundException('Event is not found');
    }

    if (existingEvent.organizerId === userId) {
      throw new ForbiddenException('Organizer cannot leave their own event');
    }

    const participant = await this.prismaService.participant.findFirst({
      where: {
        userId,
        eventId,
      },
    });

    if (!participant) {
      throw new NotFoundException('User is not a participant of this event');
    }

    return this.prismaService.participant.delete({
      where: {
        id: participant.id,
      },
    });
  }

  async getEventToken(token: string) {
    const toen = await this.accessEventJwt.verifyAsync<{
      eventId: string;
    }>(token);

    return toen.eventId;
  }

  async editEvent(
    event: EventRequestDto,
    organizerId: string,
    eventId: string,
  ) {
    const existingEvent = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: { participants: true },
    });

    if (!existingEvent) {
      throw new NotFoundException('Event is not found');
    }

    if (existingEvent.organizerId !== organizerId) {
      throw new ForbiddenException('Only organizer can edit events');
    }

    if (event.capacity && event.capacity < existingEvent.participants.length) {
      throw new BadRequestException(
        `Capacity cannot be less than current participants (${existingEvent.participants.length})`,
      );
    }

    return await this.prismaService.event.update({
      where: { id: eventId },
      data: { ...event },
    });
  }
  async deleteEvent(organizerId: string, eventId: string) {
    const existingEvent = await this.prismaService.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      throw new NotFoundException('Event is not found');
    }

    if (existingEvent.organizerId !== organizerId) {
      throw new ForbiddenException('Only organizator can edit events');
    }

    return await this.prismaService.event.delete({
      where: { id: eventId },
    });
  }

  async getAllAccessible(
    page: number = 1,
    pageSize: number = 10,
    search?: string,
  ) {
    const skip = (page - 1) * pageSize;

    const searchFilter: any = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const whereClause = {
      AND: [searchFilter, { visibility: EventVisibility.PUBLIC }],
    };

    const events = await this.prismaService.event.findMany({
      where: whereClause,
      include: { participants: true },
      skip,
      take: pageSize,
      orderBy: { dateTime: 'desc' },
    });

    const total = await this.prismaService.event.count({
      where: whereClause,
    });

    return {
      events,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getMyEvents(userId?: string) {
    return this.prismaService.event.findMany({
      where: {
        OR: [
          ...(userId
            ? [
                { organizerId: userId },
                {
                  participants: {
                    some: { userId },
                  },
                },
              ]
            : []),
        ],
      },
      include: {
        participants: true,
      },
    });
  }
}
