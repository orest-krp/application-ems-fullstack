import { useEffect, useState } from "react";

export function useDebounce<T>(value: T) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(handler);
  }, [value, setDebouncedValue]);

  return debouncedValue;
}
