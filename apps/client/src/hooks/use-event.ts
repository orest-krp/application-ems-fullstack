import { useState, useCallback } from "react";
import { authfetcher } from "@/lib/fetcher";
import type { CreateEventDto, FetchError } from "@ems-fullstack/types";

export function useEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);

  const createEvent = useCallback(async (event: CreateEventDto) => {
    setLoading(true);
    setError(null);
    try {
      await authfetcher("/event/create", event, "POST");
    } catch (err) {
      setError(err as FetchError);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createEvent, loading, error, setError };
}
