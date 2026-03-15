import type {
  Participant,
  ParticipantWithUser,
  Tag,
  UserResponse,
} from '@ems-fullstack/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventVisibility } from 'generated/prisma/enums';
import { UserResponseDto } from './users.dto';

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
  user: UserResponse;

  @ApiProperty({ example: 'event_56789' })
  eventId: string;
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
  eventId: string;
}

export class EventResponseDto {
  @ApiProperty({ example: 'event_56789' })
  id: string;

  @ApiPropertyOptional({ nullable: true, example: 'A fun coding meetup' })
  description: string | null;

  @ApiPropertyOptional({ nullable: true, example: 50 })
  capacity: number | null;

  @ApiProperty({ example: 'Coding Meetup' })
  title: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-03-20T18:30:00Z',
  })
  dateTime: Date;

  @ApiProperty({ example: 'user_12345' })
  organizerId: string;

  @ApiProperty({ example: '123 Main St, San Francisco, CA' })
  location: string;

  @ApiProperty({ enum: EventVisibility, example: EventVisibility.PUBLIC })
  visibility: EventVisibility;
}

export class EventRequestDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  capacity?: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  dateTime: Date;

  @ApiProperty()
  organizerId: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  visibility: EventVisibility;

  @ApiProperty()
  tags?: string[];
}

export class EventDetailsResponseDto extends EventResponseDto {
  @ApiProperty()
  participants: ParticipantWithUser[];

  @ApiProperty()
  invitationLink: string;

  @ApiProperty()
  tags: Tag[];
}

export class EventCardResponseDto extends EventResponseDto {
  @ApiProperty()
  participants: Participant[];

  @ApiProperty()
  tags: Tag[];
}

export class EventSearchResponseDto implements EventSearchResponseDto {
  @ApiProperty()
  events: EventCardResponseDto[];
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  total: number;
  @ApiProperty()
  totalPages: number;
}
