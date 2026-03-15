import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <LoaderCircle className="w-16 h-16 text-primary animate-spin" />
    </div>
  );
}
