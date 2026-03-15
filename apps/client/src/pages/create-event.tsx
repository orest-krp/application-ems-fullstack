"use client";

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

import { type EventRequestForm } from "@ems-fullstack/utils";
import { EventFormFields } from "@/components/events-details/event-form-fields";
import { useCallback } from "react";
import { mergeDateTime } from "@/lib/utils";
import { ErrorMessage } from "@/components/ui/error-message";
import { useEventForm } from "@/hooks/use-event-form";
import { useCreateEvent } from "@/hooks/use-create-event";
import { LoadingButton } from "@/components/ui/loading-button";

export function CreateEvent() {
  const navigate = useNavigate();

  const { handleSubmit, control } = useEventForm();

  const { createEvent, setError, error, loading } = useCreateEvent();

  const onCreate = useCallback(async (data: EventRequestForm) => {
    const { date, time, ...rest } = data;
    await createEvent({
      ...rest,
      dateTime: mergeDateTime(date, time),
      capacity: Number(data.capacity)
    });
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
          <ArrowLeft />
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

        <form
          noValidate
          onChange={() => setError(null)}
          onSubmit={handleSubmit(onCreate)}
        >
          <CardContent>
            <EventFormFields control={control} />
          </CardContent>
          <CardFooter className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">
            <Button
              onClick={() => navigate(-1)}
              type="button"
              variant="outline"
              className="flex-1 sm:w-auto"
            >
              Cancel
            </Button>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingText="Creating"
              className="flex-1 sm:w-auto"
            >
              Create Event
            </LoadingButton>
          </CardFooter>
        </form>
        <ErrorMessage error={error} />
      </Card>
    </div>
  );
}
