import { createEventApiSchema, createEventSchema } from "../shemas/event.js";
import yup from "yup";

export type CreateEventForm = yup.InferType<typeof createEventSchema>;
export type CreateEventDto = yup.InferType<typeof createEventApiSchema>;

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

export interface EventResponseDto {
  id: string;
  description: string | null;
  capacity: number | null;
  title: string;
  dateTime: Date;
  location: string;
  visibility: EventVisibility;
  status: EventStatus;
}
