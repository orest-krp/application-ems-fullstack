import { EventApiRequestDto } from '@ems-fullstack/utils';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EventVisibility } from 'generated/prisma/enums';
import { EventDetailsApiResponseDTO } from 'src/dto/event.dto';
import { PrismaService } from 'src/prisma.service';
import { JWTProviders } from 'src/utils/constants';

@Injectable()
export class EventService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    @Inject(JWTProviders.EVENT) private readonly accessEventJwt: JwtService,
  ) {}
  async createEvent(event: EventApiRequestDto, organizerId: string) {
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
    const { eventId } = await this.accessEventJwt.verifyAsync<{
      eventId: string;
    }>(token);

    return eventId;
  }

  async editEvent(
    event: EventApiRequestDto,
    organizerId: string,
    eventId: string,
  ) {
    const existingEvent = await this.prismaService.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      throw new NotFoundException('Event is not found');
    }

    if (existingEvent.organizerId !== organizerId) {
      throw new ForbiddenException('Only organizator can edit events');
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

  async getAllPublic() {
    return await this.prismaService.event.findMany({
      where: { visibility: EventVisibility.PUBLIC },
    });
  }

  async generateAccessEventToken(email: string) {
    const payload = { email };

    const accessEventToken = await this.accessEventJwt.signAsync(payload);

    return accessEventToken;
  }

  async getEventDetails(
    eventId: string,
    userId: string | null,
    email: string | null,
  ): Promise<EventDetailsApiResponseDTO> {
    const eventDetails = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: {
        participants: {
          include: { user: { omit: { updatedAt: true, password: true } } },
        },
      },
    });

    if (!eventDetails) {
      throw new NotFoundException('Event is not found');
    }

    let invitationLink = `${this.configService.getOrThrow('frontendUrl')}/events/${eventId}/join`;

    if (
      eventDetails.visibility === EventVisibility.PRIVATE &&
      eventDetails.organizerId === userId &&
      email
    ) {
      const invitationToken = await this.generateAccessEventToken(email);
      invitationLink += `?token=${invitationToken}`;
    }

    return { ...eventDetails, invitationLink };
  }
}
