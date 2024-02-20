import { UpcomingEvent } from "@/types/custom";
import dayjs from "dayjs";

// Formats date/time of events as in the following example:
// Saturday, March 18, 9:30PM
const formatDateTime = (event: UpcomingEvent) => {
  const date: string = dayjs(event.date).format("dddd, MMM D");

  let time: string;
  if (event.isAllDay) {
    time = "All Day";
  } else {
    time = dayjs(event.startTime).format("h:mmA");
  }

  return `${date}, ${time}`;
};

const formatTime = (event: UpcomingEvent) => {
  let time: string;

  if (event.isAllDay) {
    time = "All Day Event";
  } else {
    const eventStart = dayjs(event.startTime).format("h:mmA");
    const eventEnd = event.endTime
      ? dayjs(event.endTime).format("h:mmA")
      : null;

    if (eventEnd) {
      time = `${eventStart} - ${eventEnd}`;
    } else {
      time = eventStart;
    }
  }

  return time;
};

export { formatDateTime, formatTime };
