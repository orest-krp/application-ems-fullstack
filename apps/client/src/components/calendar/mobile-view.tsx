import { getEventsForDay, getWeekDays } from "@/lib/utils";
import type { EventCardResponse } from "@ems-fullstack/utils";
import dayjs from "dayjs";
import { EventsList } from "./events-list";

interface MobileViewProps {
  events: EventCardResponse[];
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
            <EventsList dayEvents={dayEvents} />
          </div>
        );
      })}
    </div>
  );
}
