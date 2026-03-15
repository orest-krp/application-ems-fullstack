import { CalendarOff } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent
} from "@/components/ui/empty";

interface NoEventsProps {
  message?: string;
}

export function NoEvents({ message = "No events found." }: NoEventsProps) {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyContent>
          <CalendarOff className="h-30 w-30 text-muted-foreground" />
        </EmptyContent>

        <EmptyTitle>{message}</EmptyTitle>
        <EmptyDescription>
          There are currently no events available.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
