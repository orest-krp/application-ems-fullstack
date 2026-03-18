import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface EventsStore {
  search: string;
  page: number;
  pageSize: number;
  tags: string[];

  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  setTags: (tags: string[]) => void;
}

const PAGE_SIZE = 6;

export const useEventsStore = create<EventsStore>()(
  persist(
    (set) => ({
      search: "",
      page: 1,
      pageSize: PAGE_SIZE,
      tags: [],

      setSearch: (value: string) => set({ search: value }),
      setPage: (value: number) => set({ page: value }),
      setTags: (tags: string[]) => set({ tags })
    }),
    {
      name: "events-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
