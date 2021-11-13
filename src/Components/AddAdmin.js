import { Box, styled } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import RegService from "../service/RegService";
const AddAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const onSubmit = (data) => {
    RegService.addUser({ ...data, isAdmin: true }).then((res) => {
      console.log(res);
    });
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
            <h2>Add Admin </h2>

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

            <Button variant="contained" type="submit">
              Add Admin
            </Button>
          </InputBoxField>
        </Box>
      </InputBox>
    </Wrapper>
  );
};

export default AddAdmin;
const Wrapper = styled("div")`
  background-color: lightgray;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled("div")`
  background-color: white;
  border-radius: 8px;
`;
const InputBoxField = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  height: 45vh;
`;
const AlertText = styled("span")`
  color: red;
`;
