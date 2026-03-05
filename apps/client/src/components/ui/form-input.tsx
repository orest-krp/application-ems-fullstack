import {
  Controller,
  type Control,
  type FieldValues,
  type Path
} from "react-hook-form";
import { Field, FieldError } from "./field";
import { FormFieldLabel } from "./field-label";
import { Input } from "./input";

interface FormInputProps<T extends FieldValues> extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  ...rest
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FormFieldLabel required htmlFor={name}>
            Title
          </FormFieldLabel>
          <Input
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
            {...rest}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
