import { useState, useCallback } from "react";
import { fetcher } from "@/lib/fetcher";
import type { FetchError } from "@ems-fullstack/types";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await fetcher("/auth/login", { email, password }, "POST");
    } catch (err) {
      setError(err as FetchError);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error, setError };
}
