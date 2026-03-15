import { create } from "zustand";

interface EventsStore {
  search: string;
  page: number;
  pageSize: number;

  setSearch: (value: string) => void;
  setPage: (value: number) => void;
}

const PAGE_SIZE = 2;

export const useEventsStore = create<EventsStore>((set) => ({
  search: "",
  page: 1,
  pageSize: PAGE_SIZE,

  setSearch: (value) => set({ search: value }),
  setPage: (value) => set({ page: value })
}));
