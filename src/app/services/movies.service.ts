import { httpService } from './http.service';
import { AxiosResponse } from 'axios';
import { IMovie } from 'app/types/IMovies';
import { IError } from 'app/types/IError';

class MoviesService {
  async GetMovies() {
    return await httpService.request<AxiosResponse<IMovie, IError>>({
      url: '/api/movies',
      method: 'GET',
    });
  }
}

export const moviesService = new MoviesService();
