import { useForm, SubmitHandler } from "react-hook-form";
import { authService } from "../services/auth.service";
import { IUserForm } from "../types/IUser";
import { storageManager } from "../utils/StorageManager";

export const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IUserForm> = async (user) => {
    try {
      const response = await authService.LogIn(user);
      storageManager.set("authUser", response);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-none p-5 mb-5 bg-light rounded">
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
  );
};
