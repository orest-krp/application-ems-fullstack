import { FieldLabel } from "@/components/ui/field";

interface FormFieldLabelProps extends React.ComponentProps<"label"> {
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
