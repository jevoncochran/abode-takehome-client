import EventForm from "@/components/events/EventForm";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ExistingEvent } from "@/types/custom";
import dayjs from "dayjs";

const EditEventPage = () => {
  const selectedEvent = useAppSelector(
    (state: RootState) => state.event.selectedEvent
  ) as ExistingEvent;

  const eventToEdit = {
    ...selectedEvent,
    date: dayjs(selectedEvent.date),
    startTime: dayjs(selectedEvent.startTime),
    endTime: dayjs(selectedEvent?.endTime),
  };

  return <EventForm type="edit" event={eventToEdit} />;
};

export default EditEventPage;
