import type { EventCardResponse } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";
import type { UseApiGetResult } from "@/lib/types";

type SearchEventsResponse = {
  events: EventCardResponse[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export function useSearchEvents(
  page: number,
  pageSize: number,
  search: string
): UseApiGetResult<SearchEventsResponse> {
  const url = `/events?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`;

  return useApiGet<SearchEventsResponse>(
    url,
    ["events", page, pageSize, search],
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateIfStale: false
    }
  );
}
