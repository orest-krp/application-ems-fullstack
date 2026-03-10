import type { FetchError } from "@ems-fullstack/utils";

export type UseApiGetResult<T> =
  | {
      data: T;
      isLoading: false;
      error: null;
      mutate: () => void;
    }
  | {
      data: T | null;
      isLoading: true;
      error: null;
      mutate: () => void;
    }
  | {
      data: null;
      isLoading: false;
      error: FetchError;
      mutate: () => void;
    };
