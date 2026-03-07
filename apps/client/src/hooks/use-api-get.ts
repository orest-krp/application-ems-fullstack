import useSWR, { type SWRConfiguration } from "swr";
import { authfetcher } from "@/lib/fetcher";
import type { FetchError } from "@ems-fullstack/utils";
import type { UseApiGetResult } from "@/lib/types";

type UseApiGetOptions = {
  retryOn?: number[];
} & SWRConfiguration;

export function useApiGet<T>(
  url: string | null,
  options?: UseApiGetOptions
): UseApiGetResult<T> {
  const retryOn = options?.retryOn ?? [];

  const { data, error, isLoading, mutate } = useSWR<T, FetchError>(
    url,
    authfetcher,
    {
      shouldRetryOnError: (err) =>
        retryOn.length === 0
          ? ![401, 404].includes(err.statusCode)
          : retryOn.includes(err.statusCode),
      ...options
    }
  );

  if (error) {
    return {
      data: null,
      isLoading: false,
      error,
      mutate
    };
  }

  if (isLoading || !data) {
    return {
      data: null,
      isLoading: true,
      error: null,
      mutate
    };
  }

  return {
    data,
    isLoading: false,
    error: null,
    mutate
  };
}
