import { useGetSingleMovieQuerry } from 'app/querries/movie.querry';
import { useGetMoviesQuerry } from 'app/querries/movie.querry';

const useMovies = () => {
  const getMovies = (
    page: number,
    limit: number,
    search: string,
    genres: string
  ) => {
    const { data, isLoading, refetch } = useGetMoviesQuerry(
      page,
      limit,
      search,
      genres
    );
    return { data, isLoading, refetch };
  };

  const getSingleMovie = (id: string) => {
    const { data, refetch } = useGetSingleMovieQuerry(id);
    return { data, refetch };
  };

  return { getSingleMovie, getMovies };
};

export default useMovies;
