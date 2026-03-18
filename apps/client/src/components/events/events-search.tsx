import { Input } from "@/components/ui/input";
import { useEventsStore } from "@/store/events-store";
import { Search } from "lucide-react";

export function EventsSearch() {
  const setSearch = useEventsStore((state) => state.setSearch);
  const search = useEventsStore((state) => state.search);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder="Search events..."
        className="pl-9 text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
