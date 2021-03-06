import { Container, Divider } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import TableBox from "./TableBox";
import EventBookService from "../service/EventBookService";

const EventBook = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    EventBookService.getEventBook().then((res) => {
      setData(res);
    });
  }, []);
  return (
    <Wrapper>
      <h2>Events Book</h2>
      <Divider />
      <Container>
        <TableBox data={data} />
      </Container>
    </Wrapper>
  );
};

export default EventBook;
const Wrapper = styled("div")``;
