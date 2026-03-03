import { CalendarOff } from "lucide-react";

export default function NoEvents({ message = "No events found." }) {
  return (
    <div className="flex flex-col items-center h-full justify-center py-10 text-center space-y-4 text-muted-foreground">
      <CalendarOff className="w-12 h-12 text-secondary-text animate-bounce" />

      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
