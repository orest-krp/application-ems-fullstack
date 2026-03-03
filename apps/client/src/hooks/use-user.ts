import { authfetcher } from "@/lib/fetcher";
import type { FetchError, User } from "@ems-fullstack/types";
import useSWR, { mutate } from "swr";

export function useUser() {
  const {
    data: user,
    error,
    isLoading
  } = useSWR<User, FetchError>("/user/me", authfetcher, {
    shouldRetryOnError: (err) => err.statusCode !== 401
  });

  const logout = async () => {
    await authfetcher("/auth/logout", undefined, "POST");
    await mutate("/user/me", null, false);
  };

  return {
    user: user || null,
    isLoading,
    error,
    logout
  };
}
