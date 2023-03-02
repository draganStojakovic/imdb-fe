import { useForm, SubmitHandler } from "react-hook-form";
import { ISignIn } from "../types/IUser";
import { useMutation } from "react-query";
import { Box } from "@mui/system";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { notify } from "../utils/NotificationManager";
import { authService } from "../services/auth.service";

export const LogInPage = () => {
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

  const { login } = useContext(UserContext);

  const { mutate } = useMutation(authService.LogIn, {
    onSuccess: (data) => {
      login(data);
    },
    onError: (error) => {
      // notify("sdkffds", "error");
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<ISignIn> = async (user) => {
    mutate(user);
  };

  return (
    <Box
      sx={{
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="p-5 mb-5 bg-light rounded">
        <h1>Log In</h1>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>
              <h3>Email:</h3>
            </label>
            <br />
            <input
              type="email"
              className="form-control form-control-lg"
              {...register("email", { required: "The email is required" })}
              placeholder="name@example.com"
            />
            <br />
            {errors.email && (
              <p className="alert alert-danger" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>
          <br />
          <div className="form-group">
            <label>
              <h3>Password:</h3>
            </label>
            <br />
            <input
              className="form-control form-control-lg"
              type="password"
              {...register("password", { required: "The password is required" })}
              placeholder="password"
            />
            <br />
            {errors.password && (
              <p className="alert alert-danger" role="alert">
                {errors.password?.message}
              </p>
            )}
          </div>
          <br />
          <input className="btn btn-primary" type="submit" />
        </form>
      </div>
    </Box>
  );
};
