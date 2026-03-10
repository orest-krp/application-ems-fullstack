import { useState, useCallback } from "react";
import { authfetcher, fetcher } from "@/lib/fetcher";
import type { FetchError } from "@ems-fullstack/utils";
import type { Method } from "axios";

interface UseMutationOptions<Res> {
  onSuccess?: (data: Res) => void;
  onError?: (error: FetchError) => void;
  onFinish?: () => void;
}

export function useMutation<T, Res = any>(
  endpoint: string,
  method: Method,
  options?: UseMutationOptions<Res>,
  isAuth = true
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);

  const mutate = useCallback(
    async (mutatioData?: T) => {
      setLoading(true);
      setError(null);

      try {
        let data;
        if (isAuth) {
          data = await authfetcher<Res>(endpoint, mutatioData, method);
        } else {
          data = await fetcher<Res>(endpoint, mutatioData, method);
        }
        if (options?.onSuccess) {
          options?.onSuccess(data);
        }
      } catch (error) {
        setError(error as FetchError);
        if (options?.onError) {
          options?.onError(error as FetchError);
        }

        throw error;
      } finally {
        if (options?.onFinish) {
          options.onFinish();
        }
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  return { mutate, loading, error, setError };
}
