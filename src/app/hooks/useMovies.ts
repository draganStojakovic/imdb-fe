import {
  useGetMoviesQuerry,
  useGetSingleMovieQuerry,
} from 'app/querries/movie.querry';
import { isObjOfType } from 'app/utils/typeCheckers';
import { IMovie, IMovieWithComments } from 'app/types/IMovies';

const useMovies = () => {
  const getMovies = (
    page = 1,
    limit = 10,
    search?: string,
    genres?: string
  ) => {
    const { data } = useGetMoviesQuerry(page, limit, search, genres);
    if (isObjOfType<IMovie[]>(data)) return data;
  };

  const getSingleMovie = (id: string) => {
    const { data } = useGetSingleMovieQuerry(id);
    if (isObjOfType<IMovieWithComments>(data)) return data;
  };

  return { getMovies, getSingleMovie };
};

export default useMovies;
