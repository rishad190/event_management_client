import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UserContext } from "../App";
import EventBookService from "../service/EventBookService";
import CustomizedSnackbars from "./CustomizedSnackbars";

export default function EventCard({ data }) {
  const { title, image, description, placeName, date } = data;
  const [user] = React.useContext(UserContext);
  const { name, email, phone } = user;
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleBook = () => {
    EventBookService.addEventBook({
      title,
      image,
      description,
      placeName,
      date,
      name,
      email,
      phone,
    }).then((res) => {
      if (res) {
        setOpen(true);
      }
    });
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent sx={{ height: "500px" }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {placeName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(date).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleBook}>
          Book
        </Button>
      </CardActions>
      <CustomizedSnackbars open={open} handleClose={handleClose} />
    </Card>
  );
}
