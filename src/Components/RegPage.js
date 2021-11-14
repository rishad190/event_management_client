import { Box, styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Link } from "react-router-dom";
import RegService from "../service/RegService";
import { useNavigate } from "react-router-dom";

const RegPage = () => {
  const [dob, setDob] = React.useState(new Date());
  const [doj, setDoj] = React.useState(new Date());
  const [checkUser, setCheckUser] = React.useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  React.useEffect(() => {
    RegService.getUser().then((user) => {
      setCheckUser(user);
    });
  }, []);
  const onSubmit = (data) => {
    if (data.email) {
      const existingUser = checkUser.find((user) => user.email === data.email);
      if (existingUser) {
        alert("Email is already in use. ");
      } else {
        const saveData = { ...data, dob: dob, doj: doj };
        RegService.addUser(saveData).then((user) => {
          if (user) {
            navigate("/login");
          } else {
            console.log("error");
          }
        });
      }
    }
  };

  return (
    <Wrapper>
      <InputBox>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              [theme.breakpoints.down("sm")]: { width: "30ch" },
              [theme.breakpoints.up("md")]: { width: "60ch" },
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputBoxField>
            <h2>Registration</h2>
            <TextField
              required
              id="outlined-required"
              label="First Name"
              variant="outlined"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && <AlertText>This field is required</AlertText>}

            <TextField
              required
              id="outlined-input"
              label="Last Name"
              variant="outlined"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && <AlertText>This field is required</AlertText>}

            <TextField
              required
              label="Email"
              variant="outlined"
              id="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              type="email"
            />
            {errors.email && <AlertText>{errors.email.message}</AlertText>}
            <TextField
              required
              label="Password"
              variant="outlined"
              id="password"
              {...register("password", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              type="password"
            />
            {errors.password && (
              <AlertText>{errors.password.message}</AlertText>
            )}
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="Date of Birth"
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              required
              id="outlined-input"
              label="Address"
              variant="outlined"
              {...register("address", {
                required: "required",
                minLength: {
                  value: 10,
                  message: "min length is 10",
                },
              })}
            />
            {errors.address && <AlertText>{errors.address.message}</AlertText>}
            <TextField
              required
              id="outlined-input"
              label="Contact Number"
              type="number"
              minLength={11}
              pattern="[+-]?\d+(?:[.,]\d+)?"
              variant="outlined"
              {...register("contact", {
                required: "required",
              })}
            />
            {errors.contact && <AlertText>{"Please Enter Number"}</AlertText>}
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="Date of Join"
                value={doj}
                onChange={(newValue) => {
                  setDoj(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
            <p>
              Have you already a account? <Link to="/login">Login</Link>{" "}
            </p>
          </InputBoxField>
        </Box>
      </InputBox>
    </Wrapper>
  );
};

export default RegPage;
const Wrapper = styled("div")`
  background-color: #dce1e3;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled("div")`
  border-radius: 8px;
  background-color: white;
`;
const InputBoxField = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  height: 100%;
`;
const AlertText = styled("span")`
  color: red;
`;
