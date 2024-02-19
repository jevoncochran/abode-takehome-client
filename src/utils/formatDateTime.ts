import { UpcomingEvent } from "@/types/custom";
import dayjs from "dayjs";

// Formats date/time of events as in the following example:
// Saturday, March 18, 9:30PM
const formatDateTime = (event: UpcomingEvent) => {
  const date: string = dayjs(event.date).format("dddd, MMM M");
  
  let time: string;
  if (event.isAllDay) {
    time = "All Day";
  } else {
    time = dayjs(event.startTime).format("h:mmA");
  }

  return `${date}, ${time}`;
};

export { formatDateTime };
