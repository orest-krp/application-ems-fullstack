import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EventVisibility } from 'generated/prisma/enums';
import { EventDetailsResponseDto } from 'src/dto/event.dto';
import { PrismaService } from 'src/prisma.service';
import { JWTProviders } from 'src/utils/constants';

@Injectable()
export class EventDetailsService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    @Inject(JWTProviders.EVENT) private readonly accessEventJwt: JwtService,
  ) {}

  async generateAccessEventToken(eventId: string) {
    const payload = { eventId: eventId };

    return this.accessEventJwt.signAsync(payload);
  }

  async getEventDetails(
    eventId: string,
    userId: string | null,
    email: string | null,
  ): Promise<EventDetailsResponseDto> {
    const eventDetails = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: {
        participants: {
          include: {
            user: { omit: { updatedAt: true, password: true } },
          },
        },
      },
    });

    if (!eventDetails) {
      throw new NotFoundException('Event is not found');
    }

    const isOrganizer = eventDetails.organizerId === userId;

    const isParticipant = eventDetails.participants.some(
      (participant) => participant.userId === userId,
    );

    if (
      eventDetails.visibility === EventVisibility.PRIVATE &&
      !isOrganizer &&
      !isParticipant
    ) {
      throw new ForbiddenException(
        'You do not have access to this private event',
      );
    }

    let invitationLink = `${this.configService.getOrThrow('frontendUrl')}/events/${eventId}/join`;

    if (
      eventDetails.visibility === EventVisibility.PRIVATE &&
      isOrganizer &&
      email
    ) {
      const invitationToken = await this.generateAccessEventToken(
        eventDetails.id,
      );
      invitationLink += `?token=${invitationToken}`;
    }

    return {
      ...eventDetails,
      invitationLink,
    };
  }
}
