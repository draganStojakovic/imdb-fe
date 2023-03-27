import { httpService } from './http.service';
import {
  IMovie,
  IMovieDraft,
  IMoviePaginated,
  IVoteMoviePayload,
} from 'app/types/IMovies';
import { IError } from 'app/types/IError';
import { AxiosResponse } from 'axios';
import { IVotes } from 'app/types/IVotes';

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
    return await httpService.request<AxiosResponse<IVotes, IError>>({
      url: `/api/votes?movieId=${payload.movieId}&userId=${payload.userId}&button=${payload.button}`,
      method: 'PUT',
    });
  }
}

export const moviesService = new MoviesService();
