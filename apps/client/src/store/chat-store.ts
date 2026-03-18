import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Message } from "@/lib/types";

type ChatState = {
  messages: Message[];
  addMessage: (msg: Message) => void;
  setMessages: (msgs: Message[]) => void;
  clearMessages: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (msg) =>
        set((state) => ({ messages: [...state.messages, msg] })),
      setMessages: (msgs) => set({ messages: msgs }),
      clearMessages: () => set({ messages: [] })
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
