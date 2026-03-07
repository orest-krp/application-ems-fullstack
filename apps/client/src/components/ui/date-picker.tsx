"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path
} from "react-hook-form";
import { Field, FieldError } from "./field";
import { FormFieldLabel } from "./field-label";
import dayjs from "dayjs";

interface FormDatePickerProps<
  T extends FieldValues
> extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  name: Path<T>;
  label?: string;
  id: string;
  control: Control<T>;
  required?: boolean;
}

export function FormDatePicker<T extends FieldValues>({
  name,
  label,
  id,
  control,
  placeholder,
  required = true
}: FormDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;
        const [open, setOpen] = React.useState(false);

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && (
              <FormFieldLabel htmlFor={name} required={required}>
                {label}
              </FormFieldLabel>
            )}
            <InputGroup>
              <InputGroupInput
                {...field}
                id={name}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
              />
              <InputGroupAddon align="inline-end">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <InputGroupButton
                      id={id}
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Select date"
                    >
                      <CalendarIcon />
                      <span className="sr-only">Select date</span>
                    </InputGroupButton>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        field.onChange(dayjs(date).format("YYYY-MM-DD"));
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
