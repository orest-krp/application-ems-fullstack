import { PageHeader } from "@/components/page-header";
import { EventsSearch } from "@/components/events/events-search";
import { EventsPagination } from "@/components/events/events-pagination";
import { NoEvents } from "@/components/events/no-events";
import { ErrorState } from "@/components/error-state";
import { Loading } from "@/components/loading";
import { useSearchEvents } from "@/hooks/use-search-events";
import { useEventsStore } from "@/store/events-store";
import { Eventslist } from "@/components/events/events-list";
import { useDebounce } from "@/hooks/use-debounce";
import { EventsTags } from "@/components/events/events-tags";

export function Events() {
  const { page, pageSize, search, tags } = useEventsStore();

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, error } = useSearchEvents(
    page,
    pageSize,
    debouncedSearch,
    tags
  );

  if (error) return <ErrorState error={error} />;

  if (isLoading) return <Loading />;

  return (
    <div className="container h-full pb-4 flex flex-col gap-4 pt-6">
      <PageHeader
        title="Discover Events"
        subtitle="Find and join exciting events happening around you"
      />
      <div className="flex gap-4 flex-col sm:flex-row">
        <EventsSearch />
        <EventsTags />
      </div>

      {data.events.length === 0 ? (
        <NoEvents />
      ) : (
        <>
          <Eventslist events={data.events} />
          {data.totalPages > 1 && (
            <EventsPagination totalPages={data.totalPages} />
          )}
        </>
      )}
    </div>
  );
}
