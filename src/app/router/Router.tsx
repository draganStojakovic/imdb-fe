import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../common/ProtectedRoute";
import { ROUTES } from "../utils/static";
import { HomePage } from "../pages/HomePage";
import { LogInPage } from "../pages/LogInPage";
import { RegisterPage } from "../pages/RegisterPage";

const Router = () => {
  const isAuth = !!!window.localStorage.getItem("userId");
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute isAuth={isAuth}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <ProtectedRoute isAuth={isAuth}>
            <LogInPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <ProtectedRoute isAuth={isAuth}>
            <RegisterPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
