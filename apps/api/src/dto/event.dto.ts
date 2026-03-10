import type {
  Participant,
  ParticipantWithUser,
  UserResponse,
} from '@ems-fullstack/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventVisibility } from 'generated/prisma/enums';

export class UserResponseDto implements UserResponse {
  @ApiProperty({ example: 'user_12345' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-03-01T08:00:00Z',
  })
  createdAt: Date;
}

export class ParticipantWithUserDto implements ParticipantWithUser {
  @ApiProperty({ example: 'participant_9876' })
  id: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-03-09T12:00:00Z',
  })
  joinedAt: Date;

  @ApiProperty({ example: 'user_12345' })
  userId: string;

  @ApiProperty({ type: () => UserResponseDto })
  user!: UserResponse;

  @ApiProperty({ example: 'event_56789' })
  eventId!: string;
}

export class ParticipantDto implements Participant {
  @ApiProperty({ example: 'participant_9876' })
  id: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-03-09T12:00:00Z',
  })
  joinedAt: Date;

  @ApiProperty({ example: 'user_12345' })
  userId: string;

  @ApiProperty({ example: 'event_56789' })
  eventId!: string;
}

export class EventResponseDto {
  @ApiProperty({ example: 'event_56789' })
  id!: string;

  @ApiPropertyOptional({ nullable: true, example: 'A fun coding meetup' })
  description!: string | null;

  @ApiPropertyOptional({ nullable: true, example: 50 })
  capacity!: number | null;

  @ApiProperty({ example: 'Coding Meetup' })
  title!: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-03-20T18:30:00Z',
  })
  dateTime!: Date;

  @ApiProperty({ example: 'user_12345' })
  organizerId!: string;

  @ApiProperty({ example: '123 Main St, San Francisco, CA' })
  location!: string;

  @ApiProperty({ enum: EventVisibility, example: EventVisibility.PUBLIC })
  visibility!: EventVisibility;
}

export class EventRequestDto {
  @ApiProperty({ example: 'event_56789' })
  id!: string;

  @ApiPropertyOptional({ example: 'A fun coding meetup' })
  description?: string;

  @ApiPropertyOptional({ example: 50 })
  capacity?: number;

  @ApiProperty({ example: 'Coding Meetup' })
  title!: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-03-20T18:30:00Z',
  })
  dateTime!: Date;

  @ApiProperty({ example: 'user_12345' })
  organizerId!: string;

  @ApiProperty({ example: '123 Main St, San Francisco, CA' })
  location!: string;

  @ApiProperty({ enum: EventVisibility, example: EventVisibility.PUBLIC })
  visibility!: EventVisibility;
}

export class EventDetailsResponseDto extends EventResponseDto {
  @ApiProperty({
    type: [ParticipantWithUserDto],
    example: [
      {
        id: 'participant_9876',
        joinedAt: '2026-03-09T12:00:00Z',
        userId: 'user_12345',
        user: {
          id: 'user_12345',
          name: 'John Doe',
          email: 'john.doe@example.com',
          createdAt: '2026-03-01T08:00:00Z',
          updatedAt: '2026-03-05T15:30:00Z',
        },
        eventId: 'event_56789',
        createdAt: '2026-03-01T09:00:00Z',
        updatedAt: '2026-03-05T16:00:00Z',
      },
    ],
  })
  participants!: ParticipantWithUser[];

  @ApiProperty({ example: 'https://example.com/invite/event_56789' })
  invitationLink!: string;
}

export class EventCardResponseDto extends EventResponseDto {
  @ApiProperty({
    type: [ParticipantDto],
    example: [
      {
        id: 'participant_9876',
        joinedAt: '2026-03-09T12:00:00Z',
        userId: 'user_12345',
        eventId: 'event_56789',
        createdAt: '2026-03-01T09:00:00Z',
        updatedAt: '2026-03-05T16:00:00Z',
      },
    ],
  })
  participants!: Participant[];
}
