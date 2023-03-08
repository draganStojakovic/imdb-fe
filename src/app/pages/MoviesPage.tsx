import useAuthGuard from 'app/hooks/useAuthGuard';
import useMovies from 'app/hooks/useMovies';

export const MoviesPage = () => {
  useAuthGuard(true);
  const { getMovies } = useMovies();
  console.log(getMovies());
  return <h1>sdijflijsdfi</h1>;
};
