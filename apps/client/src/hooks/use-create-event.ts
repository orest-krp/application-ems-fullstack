import type { EventRequest, EventResponse } from "@ems-fullstack/utils";
import { useMutation } from "./use-mutation";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { mutateFirstKey } from "@/lib/utils";

export function useCreateEvent() {
  const navigate = useNavigate();
  const {
    error,
    setError,
    mutate: createEvent
  } = useMutation<EventRequest, EventResponse>("/event", "POST", {
    onSuccess(data) {
      mutateFirstKey("/event");
      navigate(`/events/${data.id}`);
      toast.success("Event has been created succesfully");
    }
  });

  return {
    error,
    setError,
    createEvent
  };
}
