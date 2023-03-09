import { httpService } from './http.service';
import { IMovie, IMovieCreate } from 'app/types/IMovies';
import { IError } from 'app/types/IError';
import { AxiosResponse } from 'axios';

class MoviesService {
  async GetMovies() {
    return await httpService.request<IMovie[] | IError>({
      url: '/api/movies',
      method: 'GET',
    });
  }

  async GetSingleMovie(payload: string) {
    return await httpService.request<IMovie | IError>({
      url: `/api/movies/${payload}`,
      method: 'GET',
    });
  }

  async CreateMovie(payload: IMovieCreate) {
    return await httpService.request<AxiosResponse<IMovie, IError>>({
      url: '/api/movies',
      method: 'POST',
      data: payload,
    });
  }
}

export const moviesService = new MoviesService();
