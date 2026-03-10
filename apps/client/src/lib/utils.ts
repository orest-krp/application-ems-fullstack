import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
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

export const getMonthDays = (currentDate: dayjs.Dayjs) => {
  const startMonth = currentDate.startOf("month");
  const endMonth = currentDate.endOf("month");

  const start = startMonth.startOf("isoWeek");
  const end = endMonth.endOf("isoWeek");

  const days: dayjs.Dayjs[] = [];

  let date = start;

  while (date.isBefore(end) || date.isSame(end, "day")) {
    days.push(date);
    date = date.add(1, "day");
  }

  return days;
};

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
