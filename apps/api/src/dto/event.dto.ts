import { EventDto } from '@ems-fullstack/types';
import { EventStatus, EventVisibility } from 'generated/prisma/enums';

export interface ResponseEventDTO extends Omit<
  EventDto,
  'visibility' | 'status'
> {
  visibility: EventVisibility;
  status: EventStatus;
}
