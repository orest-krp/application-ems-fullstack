import type { EventRequest, EventResponse } from "@ems-fullstack/utils";
import { useMutation } from "./use-mutation";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useRefresh } from "./use-refresh";

export function useCreateEvent() {
  const navigate = useNavigate();
  const { refreshCurrentEvents } = useRefresh();
  const {
    error,
    setError,
    mutate: createEvent,
    loading
  } = useMutation<EventRequest, EventResponse>("/events", "POST", {
    onSuccess(data) {
      refreshCurrentEvents();
      navigate(`/events/${data.id}`);
      toast.success("Event has been created succesfully");
    }
  });

  return {
    error,
    setError,
    createEvent,
    loading
  };
}
