// Material UI
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// Types
import { ExistingEvent } from "@/types/custom";
// Utilities
import { formatDateTime } from "@/utils/formatDateTime";
// React Router
import { useNavigate } from "react-router-dom";
// Redux
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedEvent } from "@/redux/features/event/eventSlice";

interface Props {
  event: ExistingEvent;
}

const EventCard = ({ event }: Props) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setSelectedEvent(event));
    navigate(`/events/${event.id}`);
  };

  return (
    <Grid item xs={3} sx={{ cursor: "pointer" }}>
      <Card onClick={handleClick} sx={{ height: "300px", padding: "12px" }}>
        <CardMedia
          sx={{ height: 200 }}
          image={
            event.image
              ? event.image
              : "https://placehold.co/600x400?text=No Image"
          }
          title="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            overflow="scroll"
            height="24px"
          >
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDateTime(event)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EventCard;
