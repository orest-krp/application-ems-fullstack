import { lazy } from "react";

export function lazyPage<
  T extends Record<string, React.ComponentType<any>>,
  K extends keyof T
>(factory: () => Promise<T>, name: K) {
  return lazy(() =>
    factory().then((module) => ({
      default: module[name]
    }))
  );
}
