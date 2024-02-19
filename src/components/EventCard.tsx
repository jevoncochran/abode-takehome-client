import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import eventImage from "@assets/image3.png";
import { UpcomingEvent } from "@/types/custom";
import { formatDateTime } from "@/utils/formatDateTime";

interface Props {
  event: UpcomingEvent;
}

const EventCard = ({ event }: Props) => {
  return (
    <Grid item xs={3}>
      <Card sx={{ maxWidth: 345, padding: "12px" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={eventImage}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
