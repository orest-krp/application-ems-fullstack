import { eventSchema } from "../shemas/event.js";
import yup from "yup";
import { UserResponse } from "./users.js";

export type EventRequestForm = yup.InferType<typeof eventSchema>;

export enum EventVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export interface Participant {
  id: string;
  joinedAt: Date;
  userId: string;
  eventId: string;
}

export interface ParticipantWithUser {
  id: string;
  joinedAt: Date;
  userId: string;
  user: UserResponse;
  eventId: string;
}

export interface EventRequest {
  description?: string;
  capacity?: number;
  title: string;
  dateTime: Date;
  location: string;
  visibility: EventVisibility;
}

export interface EventResponse {
  id: string;
  description: string | null;
  capacity: number | null;
  title: string;
  dateTime: Date;
  organizerId: string;
  location: string;
  visibility: EventVisibility;
}

export interface EventDetailsResponse extends EventResponse {
  participants: ParticipantWithUser[];
  invitationLink: string;
}

export interface EventCardDetailsResponse extends EventResponse {
  participants: Participant[];
}
