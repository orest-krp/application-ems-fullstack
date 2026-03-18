import { useEffect, useState } from "react";

export function useMounted() {
  const [isMouted, setMounted] = useState(false);
  useEffect(() => {
    if (!isMouted) {
      setMounted(true);
    }
  }, [isMouted]);

  return isMouted;
}
