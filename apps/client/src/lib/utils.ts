import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { mutate } from "swr";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeDateTime(date: string, time: string) {
  return dayjs(`${date} ${time}`).toDate();
}

export function formatDate(date: Date) {
  return dayjs(date).format("dddd, MMMM D, YYYY h:mm A");
}

export const getWeekDays = (currentDate: dayjs.Dayjs) => {
  const start = currentDate.startOf("isoWeek");
  const end = currentDate.endOf("isoWeek");

  const days: dayjs.Dayjs[] = [];

  let date = start;

  while (date.isBefore(end) || date.isSame(end, "day")) {
    days.push(date);
    date = date.add(1, "day");
  }

  return days;
};

export const getEventsForDay = (events: any[], day: dayjs.Dayjs) => {
  return events.filter((event) => dayjs(event.dateTime).isSame(day, "day"));
};

export const mutateFirstKey = (firstKey: string) => {
  mutate((key) => Array.isArray(key) && key[0] === firstKey);
};
