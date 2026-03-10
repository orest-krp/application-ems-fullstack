import type { UseApiGetResult } from "@/lib/types";
import type { EventCardDetailsResponse } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";

export function useMyEvents(): UseApiGetResult<EventCardDetailsResponse[]> {
  return useApiGet<EventCardDetailsResponse[]>("/event/my");
}
