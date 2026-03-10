import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, List } from "lucide-react";

interface ViewSwitcherProps {
  view: "month" | "week";
  setView: (view: "month" | "week") => void;
}

export function ViewSwitcher({ view, setView }: ViewSwitcherProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "month" ? "default" : "outline"}
        onClick={() => setView("month")}
        className="hidden sm:flex items-center gap-1"
      >
        <CalendarIcon className="h-4 w-4" />
        Month
      </Button>

      <Button
        variant={view === "week" ? "default" : "outline"}
        onClick={() => setView("week")}
        className="hidden sm:flex items-center gap-1"
      >
        <List className="h-4 w-4" />
        Week
      </Button>
    </div>
  );
}
