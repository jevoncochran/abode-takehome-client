import EventForm from "@/components/EventForm";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";

const EditEventPage = () => {
  const selectedEvent = useAppSelector(
    (state: RootState) => state.event.selectedEvent
  );

  const eventToEdit = {
    ...selectedEvent,
    date: dayjs(selectedEvent.date),
    startTime: dayjs(selectedEvent.startTime),
    endTime: dayjs(selectedEvent?.endTime),
  };

  return <EventForm type="edit" event={eventToEdit} />;
};

export default EditEventPage;
