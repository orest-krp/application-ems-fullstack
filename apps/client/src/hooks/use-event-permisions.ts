import {
  type EventCardDetailsResponse,
  type EventDetailsResponse,
  type UserResponse
} from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";

export function useEventPermissions(
  event: EventDetailsResponse | EventCardDetailsResponse | null
) {
  const { data: user } = useApiGet<UserResponse>("/user/me", "/user/me");

  const isOrganizer = event?.organizerId === user?.id;
  const isJoined =
    event?.participants.some((p) => p.userId === user?.id) ?? false;

  const isFull = event?.capacity
    ? event.participants.length >= event.capacity
    : false;

  const participants = event?.capacity
    ? `${event.participants.length}/${event.capacity} participants`
    : "Unlimited";

  return {
    isOrganizer,
    participants,
    isJoined,
    isFull,
    user
  };
}
