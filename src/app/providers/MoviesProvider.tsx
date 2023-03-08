import { MoviesContext } from 'app/context/MovieContext';
import useMovies from 'app/hooks/useMovies';

interface Props {
  children: React.ReactNode;
}

const MoviesProvider = ({ children }: Props) => {
  const {
    movie,
    movies,
    setMoviesToState,
    setMovieToState,
    setMovie,
    setMovies,
  } = useMovies();

  return (
    <MoviesContext.Provider
      value={{
        movie,
        movies,
        setMoviesToState,
        setMovieToState,
        setMovie,
        setMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
