import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/static";
import { HomePage } from "../pages/HomePage";
import { LogInPage } from "../pages/LogInPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AuthRouteExample } from "../pages/AuthRouteExample";

type Params = {
  children: React.ReactElement;
  redirectTo: any;
};

const isAuth = !!window.localStorage.getItem("auth_user_email");

function RequireAuth({ children, redirectTo }: Params) {
  return isAuth ? children : <Navigate to={redirectTo} />;
}

function RequireGuest({ children, redirectTo }: Params) {
  return isAuth ? <Navigate to={redirectTo} /> : children;
}

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          <RequireGuest redirectTo={ROUTES.HOME}>
            <LogInPage />
          </RequireGuest>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <RequireGuest redirectTo={ROUTES.HOME}>
            <RegisterPage />
          </RequireGuest>
        }
      />
      <Route
        path="/protected" // test
        element={
          <RequireAuth redirectTo={ROUTES.LOGIN}>
            <AuthRouteExample />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default Router;
