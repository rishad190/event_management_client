import { Button, Container, Divider, LinearProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/system";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import EventService from "../service/EventService";

const Input = styled("input")({
  display: "none",
});
const CreateEvent = () => {
  const [value, setValue] = React.useState(new Date());
  const [uploadTime, setUploadTime] = React.useState();
  const [imgValue, setImgValue] = React.useState();
  const [status, setStatus] = React.useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const onSubmit = (data) => {
    EventService.addEvent({
      ...data,
      date: value,
      image: imgValue,
      isActive: status,
    }).then((response) => {
      console.log(response);
    });
  };
  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percentage = Math.floor((loaded * 100) / total);
      console.log(`${loaded}kb of ${total}kb | ${percentage}%`);
      if (percentage < 100) {
        setUploadTime(percentage);
      }
    },
  };
  const handleFile = (e) => {
    const newImage = new FormData();
    newImage.set("key", "aafbfe581b5c0567d41d17613f8ffbc5");
    newImage.append("image", e.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", newImage, options)
      .then(function (response) {
        setTimeout(() => {
          setUploadTime(null);
        }, 1000);
        setImgValue(response.data.data.display_url);
        console.log(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
        setUploadTime(null);
      });
  };

  return (
    <Wrapper>
      <h1>Create Event</h1>
      <Divider />
      <Container>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 2,
              [theme.breakpoints.down("sm")]: { width: "20ch" },
              [theme.breakpoints.up("md")]: { width: "60ch" },
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <>
            <InputBox>
              <TextField
                required
                id="outlined-required"
                label="Title"
                variant="standard"
                name="title"
                {...register("title", { required: true })}
              />
              {errors.title && <span>This field is required</span>}

              <TextField
                required
                id="outlined-input"
                label="Description"
                variant="standard"
                name="description"
                {...register("description", { required: true })}
              />
              {errors.description && <span>This field is required</span>}
              <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    {...register("image", { required: true })}
                    onChange={handleFile}
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              </Box>
              {uploadTime && (
                <Box sx={{ width: "50%" }}>
                  <LinearProgress variant="determinate" value={uploadTime} />
                </Box>
              )}

              {errors.image && <span>This field is required</span>}
              <TextField
                required
                id="outlined-input"
                label="Place Name"
                variant="standard"
                name="placeName"
                {...register("placeName", { required: true })}
              />
              {errors.placeName && <span>This field is required</span>}
              <TextField
                required
                id="outlined-input"
                label="Address"
                variant="standard"
                name="address"
                {...register("address", { required: true })}
              />
              {errors.address && <span>This field is required</span>}
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  required
                  label="Date Choose"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </InputBox>
            <ButtonBox>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </ButtonBox>
          </>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default CreateEvent;
const Wrapper = styled("div")``;
const ButtonBox = styled("div")`
  display: flex;
  justify-content: flex-end;
`;
const InputBox = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
