import type { EventResponseDto } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";
import type { UseApiGetResult } from "@/lib/types";

export function useSearchEvents(): UseApiGetResult<EventResponseDto[]> {
  return useApiGet<EventResponseDto[]>("/event");
}
