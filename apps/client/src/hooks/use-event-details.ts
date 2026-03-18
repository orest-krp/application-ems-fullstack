import type { EventDetailsResponse } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";
import { useEventPermissions } from "./use-event-permisions";

export function useEventDetails(eventId?: string) {
  const eventDetails = useApiGet<EventDetailsResponse>(
    `/events/${eventId}`,
    ["/events", eventId],
    {
      isVisible: () => !!eventId,
      revalidateOnFocus: false,
      revalidateIfStale: false
    }
  );

  const { isOrganizer, isJoined, isFull, isPrivate, isShareAllowed } =
    useEventPermissions(eventDetails.data);

  return {
    eventDetails,
    isOrganizer,
    isJoined,
    isFull,
    isPrivate,
    isShareAllowed
  };
}
