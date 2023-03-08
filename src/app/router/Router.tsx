import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'app/utils/static';
import { MoviesPage } from 'app/pages/MoviesPage';
import { LogInPage } from 'app/pages/LogInPage';
import { RegisterPage } from 'app/pages/RegisterPage';
import { CreateMoviePage } from 'app/pages/CreateMoviePage';

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.MOVIES} element={<MoviesPage />} />
      <Route path={ROUTES.LOGIN} element={<LogInPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.MOVIES_CREATE} element={<CreateMoviePage />} />
    </Routes>
  );
};

export default Router;
