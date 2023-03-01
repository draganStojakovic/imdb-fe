import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/static";
import { HomePage } from "../pages/HomePage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
    </Routes>
  );
};

export default Router;