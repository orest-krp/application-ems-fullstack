import type { Message } from "@/lib/types";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";

interface ChatProps {
  messages: Message[];
  loading: boolean;
  close: () => void;
}

export function Chat({ messages, loading, close }: ChatProps) {
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
      className="flex-1 w-full bg-primary-foreground overflow-y-auto px-4 py-4 no-scrollbar"
    >
      <div className="flex flex-col justify-end min-h-full space-y-3">
        {messages.length === 0 && (
          <p className="p-2 bg-background shadow rounded-lg text-muted-foreground">
            Hello! How can I assist you today?
          </p>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} close={close} />
        ))}
        {loading && (
          <div className="p-2 bg-muted rounded-full flex items-center gap-2 w-fit">
            <span className="text-muted-foreground">AI is typing</span>
            <div className="flex gap-1 pt-1">
              <span className="w-1 h-1 bg-muted-foreground rounded-full animate-typing"></span>
              <span className="w-1 h-1 bg-muted-foreground rounded-full animate-typing delay-150"></span>
              <span className="w-1 h-1 bg-muted-foreground rounded-full animate-typing delay-300"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
