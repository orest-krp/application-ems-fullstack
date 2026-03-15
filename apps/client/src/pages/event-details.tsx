import { ErrorState } from "@/components/error-state";
import { EventFormFields } from "@/components/events-details/event-form-fields";
import { Participants } from "@/components/events-details/participants";
import { Loading } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorMessage } from "@/components/ui/error-message";
import { useAuth } from "@/hooks/use-auth";
import { useEventActions } from "@/hooks/use-event-actions";
import { useEventDetails } from "@/hooks/use-event-details";
import { useEventForm } from "@/hooks/use-event-form";
import { formatDate, mergeDateTime } from "@/lib/utils";
import { EventVisibility, type EventRequestForm } from "@ems-fullstack/utils";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@/components/ui/loading-button";
import { useMounted } from "@/hooks/use-mouted";
import { EventDetailsHeader } from "@/components/events-details/event-details-header";

export function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const {
    user: { data: user }
  } = useAuth();

  const isMouted = useMounted();

  const {
    eventDetails: { data: event, error, isLoading, isValidating },
    isOrganizer,
    isJoined,
    isShareAllowed,
    isFull
  } = useEventDetails(eventId);

  const {
    editEvent,
    setEventError,
    editEventError,
    joinEvent,
    leaveEvent,
    deleteEvent,
    editEventLoading,
    joinEventLoading,
    leaveEventloading,
    deleteEventloading
  } = useEventActions(eventId);

  const [isEdited, setEdited] = useState(false);

  const { control, handleSubmit, resetValues, isDirty } = useEventForm();

  useEffect(() => {
    if (event) resetValues(event);
  }, [event]);

  const onEdit = useCallback(
    async (data: EventRequestForm) => {
      const { date, time, capacity, ...rest } = data;

      if (capacity && event && Number(capacity) < event.participants.length) {
        setEventError({
          error: "Validation error",
          messages: [
            `Capacity cannot be lower than the number of participants (${event.participants.length}).`
          ],
          statusCode: 422
        });
        return;
      }

      await editEvent({
        ...rest,
        dateTime: mergeDateTime(date, time),
        capacity: capacity ? Number(capacity) : undefined
      });

      setEdited(false);
    },
    [editEvent]
  );

  const onJoin = async () => {
    await joinEvent();
  };

  const onLeave = async () => {
    await leaveEvent();
  };

  const onDelete = async () => {
    await deleteEvent();
  };

  const isFirstLoad = isLoading || (isValidating && !isMouted);

  if (isFirstLoad) return <Loading />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="flex w-full justify-center bg-primary-foreground py-8 px-4">
      <div className="w-full max-w-3xl">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mb-4 flex items-center gap-2 px-0"
          onClick={() => navigate("/events")}
        >
          <ArrowLeft />
          Back
        </Button>

        <Card>
          <EventDetailsHeader
            title={event.title}
            user={user}
            isEdited={isEdited}
            isOrganizer={isOrganizer}
            isJoined={isJoined}
            isFull={isFull}
            onToggleEdit={() => {
              setEdited((value) => !value);
              resetValues(event);
            }}
            onDelete={onDelete}
            onJoin={onJoin}
            onLeave={onLeave}
            isDeleting={deleteEventloading}
            isJoining={joinEventLoading}
            isLeaving={leaveEventloading}
          />
          <CardContent className="space-y-6">
            {isEdited ? (
              <form
                noValidate
                onChange={() => setEventError(null)}
                onSubmit={handleSubmit(onEdit)}
              >
                <EventFormFields control={control} />

                <LoadingButton
                  type="submit"
                  disabled={!isDirty || editEventLoading}
                  loading={editEventLoading}
                  loadingText="Editing..."
                  className="w-full mt-6"
                >
                  Save changes
                </LoadingButton>

                <ErrorMessage error={editEventError} />
              </form>
            ) : (
              <>
                {event?.description && <p>{event.description}</p>}

                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {formatDate(event.dateTime)}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {event?.location}
                </div>

                <Badge
                  variant={
                    event?.visibility === EventVisibility.PUBLIC
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {event?.visibility === EventVisibility.PUBLIC
                    ? "Public"
                    : "Private"}
                </Badge>
              </>
            )}

            {event && (
              <Participants
                invitationLink={event.invitationLink}
                eventCapacity={event.capacity}
                participants={event.participants}
                organizerId={event.organizerId}
                isShareAllowed={isShareAllowed}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
