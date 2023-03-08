import { useGetMoviesQuerry } from 'app/querries/movie.querry';
import { isMovies } from 'app/utils/typeCheckers';

const useMovies = () => {
  const { data } = useGetMoviesQuerry();

  const getMovies = () => {
    if (isMovies(data)) return data;
    return undefined;
  };

  return { getMovies };
};

export default useMovies;
