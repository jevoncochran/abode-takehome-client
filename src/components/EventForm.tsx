import { FormEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputGrouping from "@/components/inputs/InputGrouping";
import { EventInput, NewEvent, UpcomingEvent } from "@/types/custom";
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
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/AutoComplete";
import TextField from "@mui/material/TextField";

type EventFormType = "create" | "edit";

interface Props {
  type: EventFormType;
  event: EventInput | UpcomingEvent;
}

const EventForm = ({ type, event }: Props) => {
  const navigate = useNavigate();

  const auth = useAppSelector((state: RootState) => state.auth);

  const [eventState, setEventState] = useState(event);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const parseEventData = (
    formType: EventFormType,
    eventData: NewEvent | UpcomingEvent
  ) => {
    // TODO: Resolve this Typescript issue
    delete eventData.userRelation;
    delete eventData.invite;

    // Remove startTime and endTime data for all day events
    if (eventData.isAllDay) {
      const timesRemoved: EventInput = {
        ...eventData,
        startTime: null,
        endTime: null,
      };

      eventData = timesRemoved;
    }

    // Add relevant data for inviting guests
    if (formType === "create") {
      const selectedUserIds = selectedUsers.map((selected) => selected.id);
      eventData = { ...eventData, usersToInvite: selectedUserIds };
    }

    return eventData;
  };

  const handleGuestListChange = (_, newValue) => {
    setSelectedUsers(newValue);
    // onGuestListChange(newValue);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const parsedEventData = parseEventData(type, eventState);

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

  // Fetch all users (for the purpose of adding guests)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        console.log(res.data);
        setAllUsers(res.data);
      });
  }, []);

  useEffect(() => {
    console.log("newly created event: ", eventState);
  }, [eventState]);

  useEffect(() => {
    console.log("selectedUsers: ", selectedUsers);
  }, [selectedUsers]);

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

        <Box marginBottom="24px">
          <InputLabel sx={{ marginBottom: "12px" }}>Guests</InputLabel>
          <Autocomplete
            multiple
            id="guest-list-select"
            options={allUsers}
            getOptionLabel={(option) => option.email}
            value={selectedUsers}
            onChange={handleGuestListChange}
            renderInput={(params) => (
              <TextField {...params} label="Invite Guests" variant="outlined" />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  label={option.email}
                  {...getTagProps({ index })}
                  onDelete={() => {
                    const newGuests = [...selectedUsers];
                    newGuests.splice(index, 1);
                    setSelectedUsers(newGuests);
                    // onGuestListChange(newGuests);
                  }}
                />
              ))
            }
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
