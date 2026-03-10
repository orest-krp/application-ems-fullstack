import { getEventsForDay, getWeekDays } from "@/lib/utils";
import type { EventCardDetailsResponse } from "@ems-fullstack/utils";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

interface MobileViewProps {
  events: EventCardDetailsResponse[];
  currentDate: dayjs.Dayjs;
}

export function MobileView({ currentDate, events }: MobileViewProps) {
  const days = getWeekDays(currentDate);

  return (
    <div className="flex flex-col gap-3">
      {days.map((day) => {
        const dayEvents = getEventsForDay(events, day);

        return (
          <div key={day.toString()} className="border rounded-lg p-3 bg-card">
            <div className="flex justify-between">
              <span className="font-semibold">{day.format("dddd")}</span>
              <span className="text-sm text-muted-foreground">
                {day.format("D MMM")}
              </span>
            </div>

            {dayEvents.length === 0 ? (
              <span className="text-sm text-muted-foreground">No events</span>
            ) : (
              dayEvents.map((event: any) => (
                <NavLink
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="bg-primary/20 rounded px-2 py-1 text-sm"
                >
                  {dayjs(event.dateTime).format("HH:mm")} — {event.title}
                </NavLink>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}
