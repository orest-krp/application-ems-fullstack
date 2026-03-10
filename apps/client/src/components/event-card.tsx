import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { useEventActions } from "@/hooks/use-event-actions";
import type { EventCardDetailsResponse } from "@ems-fullstack/utils";
import { useEventPermissions } from "@/hooks/use-event-permisions";
import { useAuth } from "@/hooks/use-auth";
import { useCallback } from "react";

interface EventCardProps {
  event: EventCardDetailsResponse;
}

export function EventCard({ event }: EventCardProps) {
  const {
    user: { data: user }
  } = useAuth();
  const { joinEvent, leaveEvent, joinEventLoading, leaveEventloading } =
    useEventActions(event.id);
  const { isFull, isJoined, participants, isOrganizer } =
    useEventPermissions(event);

  const isLoading = joinEventLoading || leaveEventloading;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isJoined) {
        leaveEvent();
      } else {
        joinEvent();
      }
    },
    [isJoined, joinEvent, leaveEvent]
  );

  return (
    <NavLink to={`/events/${event.id}`}>
      <Card className="hover:shadow-lg transition gap-2 flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{event.title}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4" />
            {dayjs(event.dateTime).format("dddd, MMMM D")}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            {dayjs(event.dateTime).format("h:mm A")}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            {participants}
          </div>
          {user && (
            <Button
              variant="default"
              disabled={(isFull && !isJoined) || isLoading || isOrganizer}
              onClick={onClick}
              className="w-full mt-auto"
            >
              {isOrganizer
                ? "You are the organizer"
                : isFull && !isJoined
                  ? "Full"
                  : isJoined
                    ? "Leave Event"
                    : "Join Event"}
            </Button>
          )}
        </CardContent>
      </Card>
    </NavLink>
  );
}
