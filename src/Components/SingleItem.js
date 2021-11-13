import { Container } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useParams } from "react-router";
import EventService from "../service/EventService";

const SingleItem = () => {
  const id = useParams();
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    EventService.getEventByID(id.id).then((res) => {
      setData(res);
    });
  }, [id]);
  const { title, description, image, placeName, address, date } = data;
  return (
    <Container>
      <h2>Event Details</h2>
      <Wrapper>
        <ImageContainer>
          <img src={image} alt="" />
        </ImageContainer>
        <TextWrapper>
          <h2>{title}</h2>
          <p>{placeName}</p>
          <p>{date}</p>
          <p>{address}</p>
          <p>{description}</p>
        </TextWrapper>
      </Wrapper>
    </Container>
  );
};

export default SingleItem;
const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextWrapper = styled("div")``;
const ImageContainer = styled("div")`
  width: 60%;
  img {
    width: 100%;
  }
`;
