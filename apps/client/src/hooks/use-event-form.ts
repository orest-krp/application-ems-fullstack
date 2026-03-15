import {
  eventSchema,
  EventVisibility,
  type EventDetailsResponse,
  type EventRequestForm
} from "@ems-fullstack/utils";
import { useForm, type Mode } from "react-hook-form";
import { useYupValidationResolver } from "./use-yup-resolver";
import { useCallback } from "react";
import dayjs from "dayjs";

const defaultValues = {
  title: "",
  visibility: EventVisibility.PUBLIC,
  location: "",
  capacity: "",
  description: "",
  tags: [],
  date: dayjs().format("YYYY-MM-DD"),
  time: dayjs().format("HH:mm")
};

export function useEventForm(mode?: Mode) {
  const {
    control,
    reset,
    handleSubmit,

    formState: { isDirty }
  } = useForm<EventRequestForm>({
    resolver: useYupValidationResolver(eventSchema),
    defaultValues: defaultValues,
    mode: mode
  });

  const resetValues = useCallback(
    (event: EventDetailsResponse | null) => {
      const tags = event?.tags.map((tag) => tag.name);
      if (event) {
        reset({
          title: event.title,
          visibility: event.visibility,
          location: event.location,
          capacity: String(event.capacity),
          description: event.description || undefined,
          tags,
          date: dayjs(event.dateTime).format("YYYY-MM-DD"),
          time: dayjs(event.dateTime).format("HH:mm")
        });
      } else {
        reset(defaultValues);
      }
    },
    [defaultValues]
  );

  return {
    control,
    reset,
    handleSubmit,
    resetValues,
    isDirty
  };
}
