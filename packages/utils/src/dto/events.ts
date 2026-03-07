import { eventApiSchema, eventSchema } from "../shemas/event.js";
import yup from "yup";
import { UserResponseDTO } from "./users.js";

export type EventRequestForm = yup.InferType<typeof eventSchema>;
export type EventApiRequestDto = yup.InferType<typeof eventApiSchema>;

export enum EventVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export enum EventStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export interface ParticipantWithUser {
  id: string;
  joinedAt: Date;
  userId: string;
  user: UserResponseDTO;
  eventId: string;
}

export interface EventResponseDto {
  id: string;
  description: string | null;
  capacity: number | null;
  title: string;
  dateTime: Date;
  organizerId: string;
  location: string;
  visibility: EventVisibility;
}

export interface EventDetailsResponseDto extends EventResponseDto {
  participants: ParticipantWithUser[];
  invitationLink: string;
}
