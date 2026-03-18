import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EventVisibility } from 'generated/prisma/enums';
import { EventDetailsResponseDto } from 'src/utils/dto/events.dto';
import { PrismaService } from 'src/prisma.service';
import { JWTProviders } from 'src/utils/types/jwt';
import { Event } from 'generated/prisma/client';

@Injectable()
export class EventsDetailsService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    @Inject(JWTProviders.EVENT) private readonly accessEventJwt: JwtService,
  ) {}

  private async getById(eventId: string) {
    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: {
        tags: { omit: { createdAt: true, updatedAt: true } },
        organizer: { omit: { password: true, updatedAt: true } },
        participants: {
          include: {
            user: { omit: { password: true, updatedAt: true } },
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  private async buildInvitationLink(
    event: Event,
    userId?: string,
    email?: string,
  ): Promise<string> {
    let link = `${this.configService.getOrThrow('frontendUrl')}/events/${event.id}/join`;

    if (
      event.visibility === EventVisibility.PRIVATE &&
      event.organizerId === userId &&
      email
    ) {
      const token = await this.generateAccessEventToken(event.id);
      link += `?token=${token}`;
    }

    return link;
  }

  async generateAccessEventToken(eventId: string) {
    const payload = { eventId: eventId };

    return await this.accessEventJwt.signAsync(payload);
  }

  async getEventDetails(
    eventId: string,
    userId?: string,
  ): Promise<EventDetailsResponseDto> {
    const event = await this.getById(eventId);

    if (!event) {
      throw new NotFoundException('Event is not found');
    }

    const isOrganizer = event.organizerId === userId;

    const isParticipant = event.participants.some(
      (participant) => participant.userId === userId,
    );

    const isPrivate = event.visibility === EventVisibility.PRIVATE;

    const isAccesible = isPrivate && !isOrganizer && !isParticipant;

    if (isAccesible) {
      throw new ForbiddenException(
        'You do not have access to this private event',
      );
    }

    let invitationLink = `${this.configService.getOrThrow('frontendUrl')}/events/${eventId}/join`;

    const isAllowedToShareProtectedLink = isPrivate && isOrganizer;

    if (isAllowedToShareProtectedLink) {
      const invitationToken = await this.generateAccessEventToken(event.id);
      invitationLink += `?token=${invitationToken}`;
    }

    return {
      ...event,
      invitationLink,
    };
  }
}
