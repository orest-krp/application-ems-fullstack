import {
  EventDetailsResponseDto,
  EventResponseDto,
} from '@ems-fullstack/utils';
import { EventVisibility } from 'generated/prisma/enums';

export interface EventApiResponseDTO extends Omit<
  EventResponseDto,
  'visibility'
> {
  visibility: EventVisibility;
}

export interface EventDetailsApiResponseDTO extends Omit<
  EventDetailsResponseDto,
  'visibility'
> {
  visibility: EventVisibility;
}
