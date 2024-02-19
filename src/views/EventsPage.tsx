import { useState, useEffect } from "react";
import ProminentImage from "@/components/ProminentImage";
import mainImg from "@assets/main-img.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material";
import EventCard from "@/components/EventCard";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { UpcomingEvent } from "@/types/custom";

const EventsPage = () => {
  const theme = useTheme();

  const auth = useAppSelector((state: RootState) => state.auth);

  const [events, setEvents] = useState<UpcomingEvent[]>([]);

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
      <Grid container spacing={2}>
        {events.map((ev) => (
          <EventCard event={ev} />
        ))}
      </Grid>
    </div>
  );
};

export default EventsPage;
