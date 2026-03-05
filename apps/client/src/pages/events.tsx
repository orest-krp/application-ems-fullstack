import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NoEvents } from "@/components/no-events";
import { useSearchEvents } from "@/hooks/use-search-events";
import { Spinner } from "@/components/spinner";
import { EventCard } from "@/components/event-card";

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
      <h1 className="text-3xl font-bold">Discover Events</h1>
      <p className="text-muted-foreground">
        Find and join exciting events happening around you
      </p>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && <NoEvents />}
    </div>
  );
}
