import type {
  Participant,
  ParticipantWithUser,
  Tag,
  UserResponse,
} from '@ems-fullstack/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserResponseDto } from './users.dto';
import { EventVisibility } from '@ems-fullstack/database';

export class ParticipantWithUserDto implements ParticipantWithUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  joinedAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  user: UserResponse;

  @ApiProperty()
  eventId: string;
}

export class ParticipantDto implements Participant {
  @ApiProperty()
  id: string;

  @ApiProperty()
  joinedAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  eventId: string;
}

export class EventResponseDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiPropertyOptional()
  capacity: number | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  dateTime: Date;

  @ApiProperty()
  organizerId: string;

  @ApiProperty()
  organizer: UserResponseDto;

  @ApiProperty()
  location: string;

  @ApiProperty()
  visibility: EventVisibility;
}

export class EventActionResponseDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiPropertyOptional()
  capacity: number | null;

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

export class TagsResponseDto {
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
