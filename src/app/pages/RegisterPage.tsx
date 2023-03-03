import { useForm, SubmitHandler } from "react-hook-form";
import { IRegister } from "app/types/IUser";
import { useMutation } from "react-query";
import { authService } from "app/services/auth.service";
import { notficationManager } from "app/utils/NotificationManager";
import { useContext } from "react";
import { UserContext } from "app/context/UserContext";
import { isAnUser } from "app/utils/typeCheckers";

import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";

import useAuthGuard from "app/hooks/useAuthGuard";

export const RegisterPage = () => {
  useAuthGuard(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegister>({
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { login } = useContext(UserContext);

  const { mutate } = useMutation(authService.Register, {
    onSuccess: (data) => {
      if (isAnUser(data)) {
        login(data);
      }
    },
    onError: () => {
      notficationManager.error("Couldn't register"); // privremeno
    },
  });

  const onSubmit: SubmitHandler<IRegister> = async (user) => {
    mutate(user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <br />
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                {...register("fname", {
                  required: "First name is required",
                })}
                helperText={errors.fname ? errors.fname.message : ""}
                error={errors.fname ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("lname", {
                  required: "Last name is required",
                })}
                helperText={errors.lname ? errors.lname.message : ""}
                error={errors.lname ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                helperText={errors.email ? errors.email.message : ""}
                error={errors.email ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  validate: (value) =>
                    value === getValues("confirmPassword") || "Passwords do not match.",
                })}
                helperText={errors.password ? errors.password.message : ""}
                error={errors.password ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                  required: "Password is required",
                  validate: (value) => value === getValues("password") || "Passwords do not match.",
                })}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                error={errors.confirmPassword ? true : false}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
