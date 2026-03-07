import { ErrorState } from "@/components/error-state";
import { EventFormFields } from "@/components/event-form-fields";
import { Participants } from "@/components/participants";
import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorMessage } from "@/components/ui/error-message";
import { useEventActions } from "@/hooks/use-event-actions";
import { useEventDetails } from "@/hooks/use-event-details";
import { useEventForm } from "@/hooks/use-event-form";
import { mergeDateTime } from "@/lib/utils";
import { EventVisibility, type EventRequestForm } from "@ems-fullstack/utils";

import dayjs from "dayjs";
import {
  ArrowLeft,
  Calendar,
  Delete,
  MapPin,
  Save,
  UserMinus,
  UserPlus,
  X
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

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

      await editEvent({
        ...rest,
        dateTime: mergeDateTime(date, time),
        capacity: capacity ? Number(capacity) : null
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
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          Back
        </Button>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl">
              {isEdited ? "Edit Event" : event.title}
            </CardTitle>

            {isOrganizer ? (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setEdited((v) => !v);
                    resetValues(event);
                  }}
                >
                  {isEdited ? (
                    <>
                      <X />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Save />
                      Edit
                    </>
                  )}
                </Button>

                <Button onClick={onDelete} variant="destructive">
                  <Delete />
                  Delete
                </Button>
              </div>
            ) : isJoined ? (
              <Button onClick={onLeave} variant="destructive">
                <UserMinus />
                Leave
              </Button>
            ) : (
              <Button onClick={onJoin} disabled={isFull}>
                <UserPlus />
                {isFull ? "Full" : "Join"}
              </Button>
            )}
          </CardHeader>

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
                  {dayjs(event?.dateTime).format("dddd, MMMM D, YYYY h:mm A")}
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
