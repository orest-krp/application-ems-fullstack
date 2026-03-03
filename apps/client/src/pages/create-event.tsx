"use client";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from "@/components/ui/card";

import {
  createEventSchema,
  EventVisibility,
  type CreateEventForm
} from "@ems-fullstack/types";
import { useYupValidationResolver } from "@/hooks/use-yup-resolver";
import { EventFormFields } from "@/components/event-form-fields";
import { useCallback } from "react";
import { mergeDateTime } from "@/lib/utils";
import { useEvent } from "@/hooks/use-event";
import { toast } from "sonner";
import { ErrorMessage } from "@/components/ui/error-message";

export function CreateEvent() {
  const navigate = useNavigate();
  const { error, setError, createEvent } = useEvent();

  const { handleSubmit, control } = useForm<CreateEventForm>({
    resolver: useYupValidationResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: dayjs().format("YYYY-MM-DD"),
      time: dayjs().format("HH:mm"),
      location: "",
      capacity: undefined,
      visibility: EventVisibility.PUBLIC
    }
  });

  const onCreate = useCallback(async (data: CreateEventForm) => {
    const { date, time, ...rest } = data;
    await createEvent({ ...rest, dateTime: mergeDateTime(date, time) });
    await navigate("/events");
    toast.success("Event has been created succesfully");
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-primary-foreground px-4 py-8">
      <div className="w-full max-w-2xl mb-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="w-full max-w-2xl shadow-lg">
        <div className="text-center space-y-2">
          <CardTitle className="text-xl sm:text-2xl">
            Create New Event
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Fill in the details below to schedule and publish your event.
          </CardDescription>
        </div>

        <CardContent className="pt-6">
          <form
            id="create-event-form"
            noValidate
            onChange={() => {
              setError(null);
            }}
            onSubmit={handleSubmit(onCreate)}
          >
            <EventFormFields control={control} />
          </form>
        </CardContent>

        <CardFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="outline"
            className="flex-1 sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-event-form"
            className="flex-1 sm:w-auto"
          >
            Create Event
          </Button>
        </CardFooter>
        <ErrorMessage error={error} />
      </Card>
    </div>
  );
}
