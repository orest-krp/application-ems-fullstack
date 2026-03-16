import type { FetchError } from "@ems-fullstack/utils";

export type UseApiGetResult<T> =
  | {
      data: T;
      isLoading: false;
      isValidating: boolean;
      error: null;
      mutate: () => void;
    }
  | {
      data: T | null;
      isLoading: true;
      isValidating: boolean;
      error: null;
      mutate: () => void;
    }
  | {
      data: null;
      isLoading: false;
      isValidating: false;
      error: FetchError;
      mutate: () => void;
    };

export interface TagOption {
  label: string;
  value: string;
}

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
