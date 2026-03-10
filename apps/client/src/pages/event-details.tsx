import { ErrorState } from "@/components/error-state";
import { EventDetailsHeader } from "@/components/event-details-header";
import { EventFormFields } from "@/components/event-form-fields";
import { Participants } from "@/components/participants";
import { Spinner } from "@/components/spinner";
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

export function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const {
    user: { data: user }
  } = useAuth();

  const {
    eventDetails: { data: event, error, isLoading },
    isOrganizer,
    isJoined,
    isFull
  } = useEventDetails(eventId ?? null);

  const {
    editEvent,
    setEventError,
    editEventError,
    joinEvent,
    leaveEvent,
    deleteEvent
  } = useEventActions(eventId || null);

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

  const onJoin = useCallback(async () => {
    await joinEvent();
  }, [editEvent]);

  const onLeave = useCallback(async () => {
    await leaveEvent();
  }, [leaveEvent]);

  const onDelete = useCallback(async () => {
    await deleteEvent();
  }, [deleteEvent]);

  if (isLoading) return <Spinner />;
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
          />
          <CardContent className="space-y-6">
            {isEdited ? (
              <form
                noValidate
                onChange={() => setEventError(null)}
                onSubmit={handleSubmit(onEdit)}
              >
                <EventFormFields control={control} />

                <Button
                  type="submit"
                  disabled={!isDirty}
                  className="w-full mt-6"
                >
                  Save changes
                </Button>

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
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
