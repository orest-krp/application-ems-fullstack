import {
  EventVisibility,
  type EventCardResponse,
  type EventDetailsResponse
} from "@ems-fullstack/utils";
import { useAuth } from "./use-auth";

export function useEventPermissions(
  event: EventDetailsResponse | EventCardResponse | null
) {
  const {
    user: { data: user }
  } = useAuth();

  const isOrganizer = event?.organizerId === user?.id;

  const isJoined =
    event?.participants.some((p) => p.userId === user?.id) ?? false;

  const isFull = event?.capacity
    ? event.participants.length >= event.capacity
    : false;

  const participantsCount = event?.capacity
    ? `${event.participants.length}/${event.capacity} participants`
    : "Unlimited";

  const isPrivate = event?.visibility == EventVisibility.PRIVATE;

  const isShareAllowed = isOrganizer && isPrivate;

  return {
    isOrganizer,
    participantsCount,
    isJoined,
    isFull,
    isPrivate,
    isShareAllowed,
    user
  };
}
