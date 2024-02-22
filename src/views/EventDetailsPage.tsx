// Custom Components
import ProminentImage from "@/components/ProminentImage";
import OverlayButton from "@/components/buttons/OverlayButton";
// Material UI
import Box from "@mui/material/Box";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
// Router
import { useNavigate } from "react-router-dom";
// Redux
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
// Utilities
import { formatDateTime, formatTime } from "@/utils/formatDateTime";
// Types
import { ExistingEvent } from "@/types/custom";

const EventDetailsPage = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const event = useAppSelector((state: RootState) => state.event.selectedEvent);
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <Box position="relative">
        {/* Prominent Image */}
        {event?.image ? (
          <ProminentImage src={event?.image as string} alt="Event details" />
        ) : (
          <Box
            width="100%"
            height="300px"
            sx={{ backgroundColor: "#DDD" }}
          ></Box>
        )}

        {/* Back Button */}
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            left: "40px",
          }}
        >
          <PrimaryButton
            label="Back"
            width="small"
            type="button"
            onClick={() => {
              navigate("/events");
            }}
          />
        </Box>

        {/* Event Title */}
        <Typography
          variant="h3"
          color={theme.palette.secondary.main}
          sx={{
            position: "absolute",
            top: "100px",
            left: "40px",
            maxWidth: "30%",
            wordWrap: "break-word",
          }}
        >
          {event?.title}
        </Typography>

        {/* Date/Time Box */}
        <Box
          width="300px"
          height="150px"
          borderRadius="12px"
          padding="16px"
          boxSizing="border-box"
          sx={{
            backgroundColor: "#FFF",
            position: "absolute",
            top: "100px",
            right: "40px",
          }}
        >
          <Typography variant="h6">Date & time</Typography>
          <Typography variant="body1">{formatDateTime(event)}</Typography>
          <Typography
            variant="body2"
            color={theme.palette.primary.contrastText}
          >
            Add to calendar
          </Typography>
          {event?.userId.toString() === user.id.toString() && (
            <OverlayButton
              label="Edit"
              onClick={() => navigate(`/events/${event.id}/edit`)}
            />
          )}
        </Box>
      </Box>

      <Box marginTop="24px" display="flex" gap={2}>
        <Box width="50%">
          {event?.description ? (
            <Box marginBottom="24px">
              <Typography variant="h6">Description</Typography>
              <Typography variant="body1">{event?.description}</Typography>
            </Box>
          ) : null}

          <Typography variant="h6">Scheduled Time</Typography>
          <Typography
            variant="body1"
            color={theme.palette.primary.contrastText}
          >
            {formatTime(event as ExistingEvent)}
          </Typography>
        </Box>
        {event?.guests?.length ? (
          <Box width="50%">
            <Typography variant="h6">Guests</Typography>
            <Typography variant="body1">
              {[event?.guests.map((guest) => guest.email).join(", ")]}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default EventDetailsPage;
