import { LoaderCircle } from "lucide-react";

export function Spinner() {
  return (
    <div className="flex w-screen items-center justify-center">
      <LoaderCircle className="w-16 h-16 text-gray-700 animate-spin" />
    </div>
  );
}
