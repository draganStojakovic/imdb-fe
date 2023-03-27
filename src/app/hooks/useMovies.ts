import {
  useGetMoviesQuerry,
  useGetSingleMovieQuerry,
} from 'app/querries/movie.querry';
import { isMovie, isMovies } from 'app/utils/typeCheckers';

const useMovies = () => {
  const getMovies = (
    page = 1,
    limit = 10,
    search?: string,
    genres?: string
  ) => {
    const { data } = useGetMoviesQuerry(page, limit, search, genres);
    if (isMovies(data)) return data;
  };

  const getSingleMovie = (id: string) => {
    const { data } = useGetSingleMovieQuerry(id);
    if (isMovie(data)) return data;
  };

  return { getMovies, getSingleMovie };
};

export default useMovies;
