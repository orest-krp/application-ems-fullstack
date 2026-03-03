import { fetcher } from "@/lib/fetcher";
import type { FetchError } from "@ems-fullstack/types";
import { useCallback, useState } from "react";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        await fetcher("/auth/register", { name, email, password }, "POST");
      } catch (err) {
        setError(err as FetchError);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { register, loading, error, setError };
}
