import { authfetcher } from "@/lib/fetcher";
import type { EventResponseDto, FetchError } from "@ems-fullstack/utils";
import useSWR from "swr";

export function useSearchEvents() {
  const {
    data: events,
    error,
    isLoading
  } = useSWR<EventResponseDto[], FetchError>("/event", authfetcher, {
    shouldRetryOnError: (err) => err.statusCode !== 401
  });

  return {
    events: events || [],
    isLoading,
    error
  };
}
