import type { TagsResponse } from "@ems-fullstack/utils";
import { useApiGet } from "./use-api-get";
import type { UseApiGetResult } from "@/lib/types";

export function useTags(search: string): UseApiGetResult<TagsResponse> {
  const url = `/tags?&search=${encodeURIComponent(search)}`;

  return useApiGet<TagsResponse>(url, ["events", search], {});
}
