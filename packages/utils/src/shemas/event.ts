import * as yup from "yup";
import dayjs from "dayjs";
import { EventVisibility } from "../data/events.js";

export const eventSchema = yup
  .object({
    title: yup.string().required("Event title is required").min(3).max(100),

    description: yup.string().max(500).optional(),

    date: yup.string().required("Date is required"),

    time: yup.string().required("Time is required"),

    location: yup.string().required("Location is required").min(3).max(100),

    capacity: yup
      .string()
      .transform((value) => (value === "" ? null : value))
      .nullable()
      .optional()
      .test(
        "is-valid-capacity",
        "Capacity must be a positive number",
        (value) => {
          if (value == null) return true;
          const num = Number(value);
          return Number.isInteger(num) && num > 0;
        }
      ),
    visibility: yup
      .mixed<EventVisibility.PUBLIC | EventVisibility.PRIVATE>()
      .oneOf([EventVisibility.PUBLIC, EventVisibility.PRIVATE])
      .required("Visibility is required")
  })
  .test("is-future-datetime", function (values) {
    if (!values?.date || !values?.time) return true;

    const combined = dayjs(`${values.date} ${values.time}`);

    if (!combined.isValid() || !combined.isAfter(dayjs())) {
      return new yup.ValidationError(
        [
          new yup.ValidationError(
            "Event date cannot be in the past",
            values,
            "date"
          ),
          new yup.ValidationError(
            "Event time cannot be in the past",
            values,
            "time"
          )
        ],
        values
      );
    }

    return true;
  });

export const eventApiSchema = yup.object({
  title: yup.string().required().min(3).max(100),
  description: yup.string().max(500).optional(),
  dateTime: yup
    .string()
    .required("Datetime is required")
    .test("is-future", "Event datetime cannot be in the past", (value) => {
      return value
        ? dayjs(value).isValid() && dayjs(value).isAfter(dayjs())
        : true;
    }),
  location: yup.string().required().min(3).max(100),
  capacity: yup.number().integer().positive().nullable().optional(),
  visibility: yup
    .mixed<EventVisibility.PUBLIC | EventVisibility.PRIVATE>()
    .oneOf([EventVisibility.PUBLIC, EventVisibility.PRIVATE])
    .required()
});
