import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  loadingText?: string;
}

export function LoadingButton({
  loading = false,
  loadingText = "Loading...",
  children,
  className,
  disabled,
  ...props
}: React.PropsWithChildren<LoadingButtonProps>) {
  return (
    <Button
      {...props}
      disabled={loading || disabled}
      className={clsx("flex items-center gap-2", className)}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? loadingText : children}
    </Button>
  );
}
