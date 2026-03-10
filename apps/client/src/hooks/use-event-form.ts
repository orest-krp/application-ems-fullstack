import {
  eventSchema,
  EventVisibility,
  type EventDetailsResponse,
  type EventRequestForm
} from "@ems-fullstack/utils";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "./use-yup-resolver";
import { useCallback } from "react";
import dayjs from "dayjs";

export function useEventForm() {
  const defaultValues = {
    title: "",
    visibility: EventVisibility.PUBLIC,
    location: "",
    capacity: "",
    description: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().format("HH:mm")
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty }
  } = useForm<EventRequestForm>({
    resolver: useYupValidationResolver(eventSchema),
    defaultValues: defaultValues
  });

  const resetValues = useCallback((event: EventDetailsResponse | null) => {
    if (event) {
      reset({
        title: event.title,
        visibility: event.visibility,
        location: event.location,
        capacity: String(event.capacity),
        description: event.description || undefined,
        date: dayjs(event.dateTime).format("YYYY-MM-DD"),
        time: dayjs(event.dateTime).format("HH:mm")
      });
    } else {
      reset(defaultValues);
    }
  }, []);

  return {
    control,
    reset,
    handleSubmit,
    resetValues,
    isDirty
  };
}
