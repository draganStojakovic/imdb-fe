import { httpService } from './http.service';
import { IMovie, IMovieDraft, IMoviePaginated } from 'app/types/IMovies';
import { IError } from 'app/types/IError';
import { AxiosResponse } from 'axios';

class MoviesService {
  async GetMovies(page = 1, limit = 10) {
    return await httpService.request<IMoviePaginated | IError>({
      url: `/api/movies?page=${page}&limit=${limit}`,
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
}

export const moviesService = new MoviesService();
