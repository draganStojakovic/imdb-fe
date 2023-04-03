import { useGetSingleMovieQuerry } from 'app/querries/movie.querry';
import { isObjOfType } from 'app/utils/typeCheckers';
import { IMovie } from 'app/types/IMovies';

const useMovies = () => {
  const getSingleMovie = (id: string) => {
    const { data } = useGetSingleMovieQuerry(id);
    if (isObjOfType<IMovie>(data)) return data;
  };

  return { getSingleMovie };
};

export default useMovies;
