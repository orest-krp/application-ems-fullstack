import { CalendarDays, Clock, MapPin, User, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { useEventActions } from "@/hooks/use-event-actions";
import { useEventPermissions } from "@/hooks/use-event-permisions";
import { useAuth } from "@/hooks/use-auth";
import { useCallback } from "react";
import type { EventCardResponse, Tag } from "@ems-fullstack/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LoadingButton } from "../ui/loading-button";
import { Badge } from "../ui/badge";
import { getTagColor } from "@/lib/utils";

interface EventCardProps {
  event: EventCardResponse;
}

export function EventCard({ event }: EventCardProps) {
  const {
    user: { data: user }
  } = useAuth();

  const { joinEvent, leaveEvent, joinEventLoading, leaveEventloading } =
    useEventActions(event.id);

  const { isFull, isJoined, participantsCount, isOrganizer } =
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
      <Card className="hover:shadow-lg hover:scale-[1.01] transition gap-2 flex flex-col">
        <CardHeader className="flex flex-col sm:flex-row">
          <div className="flex items-center justify-between">
            <CardTitle className="mb-2">{event.title}</CardTitle>
          </div>
          <div className="flex gap-1">
            {event.tags.map((tag: Tag) => (
              <Badge key={tag.id} className={getTagColor(tag.name)}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            {event.organizer.name}
          </div>
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
            {participantsCount}
          </div>
          {user && (
            <LoadingButton
              onClick={onClick}
              loading={isLoading}
              disabled={isOrganizer || isLoading}
              loadingText={isJoined ? "Leaving..." : "Joining..."}
              className="w-full mt-auto"
            >
              {isOrganizer
                ? "You are the organizer"
                : isFull && !isJoined
                  ? "Full"
                  : isJoined
                    ? "Leave Event"
                    : "Join Event"}
            </LoadingButton>
          )}
        </CardContent>
      </Card>
    </NavLink>
  );
}
