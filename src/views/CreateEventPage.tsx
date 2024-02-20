import { ChangeEvent, useState, useEffect } from "react";
import InputGrouping from "@/components/inputs/InputGrouping";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextareaAutosize as Textarea } from "@mui/base/TextareaAutosize";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { EventInput, UniqueId } from "@/types/custom";
import dayjs from "dayjs";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const CreateEventPage = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const oneWeekFromToday = dayjs().add(7, "day");

  const [event, setEvent] = useState<EventInput>({
    title: "",
    date: oneWeekFromToday,
    startTime: dayjs().add(7, "day").set("hour", 12).set("minute", 0),
    endTime: undefined,
    userId: user?.id as UniqueId,
    isAllDay: false,
    // TODO: Add description
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("newly created event: ", event);
  }, [event]);

  useEffect(() => {
    // Update startTime date when date changes, keeping the time part unchanged
    setEvent((prevEvent) => ({
      ...prevEvent,
      startTime: event.startTime
        ? dayjs(event.date)
            .hour(event.startTime.hour())
            .minute(event.startTime.minute())
        : event.startTime,
      endTime: event.endTime
        ? dayjs(event.date)
            .hour(event.endTime.hour())
            .minute(event.endTime.minute())
        : event.endTime,
    }));
  }, [event.date]);

  return (
    <Box padding="50px 250px">
      <Typography variant="h4" textAlign="center">
        Create Event
      </Typography>
      <InputGrouping
        inputName="title"
        label="Event Title"
        value={event.title}
        type="text"
        placeholder="Enter your event title here"
        onChange={handleChange}
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
            value={event.date}
            onChange={(value) => setEvent({ ...event, date: value })}
            sx={{ width: "100%" }}
          />
        </Box>

        <Box width="48%" display="flex">
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Check here if this is an all day event"
            labelPlacement="end"
            onChange={(e, checked) => setEvent({ ...event, isAllDay: checked })}
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
            value={event.startTime}
            onChange={(value) => setEvent({ ...event, startTime: value })}
            disabled={event.isAllDay}
            sx={{ width: "100%" }}
          />
        </Box>

        <Box width="48%">
          <InputLabel sx={{ marginBottom: "12px" }}>End Time</InputLabel>
          <TimePicker
            name="endTime"
            value={event.endTime}
            onChange={(value) =>
              setEvent({
                ...event,
                // Update the endTime to user selected value
                // Make sure the endTime "date" matches event.date
                endTime: dayjs(value)
                  .month(event.date.month())
                  .date(event.date.date())
                  .year(event.date.year()),
              })
            }
            disabled={event.isAllDay}
            sx={{ width: "100%" }}
          />
        </Box>
      </Box>

      <Box marginBottom="24px">
        <InputLabel sx={{ marginBottom: "12px" }}>Event Description</InputLabel>
        <Textarea
          minRows={3}
          placeholder="Please enter a description for your event (optional)"
          style={{ width: "100%" }}
        />
      </Box>

      <PrimaryButton label="Create Event" width="large" />
    </Box>
  );
};

export default CreateEventPage;
