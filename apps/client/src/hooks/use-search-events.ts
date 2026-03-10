import type { EventCardDetailsResponse } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";
import type { UseApiGetResult } from "@/lib/types";

export function useSearchEvents(
  page: number,
  pageSize: number,
  search: string
): UseApiGetResult<{
  events: EventCardDetailsResponse[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}> {
  return useApiGet<{
    events: EventCardDetailsResponse[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }>(
    `/event?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`,
    ["/event", String(page), String(pageSize), String(search)],
    { keepPreviousData: true }
  );
}
