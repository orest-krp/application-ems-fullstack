import type { UseApiGetResult } from "@/lib/types";
import type { EventCardResponse } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";

export function useMyEvents(): UseApiGetResult<EventCardResponse[]> {
  return useApiGet<EventCardResponse[]>("/events/my", "/events/my");
}
