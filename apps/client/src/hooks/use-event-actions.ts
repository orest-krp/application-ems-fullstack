import type {
  EventApiRequestDto,
  ParticipantWithUser
} from "@ems-fullstack/utils";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";

export function useEventActions(eventId: string | null, token?: string) {
  const navigate = useNavigate();
  const {
    mutate: editEvent,
    error: editEventError,
    setError: setEventError
  } = useMutation<EventApiRequestDto>(`/event/${eventId}`, "PUT", {
    onSuccess: () => {
      toast.success("Event has been edited succesfully");
      mutate("/event");
      mutate(`/event/${eventId}`);
    }
  });

  const { mutate: joinEvent } = useMutation<ParticipantWithUser>(
    `/event/${eventId}/join${token ? `?token=${token}` : ""}`,
    "POST",
    {
      onSuccess: () => {
        toast.success("User has been joined");
        mutate("/event");
        mutate(`/event/${eventId}`);
      },
      onError: (error) => {
        toast.error(error.messages[0]);
      }
    }
  );

  const { mutate: leaveEvent } = useMutation<ParticipantWithUser>(
    `/event/${eventId}/join`,
    "DELETE",
    {
      onSuccess: () => {
        toast.success("User has been leaved");
        mutate("/event");
        mutate(`/event/${eventId}`);
      },
      onError: (error) => {
        toast.error(error.messages[0]);
      }
    }
  );

  const { mutate: deleteEvent } = useMutation<ParticipantWithUser>(
    `/event/${eventId}`,
    "DELETE",
    {
      onSuccess: () => {
        toast.success("Event has been deleted");
        navigate("/events");
        mutate("/event");
        mutate(`/event/${eventId}`);
      },
      onError: (error) => {
        toast.error(error.messages[0]);
      }
    }
  );

  return {
    editEventError,
    editEvent,
    setEventError,
    joinEvent,
    leaveEvent,
    deleteEvent
  };
}
