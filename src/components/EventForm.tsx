import { FormEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputGrouping from "@/components/inputs/InputGrouping";
import { EventInput, UpcomingEvent } from "@/types/custom";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import { TextareaAutosize as Textarea } from "@mui/base/TextareaAutosize";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

interface Props {
  type: "create" | "edit";
  event: EventInput | UpcomingEvent;
}

const EventForm = ({ type, event }: Props) => {
  const navigate = useNavigate();

  const auth = useAppSelector((state: RootState) => state.auth);

  const [eventState, setEventState] = useState(event);

  // This simply removes startTime and endTime if eventState.isAllDay is truthy
  const parseEventData = (eventData: EventInput | UpcomingEvent) => {
    // TODO: Resolve this Typescript issue
    delete eventData.userRelation;
    delete eventData.invite;

    if (eventData.isAllDay) {
      const timesRemoved: EventInput = {
        ...eventData,
        startTime: null,
        endTime: null,
      };

      return timesRemoved;
    } else {
      return eventData;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const parsedEventData = parseEventData(eventState);

    if (type === "create") {
      axios
        .post(`${import.meta.env.VITE_API_URL}/events`, parsedEventData, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => {
          console.log(res.data);
          if (res.status === 201) {
            navigate("/events");
          }
        });
    } else {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/events/${eventState.id}`,
          parsedEventData,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.status === 201) {
            navigate("/events");
          }
        });
    }
  };

  useEffect(() => {
    // Update startTime date and endTime date when date changes, keeping the time part unchanged
    setEventState((prevEvent) => ({
      ...prevEvent,
      startTime: eventState.startTime
        ? dayjs(eventState.date)
            .hour(eventState.startTime.hour())
            .minute(eventState.startTime.minute())
        : eventState.startTime,
      endTime: eventState.endTime
        ? dayjs(eventState.date)
            .hour(eventState.endTime.hour())
            .minute(eventState.endTime.minute())
        : eventState.endTime,
    }));
  }, [eventState.date]);

  useEffect(() => {
    console.log("newly created event: ", eventState);
  }, [eventState]);

  return (
    <Box padding="50px 250px">
      <Typography variant="h4" textAlign="center">
        {type === "create" ? "Create Event" : "Edit Event"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <InputGrouping
          inputName="title"
          label="Event Title"
          value={eventState.title}
          type="text"
          placeholder="Enter your event title here"
          onChange={(e) =>
            setEventState({ ...eventState, title: e.target.value })
          }
        />

        <Box
          marginBottom="24px"
          display="flex"
          justifyContent="space-between"
          width="100%"
        >
          <Box width="48%">
            <InputLabel sx={{ marginBottom: "12px" }}>Date</InputLabel>
            <DatePicker
              name="date"
              value={eventState.date}
              onChange={(value) =>
                setEventState({ ...eventState, date: value })
              }
              sx={{ width: "100%" }}
            />
          </Box>

          <Box width="48%" display="flex">
            <FormControlLabel
              value="end"
              control={<Checkbox checked={eventState.isAllDay} />}
              label="Check here if this is an all day event"
              labelPlacement="end"
              onChange={(e, checked) =>
                setEventState({ ...eventState, isAllDay: checked })
              }
            />
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          marginBottom="24px"
        >
          <Box width="48%">
            <InputLabel sx={{ marginBottom: "12px" }}>Start Time</InputLabel>
            <TimePicker
              name="startTime"
              value={eventState.startTime}
              onChange={(value) =>
                setEventState({
                  ...eventState,
                  // Update the startTime to user selected value
                  // Make sure the startTime "date" matches eventState.date
                  startTime: dayjs(value)
                    .month(eventState.date.month())
                    .date(eventState.date.date())
                    .year(eventState.date.year()),
                })
              }
              disabled={eventState.isAllDay}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box width="48%">
            <InputLabel sx={{ marginBottom: "12px" }}>End Time</InputLabel>
            <TimePicker
              name="endTime"
              value={eventState.endTime}
              onChange={(value) =>
                setEventState({
                  ...eventState,
                  // Update the endTime to user selected value
                  // Make sure the endTime "date" matches eventState.date
                  endTime: dayjs(value)
                    .month(eventState.date.month())
                    .date(eventState.date.date())
                    .year(eventState.date.year()),
                })
              }
              disabled={eventState.isAllDay}
              sx={{ width: "100%" }}
            />
          </Box>
        </Box>

        <Box marginBottom="24px">
          <InputLabel sx={{ marginBottom: "12px" }}>
            Event Description
          </InputLabel>
          <Textarea
            minRows={3}
            placeholder="Please enter a description for your event (optional)"
            name="description"
            value={eventState.description}
            onChange={(e) =>
              setEventState({ ...eventState, description: e.target.value })
            }
            style={{ width: "100%" }}
          />
        </Box>

        <PrimaryButton
          label={type === "create" ? "Create Event" : "Update Event"}
          width="large"
        />
      </form>
    </Box>
  );
};

export default EventForm;
