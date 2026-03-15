import { Input } from "@/components/ui/input";
import { useEventsStore } from "@/store/event-store";
import { Search } from "lucide-react";

export function EventsSearch() {
  const { search, setSearch } = useEventsStore();

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder="Search events..."
        className="pl-9"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
