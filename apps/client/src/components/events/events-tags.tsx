import { useEventsStore } from "@/store/events-store";
import { TagsSelect } from "../ui/tag-select";

export function EventsTags() {
  const setTags = useEventsStore((state) => state.setTags);
  return (
    <div className="w-full">
      <TagsSelect onChange={(values) => setTags(values)} />
    </div>
  );
}
