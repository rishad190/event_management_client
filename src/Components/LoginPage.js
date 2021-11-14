import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import RegService from "../service/RegService";
import { UserContext } from "../App";
import { useNavigate } from "react-router";
const LoginPage = () => {
  const [user, setUser] = useContext(UserContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const onSubmit = (data) => {
    RegService.getUser().then((res) => {
      const loginUser = res.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (loginUser) {
        setUser({
          ...user,
          email: loginUser.email,
          isSignIn: true,
          isAdmin: loginUser?.isAdmin,
          address: loginUser?.address,
          phone: loginUser?.contact,
          name: `${loginUser?.firstName} ${loginUser?.lastName}`,
        });
        loginUser.isAdmin
          ? navigate("/admin/dashboard", { replace: true })
          : navigate("/userDashboard/DashboardUser", { replace: true });
      }
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
            <h2>Login </h2>

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
              Login
            </Button>
            {user.loggingError && (
              <AlertText>Email or Password is Wrong</AlertText>
            )}
          </InputBoxField>
        </Box>
      </InputBox>
    </Wrapper>
  );
};

export default LoginPage;
const Wrapper = styled("div")`
  background-color: #dce1e3;
  width: 100%;
  height: 100vh;
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
