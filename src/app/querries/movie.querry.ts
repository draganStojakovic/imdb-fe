import { moviesService } from 'app/services/movies.service';
import { IError } from 'app/types/IError';
import { IMovie } from 'app/types/IMovies';
import { QUERRY_KEYS } from 'app/utils/static';
import { useQuery } from 'react-query';

export const useGetMoviesQuerry = () =>
  useQuery<IMovie[] | IError>([QUERRY_KEYS.MOVIES], async () => {
    const data = await moviesService.GetMovies();
    return data;
  });

export const useGetSingleMovieQuerry = (id: string) =>
  useQuery<IMovie | IError>([QUERRY_KEYS.MOVIE], async () => {
    const data = await moviesService.GetSingleMovie(id);
    return data;
  });
