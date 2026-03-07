import { CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import type { EventResponseDto } from "@ems-fullstack/utils";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: EventResponseDto;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link to={`/events/${event.id}`}>
      <Card className="hover:shadow-lg transition flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{event.title}</CardTitle>
            <Badge variant="secondary">{event.visibility}</Badge>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4" />
            {new Date(event.dateTime).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>

          <Button variant="default" className="w-full mt-auto">
            Join Event
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
