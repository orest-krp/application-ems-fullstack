import type { Message } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import remarkGfm from "remark-gfm";

type Props = {
  message: Message;
};

export function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`p-2 rounded-md ${
        isUser
          ? "bg-primary text-primary-foreground self-end"
          : "bg-muted text-muted-foreground self-start"
      }`}
    >
      {isUser ? (
        message.content
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h3: ({ children }) => (
              <h3 className="mt-5 mb-2 text-lg font-semibold text-primary">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-sm leading-relaxed text-muted-foreground mb-2">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="space-y-1 mb-3 ml-4 list-disc">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="text-sm text-foreground">{children}</li>
            ),
            strong: ({ children }) => (
              <span className="font-semibold text-foreground">{children}</span>
            ),
            a: ({ href }) => (
              <NavLink
                to={href || "#"}
                className="inline-block mt-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
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
