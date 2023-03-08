import useAuthGuard from 'app/hooks/useAuthGuard';
import { useContext } from 'react';
import { MoviesContext } from 'app/context/MoviesContext';
import { LoadingContext } from 'app/context/LoadingContext';
import { useEffect } from 'react';
import { UserContext } from 'app/context/UserContext';

export const MoviesPage = () => {
  useAuthGuard(true);

  const { movies } = useContext(MoviesContext);
  const { user } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!movies && user) {
      setLoading(true);
    } else if (movies && user) {
      setLoading(false);
    }
  }, [movies, user]);

  console.log(movies);
  return <h1>sdijflijsdfi</h1>;
};
