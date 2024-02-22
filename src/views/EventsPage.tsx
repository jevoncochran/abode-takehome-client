import { useState, useEffect } from "react";
// Custom Components
import ProminentImage from "@/components/ProminentImage";
import EventCard from "@/components/events/EventCard";
// Material UI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material";
// Third-party Libraries
import axios from "axios";
// Redux
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
// Types
import { ExistingEvent } from "@/types/custom";

import mainImg from "@assets/main-img.png";

const EventsPage = () => {
  const theme = useTheme();

  const auth = useAppSelector((state: RootState) => state.auth);

  const [events, setEvents] = useState<ExistingEvent[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/events`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      });
  }, []);

  return (
    <div>
      <ProminentImage src={mainImg} alt="Main image" />
      <Box display="flex" marginTop="24px" marginBottom="12px">
        <Typography
          color={theme.palette.primary.main}
          fontWeight={600}
          variant="h4"
          sx={{ marginRight: "4px" }}
        >
          Upcoming
        </Typography>
        <Typography
          color={theme.palette.primary.contrastText}
          fontWeight={600}
          variant="h4"
        >
          Events
        </Typography>
      </Box>
      {events.length > 0 ? (
        <Grid container spacing={2}>
          {events.map((ev) => (
            <EventCard event={ev} />
          ))}
        </Grid>
      ) : (
        <Typography>No upcoming events</Typography>
      )}
    </div>
  );
};

export default EventsPage;
