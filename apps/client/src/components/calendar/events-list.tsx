import { getTagColor } from "@/lib/utils";
import type { EventCardResponse } from "@ems-fullstack/utils";
import clsx from "clsx";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

interface EventsListProps {
  dayEvents: EventCardResponse[];
}

export function EventsList({ dayEvents }: EventsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {dayEvents.length === 0 ? (
        <span className="text-sm text-muted-foreground md:text-center">
          No events
        </span>
      ) : (
        dayEvents.map((event: EventCardResponse) => (
          <NavLink
            key={event.id}
            to={`/events/${event.id}`}
            className={clsx(
              "rounded px-2 py-1 text-sm",
              event.tags[0] ? getTagColor(event.tags[0].name) : "bg-primary/20"
            )}
          >
            {dayjs(event.dateTime).format("HH:mm")} — {event.title}
          </NavLink>
        ))
      )}
    </div>
  );
}
