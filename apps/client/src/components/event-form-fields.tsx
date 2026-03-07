"use client";

import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormFieldLabel } from "@/components/ui/field-label";
import { FieldLabel } from "@/components/ui/field";
import { EventVisibility } from "@ems-fullstack/utils";
import { FormInput } from "./ui/form-input";
import { FormDatePicker } from "./ui/date-picker";

interface EventFormFieldsProps {
  control: any;
}

export function EventFormFields({ control }: EventFormFieldsProps) {
  return (
    <FieldGroup className="gap-4">
      <FormInput
        name="title"
        id="title"
        control={control}
        label="Title"
        placeholder="Title"
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FormFieldLabel htmlFor="description">Description</FormFieldLabel>
            <Textarea {...field} id="description" rows={3} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <FormDatePicker
          name="date"
          id="date"
          control={control}
          label="Date"
          placeholder="Date"
        />
        <FormInput
          name="time"
          id="time"
          type="time"
          control={control}
          label="Time"
          placeholder="Time"
        />
      </div>
      <FormInput
        name="location"
        id="location"
        control={control}
        label="Location"
        placeholder="Event location"
      />
      <FormInput
        name="capacity"
        id="capacity"
        control={control}
        label="Capacity"
        placeholder="Event capacity"
      />
      <Controller
        name="visibility"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Visibility</FieldLabel>
            <RadioGroup
              value={field.value}
              onValueChange={(val) => field.onChange(val)}
              className="gap-4 mt-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={EventVisibility.PUBLIC}
                  id="visibility-public"
                />
                <Label htmlFor="visibility-public">
                  Public - Anyone can see and join this event
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={EventVisibility.PRIVATE}
                  id="visibility-private"
                />
                <Label htmlFor="visibility-private">
                  Private - only invited people can see this event
                </Label>
              </div>
            </RadioGroup>
          </Field>
        )}
      />
    </FieldGroup>
  );
}
