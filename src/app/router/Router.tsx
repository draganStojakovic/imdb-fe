import { Route, Routes } from "react-router-dom";
import { ROUTES } from "app/utils/static";
import { HomePage } from "app/pages/HomePage";
import { LogInPage } from "app/pages/LogInPage";
import { RegisterPage } from "app/pages/RegisterPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LogInPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
    </Routes>
  );
};

export default Router;
