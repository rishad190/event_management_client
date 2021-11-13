import { Button } from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";
import EventService from "../service/EventService";
import ModalBox from "./ModalBox";

export default function DataTable() {
  const [eventData, setEventData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    EventService.getEvent().then((event) => {
      const isActive = event.filter((event) => event.isActive === true);

      setEventData(isActive);
    });
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Wrapper>
      {eventData.map((event) => (
        <ListBox key={event._id}>
          <ImageContainer>
            <img src={event.image} alt="" />
          </ImageContainer>
          <TextBox>
            <Link to={`/admin/Dashboard/${event._id}`}>
              <h2 onClick={handleOpen}>{event.title}</h2>
            </Link>
            <p>Place Name:{event.placeName}</p>
            <p>Date : {event.date}</p>
          </TextBox>
          <ActiveButton>
            <Button>{event.isActive ? "Active" : "Inactive"}</Button>
          </ActiveButton>
        </ListBox>
      ))}
      <ModalBox open={open} handleClose={handleClose} />
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  margin-top: 10px;
  overflow-y: scroll;
  height: 100%;
`;
const ListBox = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightskyblue;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;
const TextBox = styled("div")`
  h2 {
    margin: 0;
    padding: 0;
    color: white;
    :hover {
      color: black;
    }
  }
  p {
    margin: 0;
    padding: 0;
    color: white;
  }
  a {
    text-decoration: none;
  }
`;
const ActiveButton = styled("div")``;
const ImageContainer = styled("div")`
  width: 20%;
  img {
    width: 100%;
    height: 150px;
    border-radius: 8px;
  }
`;
