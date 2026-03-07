import type { EventApiRequestDto } from "@ems-fullstack/utils";
import { useMutation } from "./use-mutation";
import { mutate } from "swr";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useCreateEvent() {
  const navigate = useNavigate();
  const {
    error,
    setError,
    mutate: createEvent
  } = useMutation<EventApiRequestDto>("/event", "POST", {
    onSuccess() {
      mutate("/event");
      navigate("/events");
      toast.success("Event has been created succesfully");
    }
  });

  return {
    error,
    setError,
    createEvent
  };
}
