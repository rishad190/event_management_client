import { Container, Divider } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import EventCard from "./EventCard";
import EventService from "../service/EventService";

const UserEventBook = () => {
  const [eventData, setEventData] = React.useState([]);

  React.useEffect(() => {
    EventService.getEvent().then((event) => {
      const isActive = event.filter((event) => event.isActive === true);

      setEventData(isActive);
    });
  }, []);
  return (
    <Wrapper>
      <h2>Events</h2>
      <Divider />
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
          <Grid container spacing={2}>
            {eventData?.map((event) => (
              <Grid item xs={3} key={event._id}>
                <Item>
                  <EventCard data={event} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default UserEventBook;
const Wrapper = styled("div")`
  margin-top: 10px;
`;
const Item = styled("div")``;
