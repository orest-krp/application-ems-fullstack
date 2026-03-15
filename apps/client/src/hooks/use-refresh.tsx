import { mutateFirstKey } from "@/lib/utils";
import { useEventsStore } from "@/store/event-store";
import { mutate } from "swr";

export function useRefresh() {
  const { page, pageSize, search } = useEventsStore();

  const refreshUser = () => mutate("/user/me", undefined, { revalidate: true });

  const refreshCurrentEvents = () => {
    mutate(["events", page, pageSize, search], undefined, { revalidate: true });
    mutate("/events/me", undefined, { revalidate: true });
  };

  const refreshAllEvents = () => {
    mutateFirstKey("/events");
    mutate("/events/me", undefined, { revalidate: true });
  };

  const refreshEvent = (eventId: string) => {
    mutate(["/events", eventId]);
  };

  return {
    refreshUser,
    refreshCurrentEvents,
    refreshAllEvents,
    refreshEvent
  };
}
