import { MoviesContext } from 'app/context/MoviesContext';
import useMovies from 'app/hooks/useMovies';

interface Props {
  children: React.ReactNode;
}

const MoviesProvider = ({ children }: Props) => {
  const { movies, setMoviesToState, setMovies } = useMovies();

  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMoviesToState,
        setMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
