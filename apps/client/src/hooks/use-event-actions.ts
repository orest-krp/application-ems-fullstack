import type { EventRequest, ParticipantWithUser } from "@ems-fullstack/utils";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import { mutateFirstKey } from "@/lib/utils";

export function useEventActions(eventId: string | null, token?: string) {
  const navigate = useNavigate();
  const {
    mutate: editEvent,
    error: editEventError,
    setError: setEventError,
    loading: editEventLoading
  } = useMutation<EventRequest>(`/event/${eventId}`, "PUT", {
    onSuccess: () => {
      toast.success("Event has been edited succesfully");
      mutateFirstKey("/event");
      mutate(`/event/${eventId}`);
    }
  });

  const {
    mutate: joinEvent,
    loading: joinEventLoading,
    error: joinEventError
  } = useMutation<ParticipantWithUser>(
    `/event/${eventId}/join${token ? `?token=${token}` : ""}`,
    "POST",
    {
      onSuccess: () => {
        toast.success("User has been joined");
        mutateFirstKey("/event");
        mutate(`/event/${eventId}`);
      },
      onError: (error) => {
        toast.error(error.messages[0]);
      }
    }
  );

  const { mutate: leaveEvent, loading: leaveEventloading } =
    useMutation<ParticipantWithUser>(`/event/${eventId}/join`, "DELETE", {
      onSuccess: () => {
        toast.success("User has been leaved");
        navigate("/events");
        mutateFirstKey("/event");
        mutate(`/event/${eventId}`);
      },
      onError: (error) => {
        toast.error(error.messages[0]);
      }
    });

  const { mutate: deleteEvent } = useMutation<ParticipantWithUser>(
    `/event/${eventId}`,
    "DELETE",
    {
      onSuccess: () => {
        toast.success("Event has been deleted");
        navigate("/events");
        mutateFirstKey("/event");
        mutate(`/event/${eventId}`);
      },
      onError: (error) => {
        toast.error(error.messages[0]);
      }
    }
  );

  return {
    editEventError,
    joinEventError,
    editEvent,
    setEventError,
    joinEvent,
    leaveEvent,
    joinEventLoading,
    leaveEventloading,
    editEventLoading,
    deleteEvent
  };
}
