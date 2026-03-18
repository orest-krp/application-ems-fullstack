import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

import { useEventsStore } from "@/store/events-store";
import clsx from "clsx";

interface EventsPagination {
  totalPages: number;
}

export function EventsPagination({ totalPages }: EventsPagination) {
  const setPage = useEventsStore((state) => state.setPage);
  const page = useEventsStore((state) => state.page);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-auto mb-4 flex justify-center gap-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(Math.max(page - 1, 1))}
            />
          </PaginationItem>

          {pages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                className={clsx(
                  "hover:bg-primary hover:text-accent border border-border",
                  page == p && "bg-primary text-accent"
                )}
                onClick={() => setPage(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(Math.min(page + 1, totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
