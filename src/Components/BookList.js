import { Container, Divider } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { UserContext } from "../App";
import EventBookService from "../service/EventBookService";
import TableBox from "./TableBox";

const BookList = () => {
  const [data, setData] = React.useState([]);
  const [user] = React.useContext(UserContext);
  React.useEffect(() => {
    EventBookService.getEventBook().then((res) => {
      const userBook = res.filter((book) => book.email === user.email);
      setData(userBook);
    });
  }, [user.email]);

  return (
    <Wrapper>
      <h2>Book</h2>
      <Divider />
      <Container>
        <TableBox data={data} />
      </Container>
    </Wrapper>
  );
};

export default BookList;
const Wrapper = styled("div")``;
