import {
  Controller,
  type Control,
  type FieldValues,
  type Path
} from "react-hook-form";
import React from "react";
import { Field, FieldDescription, FieldError } from "../ui/field";
import { FormFieldLabel } from "./form-field-label";
import { Input } from "../ui/input";

interface FormInputProps<T extends FieldValues> extends React.ComponentProps<
  typeof Input
> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  icon?: React.ReactNode;
  isPassword?: boolean;
  required?: boolean;
  description?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required = true,
  ...rest
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FormFieldLabel required={required} htmlFor={name}>
              {label}
            </FormFieldLabel>
          )}
          <Input
            {...field}
            className="text-sm font-normal"
            id={name}
            aria-invalid={fieldState.invalid}
            {...rest}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    />
  );
}
