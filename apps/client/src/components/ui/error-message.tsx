import type { FetchError } from "@ems-fullstack/types";
import React from "react";

interface ErrorMessageProps {
  error: FetchError | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  const messages = Array.isArray(error.message)
    ? error.message
    : [error.message];

  return (
    <ul className="mt-2 text-destructive text-sm text-center">
      {messages.map((msg, idx) => (
        <li key={idx}>{msg}</li>
      ))}
    </ul>
  );
};

export default ErrorMessage;
