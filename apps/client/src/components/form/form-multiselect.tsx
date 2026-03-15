"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path
} from "react-hook-form";
import { Field, FieldDescription, FieldError } from "../ui/field";
import { FormFieldLabel } from "./form-field-label";
import { TagsSelect } from "../ui/tag-select";

interface FormTagsSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  description?: string;
  required?: boolean;
}

export function FormTagsSelect<T extends FieldValues>({
  name,
  control,
  label,
  description
}: FormTagsSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FormFieldLabel htmlFor={name}>{label}</FormFieldLabel>}

          <TagsSelect value={field.value} onChange={field.onChange} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    />
  );
}
