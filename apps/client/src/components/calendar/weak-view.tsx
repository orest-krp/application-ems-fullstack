import dayjs from "dayjs";
import type { EventCardResponse } from "@ems-fullstack/utils";
import { NavLink } from "react-router-dom";
import { getWeekDays } from "@/lib/utils";

interface WeekViewProps {
  events: EventCardResponse[];
  currentDate: dayjs.Dayjs;
}

export function WeekView({ currentDate, events }: WeekViewProps) {
  const days = getWeekDays(currentDate);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
      {days.map((day) => (
        <div
          key={day.toString()}
          className={`p-2 border rounded-md min-h-30 sm:h-40 flex flex-col bg-card
            ${day.isSame(dayjs(), "day") ? "bg-accent/20 border-accent" : ""}`}
        >
          <div className="text-center font-semibold text-sm">
            {day.format("ddd D")}
          </div>

          <div className="flex flex-col gap-1 mt-2 overflow-y-auto text-xs">
            {events
              .filter((event) => dayjs(event.dateTime).isSame(day, "day"))
              .map((event) => (
                <NavLink
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="bg-primary/20 rounded px-2 truncate"
                >
                  {dayjs(event.dateTime).format("HH:mm")} {event.title}
                </NavLink>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
