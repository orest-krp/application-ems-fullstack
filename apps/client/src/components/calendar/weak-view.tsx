import dayjs from "dayjs";
import type { EventCardResponse } from "@ems-fullstack/utils";
import { getWeekDays, getEventsForDay } from "@/lib/utils";
import { EventsList } from "./events-list";

interface WeekViewProps {
  events: EventCardResponse[];
  currentDate: dayjs.Dayjs;
}

export function WeekView({ currentDate, events }: WeekViewProps) {
  const days = getWeekDays(currentDate);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
      {days.map((day) => {
        const dayEvents = getEventsForDay(events, day);

        return (
          <div
            key={day.format("YYYY-MM-DD")}
            className={`p-2 border rounded-md min-h-30 sm:h-40 flex flex-col bg-card
            ${day.isSame(dayjs(), "day") ? "bg-accent/20 border-accent" : ""}`}
          >
            <div className="text-center font-semibold text-sm">
              {day.format("ddd D")}
            </div>

            <div className="mt-2 overflow-y-auto">
              <EventsList dayEvents={dayEvents} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
