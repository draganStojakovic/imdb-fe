import useAuthGuard from 'app/hooks/useAuthGuard';

export const MoviesPage = () => {
  useAuthGuard(true);
  return <h1>HomePage</h1>;
};
