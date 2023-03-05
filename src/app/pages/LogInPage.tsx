import { useForm, SubmitHandler } from "react-hook-form";
import { ISignIn } from "app/types/IUser";
import { useMutation } from "react-query";
import { useContext } from "react";
import { UserContext } from "app/context/UserContext";
import { authService } from "app/services/auth.service";
import { notficationManager } from "app/utils/NotificationManager";
import { isAnUser } from "app/utils/typeCheckers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "app/utils/static";

import { Box } from "@mui/system";
import { Link } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Container } from "@mui/material";

import useAuthGuard from "app/hooks/useAuthGuard";

export const LogInPage = () => {
  useAuthGuard(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { login } = useContext(UserContext); // kontekst poziva hook

  const { mutate } = useMutation(authService.LogIn, {
    onSuccess: (data) => {
      if (isAnUser(data)) {
        login(data);
      }
    },
    onError: () => {
      // if (isAnError(err)) {
      //   console.log(err.errors[1])
      // }
      notficationManager.error("Invalid credentials"); // privremeno
    },
  });

  const onSubmit: SubmitHandler<ISignIn> = async (user) => {
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
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                {...register("email", {
                  required: "Email is required",
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
                })}
                helperText={errors.password ? errors.password.message : ""}
                error={errors.password ? true : false}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" onClick={() => navigate(ROUTES.REGISTER)}>
              Dont have account? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
