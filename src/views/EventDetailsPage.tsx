import ProminentImage from "@/components/ProminentImage";
import eventDetailsImg from "@assets/event-details-img.png";
import Box from "@mui/material/Box";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { formatDateTime } from "@/utils/formatDateTime";
import OverlayButton from "@/components/buttons/OverlayButton";

const EventDetailsPage = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const event = useAppSelector((state: RootState) => state.event.selectedEvent);

  return (
    <div>
      <Box position="relative">
        {/* Prominent Image */}
        <ProminentImage src={eventDetailsImg} alt="Event details" />

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
          <OverlayButton
            label="Edit"
            onClick={() => navigate(`/events/${event.id}/edit`)}
          />
        </Box>
      </Box>

      {/* TODO: Add divs for description and scheduled time */}
    </div>
  );
};

export default EventDetailsPage;
