import { FieldLabel } from "@/components/ui/field";
import type { Label } from "./label";

interface FormFieldLabelProps extends React.ComponentProps<typeof Label> {
  required?: boolean;
}

export function FormFieldLabel({
  required,
  children,
  ...rest
}: React.PropsWithChildren<FormFieldLabelProps>) {
  return (
    <FieldLabel {...rest} className="gap-1" htmlFor="event-location">
      {children}
      {required && <span className="text-destructive">*</span>}
    </FieldLabel>
  );
}
