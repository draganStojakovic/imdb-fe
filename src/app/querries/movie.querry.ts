import { moviesService } from 'app/services/movies.service';
import { IError } from 'app/types/IError';
import {
  IMovie,
  IMoviePaginated,
  IMovieWatchList,
  IMovieStrippedDown,
} from 'app/types/IMovies';
import { QUERRY_KEYS } from 'app/utils/static';
import { useQuery, QueryKey } from 'react-query';

export const useGetMoviesQuerry = (
  page = 1,
  limit = 10,
  search?: string,
  genres?: string
) =>
  useQuery<IMoviePaginated | IError>(
    [QUERRY_KEYS.MOVIES] as QueryKey,
    async () => {
      const data = await moviesService.GetMovies(page, limit, search, genres);
      return data;
    }
  );

export const useGetSingleMovieQuerry = (id: string) =>
  useQuery<IMovie | IError>([QUERRY_KEYS.MOVIE], async () => {
    const data = await moviesService.GetSingleMovie(id);
    return data;
  });

export const useGetAllMoviesFromWatchListQuery = () =>
  useQuery<IMovieWatchList[] | IError>([QUERRY_KEYS.WATCH_LIST], async () => {
    const data = await moviesService.GetAllMoviesFromWatchList();
    return data;
  });

export const useGetPopularMovies = () =>
  useQuery<IMovieStrippedDown[] | IError>([QUERRY_KEYS.POPULAR], async () => {
    const data = await moviesService.PopularMovies();
    return data;
  });
