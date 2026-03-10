import { useRef } from "react";
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
  const firstLoad = useRef(true);
  const retryOn = options?.retryOn ?? [];

  const {
    data,
    error,
    isLoading: swrLoading,
    mutate
  } = useSWR<T, FetchError>(url, authfetcher, {
    shouldRetryOnError: (err) =>
      retryOn.length === 0
        ? ![401, 404].includes(err.statusCode)
        : retryOn.includes(err.statusCode),
    revalidateOnFocus: true,
    keepPreviousData: true,
    ...options
  });

  if (data && firstLoad.current) firstLoad.current = false;
  const isLoading = firstLoad.current && swrLoading;

  if (error) {
    return {
      data: null,
      isLoading: false,
      error,
      mutate: () => mutate()
    };
  }

  if (isLoading) {
    return {
      data: data ?? null,
      isLoading: true,
      error: null,
      mutate: () => mutate()
    };
  }

  if (!data) {
    return {
      data: null,
      isLoading: true,
      error: null,
      mutate: () => mutate()
    };
  }

  return {
    data: data,
    isLoading: false,
    error: null,
    mutate: () => mutate()
  };
}
