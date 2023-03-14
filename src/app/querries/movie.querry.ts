import { moviesService } from 'app/services/movies.service';
import { IError } from 'app/types/IError';
import { IMovie, IMoviePaginated } from 'app/types/IMovies';
import { QUERRY_KEYS } from 'app/utils/static';
import { useQuery } from 'react-query';

export const useGetMoviesQuerry = (page = 1, search: string | undefined, limit = 10) =>
  useQuery<IMoviePaginated | IError>([QUERRY_KEYS.MOVIES], async () => {
    const data = await moviesService.GetMovies(page, search, limit);
    return data;
  });

export const useGetSingleMovieQuerry = (id: string) =>
  useQuery<IMovie | IError>([QUERRY_KEYS.MOVIE], async () => {
    const data = await moviesService.GetSingleMovie(id);
    return data;
  });
