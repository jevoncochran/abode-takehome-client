import { FormEvent, useState, useEffect, useRef, ChangeEvent } from "react";
// Custom components
import InputGrouping from "@/components/inputs/InputGrouping";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import DeleteButton from "../buttons/DeleteButton";
// Material-UI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/AutoComplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// Third-party libraries
import dayjs from "dayjs";
import axios from "axios";
// Types
import { EventInput, NewEvent, ExistingEvent } from "@/types/custom";
// Redux
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

type EventFormType = "create" | "edit";

interface Props {
  type: EventFormType;
  event: NewEvent | ExistingEvent;
}

const EventForm = ({ type, event }: Props) => {
  const navigate = useNavigate();

  const auth = useAppSelector((state: RootState) => state.auth);

  const [eventState, setEventState] = useState(event);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(event.guests);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const imageUploadRef = useRef<HTMLInputElement>(null);

  const parseEventData = (
    formType: EventFormType,
    eventData: NewEvent | ExistingEvent
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
      const selectedUserIds = selectedUsers?.map((selected) => selected.id);
      eventData = { ...eventData, usersToInvite: selectedUserIds };
    } else {
      delete eventData.guests;
    }

    return eventData;
  };

  const handleUploaderClick = () => {
    if (imageUploadRef.current) {
      imageUploadRef.current.click();
    }
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length && files?.length > 0) {
      //   setIsUploading(true);
      const data = new FormData();

      data.append("file", files[0]);
      axios
        .post(`${import.meta.env.VITE_API_URL}/events/images`, data, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => {
          console.log(res.data);
          setEventState((prevEventState) => {
            return { ...prevEventState, image: res.data.link };
          });
          //   setIsUploading(false);
        });
    }
  };

  const handleGuestListChange = (_, newValue) => {
    setSelectedUsers(newValue);
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

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/events/${eventState.id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 204) {
          navigate("/events");
        }
      });
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
        const userList = res.data;
        const userListMinusLoggedInUser = userList.filter(
          (user) => user.id !== auth.user?.id
        );
        setAllUsers(userListMinusLoggedInUser);
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
          <Box width="100%">
            <InputLabel sx={{ marginBottom: "12px" }}>Date</InputLabel>
            <Box display="flex" gap={8}>
              <DatePicker
                name="date"
                value={eventState.date}
                onChange={(value) =>
                  setEventState({ ...eventState, date: value })
                }
                sx={{ width: "50%" }}
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    checked={eventState.isAllDay}
                  />
                }
                label="Check here if this is an all day event"
                labelPlacement="end"
                onChange={(e, checked) =>
                  setEventState({ ...eventState, isAllDay: checked })
                }
                sx={{ width: "50%" }}
              />
            </Box>
          </Box>
        </Box>

        <Box display="flex" gap={8} width="100%" marginBottom="24px">
          <Box width="50%">
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

          <Box width="50%">
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
          <TextField
            multiline
            minRows={3}
            placeholder="Please enter a description for your event (optional)"
            name="description"
            value={eventState.description}
            onChange={(e) =>
              setEventState({ ...eventState, description: e.target.value })
            }
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box marginBottom="24px">
          <InputLabel sx={{ marginBottom: "12px" }}>Event Image</InputLabel>
          {!eventState.image ? (
            <Box
              width="100%"
              height="300px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: "#ECECEC", cursor: "pointer" }}
              onClick={handleUploaderClick}
            >
              <Typography>Click here to upload image</Typography>
              <input
                type="file"
                ref={imageUploadRef}
                style={{ visibility: "hidden", position: "absolute" }}
                onChange={uploadImage}
              />
            </Box>
          ) : (
            <img
              src={eventState.image}
              alt={eventState.title}
              width="100%"
              height="300px"
              style={{ objectFit: "cover" }}
            />
          )}
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
              <TextField
                {...params}
                label="Invite Guests"
                variant="outlined"
                InputLabelProps={{ shrink: false }}
              />
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
                  }}
                />
              ))
            }
          />
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <PrimaryButton
            label={type === "create" ? "Create Event" : "Update Event"}
            width="large"
          />
          {type === "edit" && (
            <DeleteButton
              label="Cancel Event"
              width="large"
              onClick={handleDelete}
            />
          )}
        </Box>

        {/* Delete Event Modal */}
        <Dialog
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to cancel this event? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteModal}>Disagree</Button>
            <Button onClick={handleConfirmDelete} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Box>
  );
};

export default EventForm;
