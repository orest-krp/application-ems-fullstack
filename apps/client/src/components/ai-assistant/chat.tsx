import type { Message } from "@/lib/types";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";

type Props = {
  messages: Message[];
  loading: boolean;
};

export function Chat({ messages, loading }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 w-full overflow-y-auto px-4 py-2 no-scrollbar"
    >
      <div className="flex flex-col justify-end min-h-full space-y-3">
        {messages.length === 0 && (
          <p className="p-2 bg-muted rounded-md text-muted-foreground">
            Hello! How can I assist you today?
          </p>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {loading && (
          <p className="p-2 bg-muted rounded-md text-muted-foreground">
            AI is typing...
          </p>
        )}
      </div>
    </div>
  );
}
