import { useState } from "react";
import { authfetcher, fetcher } from "@/lib/fetcher";
import type { FetchError } from "@ems-fullstack/utils";
import useSWRMutation from "swr/mutation";
import type { Method } from "axios";

interface UseMutationOptions<Res> {
  onSuccess?: (data: Res) => void;
  onError?: (error: FetchError) => void;
}

export function useMutation<Req = unknown, Res = unknown>(
  url: string,
  method: Method,
  options?: UseMutationOptions<Res>,
  isAuth = true
) {
  const [error, setError] = useState<FetchError | null>(null);

  const mutationFetcher = async (
    key: string,
    { arg }: { arg: Req }
  ): Promise<Res> => {
    if (isAuth) {
      return authfetcher<Req, Res>(key, arg, method);
    }
    return fetcher<Req, Res>(key, arg, method);
  };

  const { trigger, isMutating } = useSWRMutation<Res, FetchError, string, Req>(
    url,
    mutationFetcher,
    {
      onSuccess: (data) => options?.onSuccess?.(data),
      onError: (err) => {
        setError(err);
        options?.onError?.(err);
      }
    }
  );

  return {
    mutate: trigger,
    loading: isMutating,
    error,
    setError
  };
}
