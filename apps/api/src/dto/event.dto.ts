import { EventResponseDto } from '@ems-fullstack/utils';
import { EventStatus, EventVisibility } from 'generated/prisma/enums';

export interface EventApiResponseDTO extends Omit<
  EventResponseDto,
  'visibility' | 'status'
> {
  visibility: EventVisibility;
  status: EventStatus;
}
