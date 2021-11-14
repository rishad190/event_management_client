import { Container, Divider } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import TableBox from "./TableBox";

const EventBook = () => {
  return (
    <Wrapper>
      <h2>Events Book</h2>
      <Divider />
      <Container>
        <TableBox />
      </Container>
    </Wrapper>
  );
};

export default EventBook;
const Wrapper = styled("div")``;
