import type { Message } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: Message;
  close: () => void;
}

export function ChatMessage({ message, close }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`p-2 rounded-lg ${
        isUser
          ? "bg-primary text-primary-foreground self-end"
          : "bg-background text-muted-foreground self-start"
      }`}
    >
      {isUser ? (
        message.content
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h3: ({ children }) => (
              <h3 className="mt-2 mb-2 text-lg font-semibold text-primary">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {children}
              </p>
            ),
            ul: ({ children }) => <ul className="space-y-1">{children}</ul>,
            li: ({ children }) => (
              <li className="ml-2 text-sm text-foreground">{children}</li>
            ),
            strong: ({ children }) => (
              <span className="font-semibold text-foreground">{children}</span>
            ),
            a: ({ href }) => (
              <NavLink
                to={href || "#"}
                onClick={() => close()}
                className="inline-block mt-2 rounded-md bg-primary p-2 text-xs font-medium text-primary-foreground"
              >
                Link to event
              </NavLink>
            )
          }}
        >
          {message.content}
        </ReactMarkdown>
      )}
    </div>
  );
}
