import {
  useGetMoviesQuerry,
  useGetSingleMovieQuerry,
} from 'app/querries/movie.querry';
import { isMovie, isMovies } from 'app/utils/typeCheckers';

const useMovies = () => {
  const getMovies = (page = 1, limit = 10) => {
    const { data } = useGetMoviesQuerry(page, limit);
    if (isMovies(data)) return data;
    return undefined;
  };

  const getSingleMovie = (id: string) => {
    const { data } = useGetSingleMovieQuerry(id);
    if (isMovie(data)) return data;
    return undefined;
  };

  return { getMovies, getSingleMovie };
};

export default useMovies;
