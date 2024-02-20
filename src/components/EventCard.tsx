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
      <Card sx={{ padding: "12px" }}>
        <CardMedia
          sx={{ height: 200 }}
          image={eventImage}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
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
