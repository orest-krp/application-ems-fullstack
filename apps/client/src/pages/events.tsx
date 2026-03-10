import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { NoEvents } from "@/components/no-events";
import { Spinner } from "@/components/spinner";
import { EventCard } from "@/components/event-card";
import { ErrorState } from "@/components/error-state";
import { useSearchEvents } from "@/hooks/use-search-events";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export function Events() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);

  const pageSize = 2;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, error } = useSearchEvents(
    page,
    pageSize,
    debouncedSearch
  );

  if (error) return <ErrorState error={error} />;
  if (isLoading) return <Spinner />;

  const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);

  return (
    <div className="container flex flex-col gap-4 pt-6">
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
        {data.events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {data.events.length === 0 ? (
        <NoEvents />
      ) : (
        <div className="mt-auto mb-4 flex justify-center gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </PaginationPrevious>
              </PaginationItem>

              {pages.map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={p === page}
                    onClick={() => setPage(p)}
                  >
                    <Button
                      variant={p === page ? "default" : "outline"}
                      size="sm"
                    >
                      {p}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
              ))}

              {data.totalPages > 7 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() =>
                    setPage((p) => Math.min(p + 1, data.totalPages))
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
