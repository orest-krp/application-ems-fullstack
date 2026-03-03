import { authfetcher } from "@/lib/fetcher";
import type { EventDto, FetchError } from "@ems-fullstack/types";
import useSWR from "swr";

export function useSearchEvents() {
  const {
    data: events,
    error,
    isLoading
  } = useSWR<EventDto[], FetchError>("/event", authfetcher, {
    shouldRetryOnError: (err) => err.statusCode !== 401
  });

  return {
    events: events || [],
    isLoading,
    error
  };
}
