import type { EventSearchResponse } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";
import type { UseApiGetResult } from "@/lib/types";

export function useSearchEvents(
  page: number,
  pageSize: number,
  search: string,
  tags: string[]
): UseApiGetResult<EventSearchResponse> {
  const tagsParam =
    tags.length > 0 ? `&tags=${encodeURIComponent(tags.join(","))}` : "";

  const url = `/events?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}${tagsParam}`;

  return useApiGet<EventSearchResponse>(
    url,
    ["events", page, pageSize, search, tags],
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateIfStale: false
    }
  );
}
