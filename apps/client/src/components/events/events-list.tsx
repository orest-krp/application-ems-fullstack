import type { EventCardResponse } from "@ems-fullstack/utils";
import { EventCard } from "./event-card";

interface EventslistProps {
  events: EventCardResponse[];
}

export function Eventslist({ events }: EventslistProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
