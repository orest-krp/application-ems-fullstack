import { create } from "zustand";

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

export const useEventsStore = create<EventsStore>((set) => ({
  search: "",
  page: 1,
  pageSize: PAGE_SIZE,
  tags: [],

  setSearch: (value) => set({ search: value }),
  setPage: (value) => set({ page: value }),
  setTags: (tags) => set({ tags })
}));
