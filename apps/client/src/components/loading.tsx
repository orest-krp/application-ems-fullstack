import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="flex w-dull h-full items-center justify-center">
      <LoaderCircle className="w-16 h-16 text-gray-700 animate-spin" />
    </div>
  );
}
