import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventRequestDto } from 'src/utils/dto/events.dto';
import { PrismaService } from 'src/prisma.service';
import { JWTProviders } from 'src/utils/types/jwt';
import { EventVisibility } from 'generated/prisma/enums';

@Injectable()
export class EventsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(JWTProviders.EVENT) private readonly accessEventJwt: JwtService,
  ) {}

  private prepareTagQuery(tags: string[]) {
    return {
      set: [],
      connectOrCreate: tags.map((tag) => ({
        where: { name: tag.toLowerCase() },
        create: { name: tag.toLowerCase() },
      })),
    };
  }

  private generateEventWhereClause(search?: string) {
    return {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  { title: { contains: search, mode: 'insensitive' as const } },
                  {
                    description: {
                      contains: search,
                      mode: 'insensitive' as const,
                    },
                  },
                ],
              },
            ]
          : []),
        { visibility: EventVisibility.PUBLIC },
      ],
    };
  }

  async createEvent(event: EventRequestDto, organizerId: string) {
    const { tags, ...eventData } = event;

    return await this.prismaService.event.create({
      data: {
        ...eventData,
        organizerId,
        participants: {
          create: { userId: organizerId },
        },
        tags: tags && this.prepareTagQuery(tags),
      },
      include: {
        tags: true,
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
      include: { participants: true, tags: true },
    });

    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }

    if (existingEvent.organizerId !== organizerId) {
      throw new ForbiddenException('Only organizer can edit events');
    }

    if (event.capacity && event.capacity < existingEvent.participants.length) {
      throw new BadRequestException(
        `Capacity cannot be less than current participants (${existingEvent.participants.length})`,
      );
    }

    const { tags, ...eventData } = event;

    const tagUpdate = tags && this.prepareTagQuery(tags);

    return await this.prismaService.event.update({
      where: { id: eventId },
      data: {
        ...eventData,
        tags: tagUpdate,
      },
      include: { tags: true },
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
      throw new ForbiddenException('Only organizator can delete events');
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

    const whereClause = this.generateEventWhereClause(search);

    const events = await this.prismaService.event.findMany({
      where: whereClause,
      include: { participants: true, tags: true },
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
        tags: true,
      },
    });
  }
}
