import useAuthGuard from 'app/hooks/useAuthGuard';
import { useContext } from 'react';
import { MoviesContext } from 'app/context/MovieContext';
import { LoadingContext } from 'app/context/LoadingContext';
import { useEffect } from 'react';

export const MoviesPage = () => {
  useAuthGuard(true);

  const { movies } = useContext(MoviesContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!movies) {
      setLoading(true);
    } else if (movies) {
      setLoading(false);
    }
  }, [movies]);

  console.log(movies);
  return <h1>sdijflijsdfi</h1>;
};
