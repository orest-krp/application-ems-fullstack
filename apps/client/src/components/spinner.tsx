import { LoaderCircle } from "lucide-react";

export function Spinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoaderCircle className="w-16 h-16 text-gray-700 animate-spin" />
    </div>
  );
}
