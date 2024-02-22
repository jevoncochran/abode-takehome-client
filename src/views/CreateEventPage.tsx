// Custom Components
import EventForm from "@/components/events/EventForm";
// Redux
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
// Types
import { NewEvent, UniqueId } from "@/types/custom";
// Third-party Libraries
import dayjs from "dayjs";

const CreateEventPage = () => {
  const auth = useAppSelector((state: RootState) => state.auth);

  // Default new event values
  const oneWeekFromToday = dayjs()
    .add(7, "day")
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0);

  const oneWeekFromTodayTwelveNoon = oneWeekFromToday
    .set("hour", 12)
    .set("minute", 0)
    .set("second", 0);

  const newEvent: NewEvent = {
    title: "",
    date: oneWeekFromToday,
    startTime: oneWeekFromTodayTwelveNoon,
    endTime: undefined,
    userId: auth.user?.id as UniqueId,
    isAllDay: false,
    description: "",
    image: null,
  };

  return <EventForm type="create" event={newEvent} />;
};

export default CreateEventPage;
