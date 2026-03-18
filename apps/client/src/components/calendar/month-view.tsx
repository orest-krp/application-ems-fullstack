import type { EventCardResponse } from "@ems-fullstack/utils";
import dayjs from "dayjs";
import { EventsList } from "./events-list";

interface MonthViewProps {
  events: EventCardResponse[];
  currentDate: dayjs.Dayjs;
}

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function MonthView({ currentDate, events }: MonthViewProps) {
  const days: dayjs.Dayjs[] = [];
  const startMonth = currentDate.startOf("month");
  const endMonth = currentDate.endOf("month");
  let date = startMonth.startOf("isoWeek");
  const endDate = endMonth.endOf("isoWeek");

  while (date.isSameOrBefore(endDate, "day")) {
    days.push(date);
    date = date.add(1, "day");
  }

  const weeks: dayjs.Dayjs[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="grid gap-1 bg-secondary p-2 rounded-md">
      <div className="grid grid-cols-7 text-center font-semibold text-sm">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {weeks.map((week, idx) => (
        <div key={idx} className="grid grid-cols-7 gap-1">
          {week.map((day) => {
            const dayEvents = events.filter((event) =>
              dayjs(event.dateTime).isSame(day, "day")
            );
            return (
              <div
                key={day.toString()}
                className={`p-1 sm:p-2 border min-h-20 sm:h-28 flex flex-col bg-card overflow-hidden
                ${
                  !day.isSame(currentDate, "month")
                    ? "text-muted-foreground"
                    : ""
                }
                ${
                  day.isSame(dayjs(), "day") ? "bg-accent/20 border-accent" : ""
                }`}
              >
                <div className="text-xs font-semibold">{day.format("D")}</div>

                <div className="flex flex-col gap-1 mt-1 overflow-y-auto text-xs">
                  {dayEvents.length === 0 ? (
                    <span className="text-sm text-muted-foreground">
                      No events
                    </span>
                  ) : (
                    <EventsList dayEvents={dayEvents} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
