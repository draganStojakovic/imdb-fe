import { MovieParamsContext } from 'app/context/MovieParamsContext';
import useMovieParams from 'app/hooks/useMovieParams';

interface Props {
  children: React.ReactNode;
}

function MovieParamsProvider({ children }: Props) {
  const { page, setPage, search, setSearch, genres, setGenres } =
    useMovieParams();

  return (
    <MovieParamsContext.Provider
      value={{
        page,
        setPage,
        search,
        setSearch,
        genres,
        setGenres,
      }}
    >
      {children}
    </MovieParamsContext.Provider>
  );
}

export default MovieParamsProvider;
