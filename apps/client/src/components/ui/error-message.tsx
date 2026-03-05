import type { FetchError } from "@ems-fullstack/utils";

interface ErrorMessageProps {
  error: FetchError | null;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  const messages = error.messages;

  return (
    <ul className="mt-2 text-destructive text-sm text-center">
      {messages.map((msg, idx) => (
        <li key={idx}>{msg}</li>
      ))}
    </ul>
  );
}
