"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormFieldLabel } from "@/components/ui/field-label";
import { FieldLabel, FieldDescription } from "@/components/ui/field";
import { EventVisibility } from "@ems-fullstack/types";

interface EventFormFieldsProps {
  control: any;
}

export function EventFormFields({ control }: EventFormFieldsProps) {
  return (
    <FieldGroup className="gap-4">
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FormFieldLabel required htmlFor="event-title">
              Title
            </FormFieldLabel>
            <Input {...field} id="event-title" placeholder="Event title" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FormFieldLabel htmlFor="event-description">
              Description
            </FormFieldLabel>
            <Textarea
              {...field}
              id="event-description"
              placeholder="Event description"
              rows={3}
              className="resize-none"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <Controller
          name="date"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex-1" data-invalid={fieldState.invalid}>
              <FormFieldLabel required htmlFor="event-date">
                Date
              </FormFieldLabel>
              <Input {...field} id="event-date" type="date" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="time"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex-1" data-invalid={fieldState.invalid}>
              <FormFieldLabel required htmlFor="event-time">
                Time
              </FormFieldLabel>
              <Input {...field} id="event-time" type="time" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <Controller
        name="location"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FormFieldLabel required htmlFor="event-location">
              Location
            </FormFieldLabel>
            <Input
              {...field}
              id="event-location"
              placeholder="Event location"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="capacity"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FormFieldLabel htmlFor="event-capacity">Capacity</FormFieldLabel>
            <Input
              {...field}
              value={field.value || ""}
              id="event-capacity"
              type="number"
              min="1"
              placeholder="Maximum participants"
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
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
              className="flex gap-6 mt-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={EventVisibility.PUBLIC}
                  id="visibility-public"
                />
                <Label htmlFor="visibility-public">Public</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={EventVisibility.PRIVATE}
                  id="visibility-private"
                />
                <Label htmlFor="visibility-private">Private</Label>
              </div>
            </RadioGroup>
            <FieldDescription>
              Choose whether your event is visible to everyone or private.
            </FieldDescription>
          </Field>
        )}
      />
    </FieldGroup>
  );
}
