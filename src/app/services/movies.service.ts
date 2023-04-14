import { httpService } from './http.service';
import {
  IMovie,
  IMovieDraft,
  IMoviePaginated,
  IMovieWatchList,
  IPopularMovie,
  IVoteMoviePayload,
} from 'app/types/IMovies';
import { IError } from 'app/types/IError';
import { AxiosResponse } from 'axios';
import { IVote } from 'app/types/IVote';
import { IViews } from 'app/types/IViews';
import { IUser } from 'app/types/IUser';

class MoviesService {
  async GetMovies(page = 1, limit = 10, search?: string, genres?: string) {
    return await httpService.request<IMoviePaginated | IError>({
      url: `/api/movies?page=${page}&limit=${limit}&search=${search}&genres=${genres}`,
      method: 'GET',
    });
  }

  async GetSingleMovie(payload: string) {
    return await httpService.request<IMovie | IError>({
      url: `/api/movies/${payload}`,
      method: 'GET',
    });
  }

  async CreateMovie(payload: IMovieDraft) {
    return await httpService.request<AxiosResponse<IMovie, IError>>({
      url: '/api/movies',
      method: 'POST',
      data: payload,
    });
  }

  async VoteMovie(payload: IVoteMoviePayload) {
    return await httpService.request<AxiosResponse<IVote, IError>>({
      url: `/api/votes?movieId=${payload.movieId}&userId=${payload.userId}&button=${payload.button}`,
      method: 'PUT',
    });
  }

  async IncrementMovieViews(payload: string) {
    return await httpService.request<AxiosResponse<IViews, IError>>({
      url: `/api/views/${payload}`,
      method: 'PUT',
    });
  }

  async WatchedMovie(movieId: string) {
    return await httpService.request<AxiosResponse<IUser, IError>>({
      url: `/api/watched-movie/${movieId}`,
      method: 'PUT',
    });
  }

  async GetAllMoviesFromWatchList() {
    return await httpService.request<IMovieWatchList[] | IError>({
      url: '/api/watch-list',
      method: 'GET',
    });
  }

  async WatchList(movieId: string) {
    return await httpService.request<AxiosResponse<IUser, IError>>({
      url: `/api/watch-list/${movieId}`,
      method: 'PUT',
    });
  }

  async PopularMovies() {
    return await httpService.request<IPopularMovie[] | IError>({
      url: '/api/popular-movies',
      method: 'GET',
    });
  }
}

export const moviesService = new MoviesService();
