import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { ErrorState } from "@/components/error-state";
import { useNavigate } from "react-router-dom";
import { WeekView } from "@/components/my-events/weak-view";
import { MonthView } from "@/components/my-events/month-view";
import { MobileView } from "@/components/my-events/mobile-view";
import { CalendarHeader } from "@/components/my-events/calendar-header";
import { ViewSwitcher } from "@/components/my-events/view-switcher";
import { useAuth } from "@/hooks/use-auth";
import { NoEvents } from "@/components/no-events";
import { useMyEvents } from "@/hooks/use-my-events";
import { useIsMobile } from "@/hooks/use-mobile";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
dayjs.extend(isoWeek);

export function MyEvents() {
  const {
    user: { data: user, isLoading: isUserLoading }
  } = useAuth();
  const { data: events, isLoading: isEventsLoading, error } = useMyEvents();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState<"month" | "week">("month");
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  useEffect(() => {
    const handleResize = () => {
      if (isMobile) setView("week");
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  if (isEventsLoading || isUserLoading) return <Spinner />;

  if (!user) {
    return <NoEvents message="Please login to see your events" />;
  }

  if (error) return <ErrorState error={error} />;

  if (events.length === 0) {
    return (
      <NoEvents message="You are not part of any events yet. Explore public events and join" />
    );
  }

  const startMonth = currentDate.startOf("month");
  const endMonth = currentDate.endOf("month");

  const startWeek = currentDate.startOf("isoWeek");
  const endWeek = currentDate.endOf("isoWeek");

  const prev = () =>
    setCurrentDate(
      view === "month"
        ? startMonth.subtract(1, "month")
        : startWeek.subtract(1, "week")
    );

  const next = () =>
    setCurrentDate(
      view === "month" ? endMonth.add(1, "month") : endWeek.add(1, "week")
    );

  return (
    <div className="w-full py-6 px-2 sm:px-0">
      <div className="mb-6 flex flex-col sm:flex-row text-center sm:text-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Events</h1>
          <p className="text-muted-foreground text-sm">
            View and manage your event calendar
          </p>
        </div>

        <Button
          onClick={() => navigate("/create-event")}
          className="flex gap-1"
        >
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        <CalendarHeader currentDate={currentDate} onPrev={prev} onNext={next} />
        <div className="hidden md:flex">
          <ViewSwitcher view={view} setView={setView} />
        </div>
      </div>

      <div className="md:hidden">
        {<MobileView events={events} currentDate={currentDate} />}
      </div>

      <div className="hidden md:block overflow-x-auto">
        {view === "month" ? (
          <MonthView events={events} currentDate={currentDate} />
        ) : (
          <WeekView events={events} currentDate={currentDate} />
        )}
      </div>
    </div>
  );
}
