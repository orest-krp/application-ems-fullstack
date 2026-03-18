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
import { formatDate, getTagColor, mergeDateTime } from "@/lib/utils";
import {
  EventVisibility,
  type EventRequestForm,
  type Tag
} from "@ems-fullstack/utils";
import {
  ArrowLeft,
  Calendar,
  Eye,
  FileText,
  MapPin,
  Tag as TagIcon,
  User
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@/components/ui/loading-button";
import { useMounted } from "@/hooks/use-mouted";
import { EventDetailsHeader } from "@/components/events-details/event-details-header";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from "@/components/ui/item";

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

  const { editEvent, setEventError, editEventError, editEventLoading } =
    useEventActions(eventId);

  const [isEdited, setEdited] = useState(false);

  const { control, handleSubmit, resetValues, isDirty } =
    useEventForm("onChange");

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

  const isFirstLoad = isLoading || (isValidating && !isMouted);

  if (isFirstLoad) return <Loading />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="flex w-full justify-center bg-primary-foreground sm:py-8 sm:px-4">
      <div className="w-full max-w-3xl">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mb-2 mt-2 flex items-center gap-2 px-0"
          onClick={() => navigate("/events")}
        >
          <ArrowLeft />
          Back
        </Button>

        <Card>
          <EventDetailsHeader
            title={event.title}
            eventId={event.id}
            user={user}
            isEdited={isEdited}
            isOrganizer={isOrganizer}
            isJoined={isJoined}
            isFull={isFull}
            onToggleEdit={() => {
              setEdited((value) => !value);
              resetValues(event);
            }}
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
                <div className="flex w-full flex-col">
                  <Item size="sm" className="p-0 py-2 sm:p-2">
                    <ItemMedia variant="icon">
                      <User />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Author</ItemTitle>
                      <ItemDescription>{event.organizer.name}</ItemDescription>
                    </ItemContent>
                  </Item>
                  {event?.description && (
                    <Item size="sm" className="p-0 py-2 sm:p-2">
                      <ItemMedia variant="icon">
                        <FileText />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Description</ItemTitle>
                        <ItemDescription>{event.description}</ItemDescription>
                      </ItemContent>
                    </Item>
                  )}

                  <Item size="sm" className="p-0 py-2 sm:p-2">
                    <ItemMedia variant="icon">
                      <Calendar />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Date</ItemTitle>
                      <ItemDescription>
                        {formatDate(event.dateTime)}
                      </ItemDescription>
                    </ItemContent>
                  </Item>

                  <Item size="sm" className="p-0 py-2 sm:p-2">
                    <ItemMedia variant="icon">
                      <MapPin />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Location</ItemTitle>
                      <ItemDescription>{event?.location}</ItemDescription>
                    </ItemContent>
                  </Item>

                  <Item size="sm" className="p-0 py-2 sm:p-2">
                    <ItemMedia variant="icon">
                      <Eye />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Visibility</ItemTitle>
                      <ItemDescription>
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
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                  {event?.tags?.length > 0 && (
                    <Item size="sm" className="p-0 py-2 sm:p-2">
                      <ItemMedia variant="icon">
                        <TagIcon />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Tags</ItemTitle>
                        <ItemDescription className="flex flex-wrap gap-2">
                          {event.tags.map((tag: Tag) => (
                            <Badge
                              key={tag.id}
                              className={getTagColor(tag.name)}
                              variant="outline"
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  )}
                </div>
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
