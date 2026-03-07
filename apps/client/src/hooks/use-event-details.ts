import type { UseApiGetResult } from "@/lib/types";
import type { EventDetailsResponseDto } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";
import { useEventPermissions } from "./use-event-permisions";

interface UseEventDetailsResult {
  eventDetails: UseApiGetResult<EventDetailsResponseDto>;
  isOrganizer: boolean;
  isJoined: boolean;
  isFull: boolean;
}

export function useEventDetails(eventId: string | null): UseEventDetailsResult {
  const eventDetails = useApiGet<EventDetailsResponseDto>(`/event/${eventId}`);

  const { isOrganizer, isJoined, isFull } = useEventPermissions(
    eventDetails.data
  );

  return {
    eventDetails,
    isOrganizer,
    isJoined,
    isFull
  };
}
