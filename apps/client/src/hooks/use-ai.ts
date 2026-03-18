import type { AIRequest, AIResponse } from "@ems-fullstack/utils";
import { useMutation } from "./use-mutation";

export function useAI() {
  const {
    mutate: sendRequest,
    error,
    setError,
    loading
  } = useMutation<AIRequest, AIResponse>("ask", "POST", {});

  return {
    sendRequest,
    error,
    setError,
    loading
  };
}
