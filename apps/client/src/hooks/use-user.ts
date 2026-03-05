import { authfetcher } from "@/lib/fetcher";
import type { FetchError, UserResponseDTO } from "@ems-fullstack/utils";
import useSWR, { mutate } from "swr";

export function useUser() {
  const {
    data: user,
    error,
    isLoading
  } = useSWR<UserResponseDTO, FetchError>("/user/me", authfetcher, {
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
