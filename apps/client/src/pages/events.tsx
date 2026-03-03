import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Search, CalendarDays, MapPin } from "lucide-react";
import NoEvents from "@/components/no-events";
import { useSearchEvents } from "@/hooks/use-search-events";
import { Spinner } from "@/components/spinner";

export function Events() {
  const [search, setSearch] = useState("");

  const { events, isLoading } = useSearchEvents();

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto pt-8 space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="hover:shadow-lg transition flex flex-col"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{event.title}</CardTitle>
                <Badge variant="secondary">{event.status}</Badge>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>

              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="w-4 h-4" />
                {new Date(event.dateTime).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>

              <Button variant="default" className="w-full mt-auto">
                Join Event
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && <NoEvents />}
    </div>
  );
}
