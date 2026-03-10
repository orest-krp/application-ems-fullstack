import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: any;
  onPrev: () => void;
  onNext: () => void;
}

export function CalendarHeader({
  currentDate,
  onPrev,
  onNext
}: CalendarHeaderProps) {
  return (
    <div className="flex gap-2 items-center">
      <Button variant="outline" size="sm" onClick={onPrev}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <h2 className="text-lg font-semibold min-w-35 text-center">
        {currentDate.format("MMMM YYYY")}
      </h2>

      <Button variant="outline" size="sm" onClick={onNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
