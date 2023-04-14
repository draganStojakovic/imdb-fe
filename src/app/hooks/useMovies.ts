import {
  useGetAllMoviesFromWatchListQuery,
  useGetPopularMovies,
  useGetSingleMovieQuerry,
} from 'app/querries/movie.querry';
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

  const getAllMoviesFromWatchList = () => {
    const { data, refetch, isLoading } = useGetAllMoviesFromWatchListQuery();
    return { data, refetch, isLoading };
  };

  const getPopularMovies = () => {
    const { data } = useGetPopularMovies();
    return { data };
  };

  return {
    getSingleMovie,
    getMovies,
    getAllMoviesFromWatchList,
    getPopularMovies,
  };
};

export default useMovies;
