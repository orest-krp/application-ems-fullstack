import type {
  EventActionResponse,
  EventRequest,
  ParticipantWithUser
} from "@ems-fullstack/utils";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import { useRefresh } from "./use-refresh";

export function useEventActions(eventId?: string, token?: string) {
  const { refreshCurrentEvents, refreshEvent } = useRefresh();
  const navigate = useNavigate();
  const {
    mutate: editEvent,
    error: editEventError,
    setError: setEventError,
    loading: editEventLoading
  } = useMutation<EventRequest, EventActionResponse>(
    `/events/${eventId}`,
    "PUT",
    {
      onSuccess: (data) => {
        toast.success("Event has been edited succesfully");
        refreshCurrentEvents();
        refreshEvent(data.id);
      }
    }
  );

  const {
    mutate: joinEvent,
    loading: joinEventLoading,
    error: joinEventError
  } = useMutation<never, ParticipantWithUser>(
    `/events/${eventId}/join${token ? `?token=${token}` : ""}`,
    "POST",
    {
      onSuccess: (data) => {
        toast.success("User has been joined");
        refreshCurrentEvents();
        refreshEvent(data.eventId);
        mutate(`/events/${eventId}`);
      },
      onError: (error) => {
        toast.error(error.messages[0]);
      }
    }
  );

  const { mutate: leaveEvent, loading: leaveEventloading } = useMutation<
    never,
    ParticipantWithUser
  >(`/events/${eventId}/join`, "DELETE", {
    onSuccess: (data) => {
      toast.success("User has been leaved");
      navigate("/events");
      refreshCurrentEvents();
      refreshEvent(data.eventId);
    },
    onError: (error) => {
      toast.error(error.messages[0]);
    }
  });

  const { mutate: deleteEvent, loading: deleteEventloading } = useMutation<
    never,
    EventActionResponse
  >(`/events/${eventId}`, "DELETE", {
    onSuccess: (data) => {
      toast.success("Event has been deleted");
      navigate("/events");
      refreshCurrentEvents();
      refreshEvent(data.id);
    },
    onError: (error) => {
      toast.error(error.messages[0]);
    }
  });

  return {
    editEventError,
    joinEventError,
    editEvent,
    setEventError,
    joinEvent,
    leaveEvent,
    deleteEvent,
    joinEventLoading,
    leaveEventloading,
    editEventLoading,
    deleteEventloading
  };
}
