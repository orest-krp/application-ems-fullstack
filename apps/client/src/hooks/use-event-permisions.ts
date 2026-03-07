import {
  type EventDetailsResponseDto,
  type UserResponseDTO
} from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";

export function useEventPermissions(
  eventDetails: EventDetailsResponseDto | null
) {
  const { data: user } = useApiGet<UserResponseDTO>("/user/me");

  const isOrganizer = eventDetails?.organizerId === user?.id;
  const isJoined =
    eventDetails?.participants.some((p) => p.userId === user?.id) ?? false;

  const isFull = eventDetails?.capacity
    ? eventDetails.participants.length >= eventDetails.capacity
    : false;

  return {
    isOrganizer,
    isJoined,
    isFull,
    user
  };
}
