import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { EventsSearch } from "@/components/events/events-search";
import { EventsPagination } from "@/components/events/events-pagination";
import { NoEvents } from "@/components/events/no-events";
import { ErrorState } from "@/components/error-state";
import { Loading } from "@/components/loading";
import { useSearchEvents } from "@/hooks/use-search-events";
import { useEventsStore } from "@/store/event-store";
import { Eventslist } from "@/components/events/events-list";

export function Events() {
  const { page, pageSize, search } = useEventsStore();

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, error } = useSearchEvents(
    page,
    pageSize,
    debouncedSearch
  );

  if (error) return <ErrorState error={error} />;
  if (isLoading) return <Loading />;

  return (
    <div className="container h-full flex flex-col gap-4 pt-6">
      <PageHeader
        title="Discover Events"
        subtitle="Find and join exciting events happening around you"
      />

      <EventsSearch />

      {data.events.length === 0 ? (
        <NoEvents />
      ) : (
        <>
          <Eventslist events={data.events} />
          <EventsPagination totalPages={data.totalPages} />
        </>
      )}
    </div>
  );
}
